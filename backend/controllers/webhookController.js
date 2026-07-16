const Conversation = require('../models/Conversation');
const Visitor = require('../models/Visitor');
const Message = require('../models/Message');

const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'xia-chat-super-secret-token';
const WA_VERIFY_TOKEN = process.env.WA_VERIFY_TOKEN || 'xia-chat-super-secret-token';

// A hardcoded workspace ID for demo. In a real app, the webhook URL might have the workspaceId
// e.g. /api/webhooks/facebook/:workspaceId
const DEMO_WORKSPACE_ID = '';

// ==========================================
// FACEBOOK / INSTAGRAM
// ==========================================

exports.verifyFacebookWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === FB_VERIFY_TOKEN) {
      console.log('FB Webhook Verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.handleFacebookMessage = async (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    for (const entry of body.entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;
      
      if (webhook_event.message && !webhook_event.message.is_echo) {
        const text = webhook_event.message.text;
        
        try {
          // 1. Find or create visitor
          let visitor = await Visitor.findOne({ 'metadata.psid': sender_psid });
          if (!visitor) {
            visitor = new Visitor({
              name: 'Facebook User',
              metadata: { psid: sender_psid, source: 'facebook' }
            });
            await visitor.save();
          }

          // 2. Find or create active conversation
          let conversation = await Conversation.findOne({
            visitorId: visitor._id,
            status: { $ne: 'resolved' },
            channel: 'facebook'
          });

          if (!conversation) {
            conversation = new Conversation({
              workspaceId: DEMO_WORKSPACE_ID,
              visitorId: visitor._id,
              channel: 'facebook',
              status: 'open'
            });
            await conversation.save();
          }

          // 3. Save message
          const msg = new Message({
            conversationId: conversation._id,
            senderId: visitor._id.toString(),
            senderType: 'visitor',
            text: text
          });
          await msg.save();
          
          // Update conversation timestamp
          conversation.lastMessageAt = Date.now();
          conversation.status = 'open';
          await conversation.save();

          // 4. Emit to frontend admin via Socket.io
          if (req.io) {
            const populatedMsg = await Message.findById(msg._id).populate('senderId', 'name email');
            req.io.to(DEMO_WORKSPACE_ID).emit('receive_message', populatedMsg);
            req.io.to(DEMO_WORKSPACE_ID).emit('conversation_updated', conversation);
          }
        } catch (error) {
          console.error('Error processing FB message:', error);
        }
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};

// ==========================================
// WHATSAPP
// ==========================================

exports.verifyWhatsAppWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === WA_VERIFY_TOKEN) {
      console.log('WA Webhook Verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.handleWhatsAppMessage = async (req, res) => {
  const body = req.body;

  if (body.object) {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0]) {
      const wa_message = body.entry[0].changes[0].value.messages[0];
      const sender_wa_id = wa_message.from; // Phone number
      const text = wa_message.text ? wa_message.text.body : '';
      const profile_name = body.entry[0].changes[0].value.contacts?.[0]?.profile?.name || 'WA User';
      
      try {
        // 1. Find or create visitor
        let visitor = await Visitor.findOne({ 'metadata.wa_id': sender_wa_id });
        if (!visitor) {
          visitor = new Visitor({
            name: profile_name,
            metadata: { wa_id: sender_wa_id, source: 'whatsapp' }
          });
          await visitor.save();
        }

        // 2. Find or create active conversation
        let conversation = await Conversation.findOne({
          visitorId: visitor._id,
          status: { $ne: 'resolved' },
          channel: 'whatsapp'
        });

        if (!conversation) {
          conversation = new Conversation({
            workspaceId: DEMO_WORKSPACE_ID,
            visitorId: visitor._id,
            channel: 'whatsapp',
            status: 'open'
          });
          await conversation.save();
        }

        // 3. Save message
        if (text) {
          const msg = new Message({
            conversationId: conversation._id,
            senderId: visitor._id.toString(),
            senderType: 'visitor',
            text: text
          });
          await msg.save();
          
          conversation.lastMessageAt = Date.now();
          conversation.status = 'open';
          await conversation.save();

          // 4. Emit
          if (req.io) {
            const populatedMsg = await Message.findById(msg._id).populate('senderId', 'name email');
            req.io.to(DEMO_WORKSPACE_ID).emit('receive_message', populatedMsg);
            req.io.to(DEMO_WORKSPACE_ID).emit('conversation_updated', conversation);
          }
        }
      } catch (error) {
        console.error('Error processing WA message:', error);
      }
    }
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};
