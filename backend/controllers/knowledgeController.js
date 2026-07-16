const KnowledgeBase = require('../models/KnowledgeBase');
const Workspace = require('../models/Workspace');

exports.addKnowledge = async (req, res) => {
  try {
    const { title, type, content } = req.body;
    let workspaceId = req.params.workspaceId;
    


    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const kb = new KnowledgeBase({
      workspaceId,
      title,
      type: type || 'text',
      content,
      status: 'active'
    });
    
    await kb.save();

    // In a real scenario, you'd trigger a background job here to chunk the content
    // and store the embeddings in Pinecone or MongoDB Atlas Vector Search.

    res.status(201).json({ success: true, data: kb });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKnowledge = async (req, res) => {
  try {
    let workspaceId = req.params.workspaceId;


    const kbEntries = await KnowledgeBase.find({ workspaceId }).sort({ createdAt: -1 });
    res.json({ success: true, data: kbEntries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteKnowledge = async (req, res) => {
  try {
    let workspaceId = req.params.workspaceId;


    const kbId = req.params.kbId;
    const deleted = await KnowledgeBase.findOneAndDelete({ _id: kbId, workspaceId });
    if (!deleted) {
      return res.status(404).json({ error: "Knowledge base entry not found" });
    }

    // In a real scenario, delete the associated vectors from Pinecone/Mongo

    res.json({ success: true, message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const axios = require('axios');
const cheerio = require('cheerio');

exports.scanWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    let workspaceId = req.params.workspaceId;

    if (!url) {
      return res.status(400).json({ error: "URL is required for scanning." });
    }

    // Basic URL validation
    let validUrl = url;
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    // Fetch the webpage
    const response = await axios.get(validUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000 // 10s timeout
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove unnecessary elements
    $('script, style, noscript, iframe, img, svg, video, nav, footer, header').remove();

    // Extract text and clean it up
    let textContent = $('body').text();
    // Replace multiple newlines and spaces with single space/newline
    textContent = textContent.replace(/\s+/g, ' ').trim();

    if (!textContent || textContent.length < 50) {
      return res.status(400).json({ error: "Could not extract enough text from the provided URL." });
    }

    // Get page title for the KB entry
    let pageTitle = $('title').text().trim() || validUrl;

    // Save to Knowledge Base
    const kb = new KnowledgeBase({
      workspaceId,
      title: `Scanned: ${pageTitle}`,
      type: 'url',
      content: textContent,
      status: 'active',
      metadata: { sourceUrl: validUrl }
    });
    
    await kb.save();

    res.status(201).json({ success: true, data: kb, message: "Website scanned successfully." });

  } catch (err) {
    console.error("Website Scan Error:", err.message);
    res.status(500).json({ error: "Failed to scan website. Please check the URL or try again later." });
  }
};

const crawlerService = require('../services/crawler');

exports.crawlWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    let workspaceId = req.params.workspaceId;

    if (!url) {
      return res.status(400).json({ error: "URL is required for crawling." });
    }

    res.status(202).json({ success: true, message: "Crawling started in the background." });

    // Background process
    setImmediate(async () => {
      try {
        console.log(`Starting crawl for ${url} (Workspace: ${workspaceId})`);
        const pages = await crawlerService.crawlWebsite(url);
        
        let savedCount = 0;
        for (const page of pages) {
           // Skip if already in DB to avoid duplicates
           const existing = await KnowledgeBase.findOne({ workspaceId, 'metadata.sourceUrl': page.url });
           if (!existing) {
              const kb = new KnowledgeBase({
                workspaceId,
                title: `[Crawl] ${page.title}`,
                type: 'url',
                content: page.content,
                status: 'active',
                metadata: { sourceUrl: page.url, crawledAt: new Date() }
              });
              await kb.save();
              savedCount++;
           }
        }
        console.log(`✅ Crawl finished for ${url}. Saved ${savedCount} new pages to Knowledge Base.`);
      } catch (err) {
        console.error(`❌ Crawl background task failed for ${url}:`, err.message);
      }
    });

  } catch (err) {
    console.error("Crawl Endpoint Error:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};
