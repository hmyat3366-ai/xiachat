const Visitor = require('../models/Visitor');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Workspace = require('../models/Workspace');
const Campaign = require('../models/Campaign');

// 1. Initialize a visitor session from the Widget
exports.initWidget = async (req, res) => {
  try {
    const { workspaceId, visitorInfo, departmentId } = req.body;
    
    // Find workspace to check CORS
    let wId = workspaceId;
    const workspace = await Workspace.findById(wId);
    
    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    // Auto-detect and record Connected Domains (No strict blocking)
    const origin = req.headers.origin || req.headers.referer;
    if (origin) {
      try {
        const hostname = new URL(origin).hostname;
        if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
          // If workspace doesn't have this domain, add it automatically
          if (!workspace.allowedDomains) workspace.allowedDomains = [];
          const isNewDomain = !workspace.allowedDomains.includes(hostname);
          if (isNewDomain) {
            workspace.allowedDomains.push(hostname);
            await workspace.save();

            // 🤖 AUTO SCAN: New domain detected — scrape homepage in background so AI learns about the site
            const siteUrl = `https://${hostname}`;
            setImmediate(async () => {
              try {
                const axios = require('axios');
                const cheerio = require('cheerio');
                const KnowledgeBase = require('../models/KnowledgeBase');

                // Check if we already have a KB entry from this URL
                const existing = await KnowledgeBase.findOne({ workspaceId: wId, 'metadata.sourceUrl': siteUrl });
                if (existing) return; // Already scanned, skip

                const response = await axios.get(siteUrl, {
                  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; XiaChatBot/1.0; +https://xiachat.com)' },
                  timeout: 15000
                });

                const $ = cheerio.load(response.data);
                $('script, style, noscript, iframe, img, svg, video, nav, footer').remove();
                let textContent = $('body').text().replace(/\s+/g, ' ').trim();
                if (!textContent || textContent.length < 50) return;

                // Truncate to 8000 chars to avoid hitting token limits
                if (textContent.length > 8000) textContent = textContent.substring(0, 8000) + '...';

                const pageTitle = $('title').text().trim() || hostname;

                const kb = new KnowledgeBase({
                  workspaceId: wId,
                  title: `Auto-Scanned: ${pageTitle}`,
                  type: 'url',
                  content: textContent,
                  status: 'active',
                  metadata: { sourceUrl: siteUrl, autoScanned: true }
                });
                await kb.save();
                console.log(`✅ Auto-scanned ${siteUrl} for workspace ${wId}`);
              } catch (scanErr) {
                console.error(`❌ Auto-scan failed for ${siteUrl}:`, scanErr.message);
              }
            });
          }
        }
      } catch (e) {
        // Invalid URL, ignore
      }
    }
    // Reuse existing visitor or create new one
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '192.168.1.1';
    
    // Parse OS from userAgent
    let os = visitorInfo?.os || 'Unknown OS';
    const ua = visitorInfo?.browser || '';
    if (ua.includes('Win')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('like Mac')) os = 'iOS';

    const visitorName = visitorInfo?.name || 'Anonymous Visitor';
    const visitorEmail = visitorInfo?.email || undefined;
    const sourceOrigin = visitorInfo?.origin || 'web';

    // Try to find existing visitor by name+email or name+ip on same workspace
    let visitor = null;
    if (visitorEmail) {
      visitor = await Visitor.findOne({ workspaceId: wId, email: visitorEmail });
    }
    if (!visitor && visitorName !== 'Anonymous Visitor') {
      visitor = await Visitor.findOne({ workspaceId: wId, name: visitorName });
    }
    if (!visitor && visitorName === 'Anonymous Visitor') {
      // For anonymous visitors, match by IP + origin to avoid duplicates from same browser
      visitor = await Visitor.findOne({ workspaceId: wId, ipAddress: ip, currentPage: { $regex: sourceOrigin, $options: 'i' } });
    }

    if (visitor) {
      // Update existing visitor's info
      visitor.lastActive = new Date();
      visitor.currentPage = visitorInfo?.currentPage || sourceOrigin;
      if (visitorName !== 'Anonymous Visitor') visitor.name = visitorName;
      if (visitorEmail) visitor.email = visitorEmail;
      visitor.browser = visitorInfo?.browser || visitor.browser;
      visitor.os = os;
      await visitor.save();
    } else {
      // Create brand new visitor
      visitor = new Visitor({
        workspaceId: wId,
        name: visitorName,
        email: visitorEmail,
        browser: visitorInfo?.browser || 'Unknown',
        os: os,
        ipAddress: ip,
        currentPage: visitorInfo?.currentPage || sourceOrigin
      });
      await visitor.save();
    }

    // Check if agents are online
    const roomName = departmentId ? `workspace_${wId}_dept_${departmentId}` : `workspace_${wId}`;
    const onlineAgents = req.io ? (req.io.sockets.adapter.rooms.get(roomName)?.size || 0) : 0;
    const isOffline = onlineAgents === 0 && !workspace.aiEnabled;

    // Find existing open conversation for this visitor, or create new one
    let conversation = await Conversation.findOne({ 
      visitorId: visitor._id, 
      status: { $in: ['open', 'pending'] },
      channel: 'web'
    }).sort({ lastMessageAt: -1 });

    let isNewConversation = false;
    if (!conversation) {
      conversation = new Conversation({
        workspaceId: wId,
        visitorId: visitor._id,
        channel: 'web',
        sourceUrl: sourceOrigin,
        departmentId: departmentId || null,
        isTicket: isOffline,
        status: isOffline ? 'pending' : 'open',
        ticketId: isOffline ? `TKT-${Math.floor(Math.random() * 1000000)}` : null,
        mode: workspace.aiEnabled ? 'ai' : 'human'
      });
      await conversation.save();
      isNewConversation = true;

      // Broadcast new conversation to agents in real-time
      if (req.io) {
        const fullConv = await Conversation.findById(conversation._id).populate('visitorId');
        req.io.to(`workspace_${wId}`).emit('new_conversation', fullConv);
      }
    }

    // Only increment monthly conversations for genuinely new ones
    if (isNewConversation) {
      let currentWorkspaceId = wId;
      await Workspace.findByIdAndUpdate(currentWorkspaceId, {
         $inc: { monthlyConversations: 1 }
      });
    }

    // Get configuration directly from the Workspace DB
    let widgetConfig = workspace.widgetConfig || {};
    let themeColor = widgetConfig.primaryColor || "#3B82F6"; 
    let widgetTitle = widgetConfig.widgetTitle || "Xia Chat Support";
    let welcomeMsg = widgetConfig.welcomeMessage || "Hi there! How can we help you today?";

    let previousMessages = [];
    if (!isNewConversation) {
      previousMessages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 });
    }

    // --- Campaign Logic ---
    // Fetch active "In-App Popup" campaigns for this workspace
    const activeCampaigns = await Campaign.find({
      workspaceId: wId,
      status: 'Active',
      type: 'In-App Popup'
    });

    let newCampaignMessages = [];
    if (activeCampaigns.length > 0) {
      for (const campaign of activeCampaigns) {
        // Simple audience filtering logic (can be expanded later)
        let matchesAudience = true;
        if (campaign.audience === 'New Signups (Last 7 days)') {
           const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
           if (visitor.createdAt < sevenDaysAgo) matchesAudience = false;
        }

        // Check if visitor has already received this campaign
        const alreadyReceived = visitor.deliveredCampaigns && visitor.deliveredCampaigns.includes(campaign._id);

        if (matchesAudience && !alreadyReceived) {
          // Send campaign as a message
          const campaignMsg = new Message({
            conversationId: conversation._id,
            senderType: 'campaign',
            senderName: 'Campaign System',
            text: campaign.message || campaign.name
          });
          await campaignMsg.save();
          newCampaignMessages.push(campaignMsg);

          // Mark as delivered
          visitor.deliveredCampaigns.push(campaign._id);
          
          // Increment 'sent' metric on the campaign
          campaign.sent += 1;
          await campaign.save();
        }
      }
      
      if (newCampaignMessages.length > 0) {
        await visitor.save();
        previousMessages = [...previousMessages, ...newCampaignMessages];
        await Conversation.findByIdAndUpdate(conversation._id, { lastMessageAt: new Date() });
      }
    }
    // --- End Campaign Logic ---

    res.json({ 
      success: true, 
      visitorId: visitor._id, 
      conversationId: conversation._id, 
      room: `conv_${conversation._id}`,
      isReturning: !isNewConversation,
      isOffline: conversation.isTicket,
      ticketId: conversation.ticketId,
      messages: previousMessages,
      config: {
        ...widgetConfig,
        themeColor,
        visitorBubbleColor: widgetConfig.visitorBubbleColor,
        agentBubbleColor: widgetConfig.agentBubbleColor,
        autoTheme: widgetConfig.autoTheme,
        widgetTitle,
        welcomeMsg
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Fetch Conversations for the Dashboard Inbox
exports.getConversations = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    let query = { workspaceId };

    const conversations = await Conversation.find(query)
      .populate('visitorId')
      .sort({ lastMessageAt: -1 });
    res.json({ success: true, data: conversations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Fetch Messages for a specific Conversation
exports.getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    
    // Verify user has access to this workspace
    if (!req.user || !req.user.workspaces.includes(conversation.workspaceId.toString())) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await Message.find({ conversationId: req.params.conversationId })
      .sort({ createdAt: 1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Resolve a Conversation
exports.resolveConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });
    
    if (!req.user || !req.user.workspaces.includes(conversation.workspaceId.toString())) {
      return res.status(403).json({ error: "Access denied" });
    }

    conversation.status = 'resolved';
    await conversation.save();
    
    res.json({ success: true, data: conversation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update conversation mode
exports.updateConversationMode = async (req, res) => {
  try {
    const { mode, isTicket, status } = req.body;
    if (mode && !['ai', 'human', 'assist'].includes(mode)) {
      return res.status(400).json({ error: "Invalid mode" });
    }

    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ error: "Conversation not found" });

    if (!req.user || !req.user.workspaces.includes(conversation.workspaceId.toString())) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (mode) {
      conversation.mode = mode;
      if (mode === 'human' || mode === 'assist') {
         conversation.assignedAgent = req.user._id;
      } else {
         conversation.assignedAgent = null;
      }
    }
    
    if (isTicket !== undefined) {
      conversation.isTicket = isTicket;
      if (isTicket && !conversation.ticketId) {
        conversation.ticketId = `TKT-${Math.floor(Math.random() * 1000000)}`;
      }
    }
    if (status !== undefined) conversation.status = status;

    await conversation.save();

    // Broadcast mode update to other agents so their UI stays in sync
    if (req.io) {
       req.io.to(`workspace_${conversation.workspaceId}`).emit('conversation_updated', conversation);
    }

    // If switching to AI mode, send an AI handoff greeting message
    if (mode === 'ai' && req.io) {
      try {
        const workspace = await Workspace.findById(conversation.workspaceId);
        if (workspace && workspace.aiEnabled) {
          // Fetch recent chat history for context
          const pastMessages = await Message.find({ conversationId: conversation._id })
            .sort({ createdAt: 1 }).limit(10);
          const chatHistory = pastMessages.map(m => ({
            role: (m.senderType === 'operator' || m.senderType === 'ai') ? 'assistant' : 'user',
            content: m.text
          }));

          const aiModelMap = {
            'llama-3-8b-free': 'meta-llama/llama-3-8b-instruct:free',
            'gemma-2-9b-free': 'google/gemma-2-9b-it:free',
            'qwen-2.5-7b-free': 'qwen/qwen-2.5-7b-instruct:free',
            'laguna-m-1-free': 'poolside/laguna-m.1:free'
          };
          let modelToUse = aiModelMap[workspace.aiModel];
          if (!modelToUse) modelToUse = 'meta-llama/llama-3-8b-instruct:free';
          const apiKey = workspace.aiApiKey || process.env.OPENROUTER_API_KEY;

          if (apiKey && chatHistory.length > 0) {
            const systemPrompt = workspace.aiSystemPrompt || "You are a helpful customer support AI.";
            
            // If there are past messages, AI should continue naturally
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://xiachat.com",
                "X-Title": "Xia Chat SaaS"
              },
              body: JSON.stringify({
                model: modelToUse,
                messages: [
                  { role: "system", content: systemPrompt },
                  ...chatHistory
                ]
              })
            });

            if (response.ok) {
              const aiData = await response.json();
              if (aiData.choices && aiData.choices[0] && aiData.choices[0].message) {
                const aiReplyText = aiData.choices[0].message.content;
                const aiReply = new Message({
                  conversationId: conversation._id,
                  senderType: 'ai',
                  senderName: 'AI Assistant',
                  text: aiReplyText
                });
                await aiReply.save();

                const room = `conv_${conversation._id}`;
                req.io.to(room).to(`workspace_${conversation.workspaceId}`).emit('receive_message', {
                  id: aiReply._id,
                  conversationId: conversation._id,
                  room: room,
                  type: 'ai',
                  sender: 'AI Assistant',
                  text: aiReplyText,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });

                await Conversation.findByIdAndUpdate(conversation._id, { lastMessageAt: new Date() });

                // Track token usage
                if (aiData.usage) {
                  await Workspace.findByIdAndUpdate(workspace._id, {
                    $inc: { aiTokensUsed: aiData.usage.total_tokens || 50, aiRequestsUsed: 1 }
                  });
                }
              }
            }
          }
        }
      } catch (aiErr) {
        console.error("AI handoff message error:", aiErr.message);
        // Don't fail the request — mode was already changed
      }
    }

    res.json({ success: true, data: conversation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. AI Assist for rewriting agent messages
exports.aiAssist = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const apiKey = process.env.OPENROUTER_API_KEY || "";
    if (!apiKey) {
       return res.status(500).json({ error: "AI API key not configured" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { 
            role: "system", 
            content: "You are an expert customer support agent. Rewrite the user's message to be highly professional, polite, empathetic, and clear. Maintain the original meaning but improve the tone. Do NOT add any extra information that wasn't in the original message. Output ONLY the rewritten text, nothing else." 
          },
          { role: "user", content: text }
        ]
      })
    });

    const aiData = await response.json();
    let enhanced = text;
    if (aiData.choices && aiData.choices[0] && aiData.choices[0].message) {
      enhanced = aiData.choices[0].message.content.trim();
    }

    res.json({ success: true, enhancedText: enhanced });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
