const Campaign = require('../models/Campaign');

// Get all campaigns for a workspace
exports.getCampaigns = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    
    // Auth check: Ensure the user belongs to the workspace they are querying
    if (!req.user.workspaces.includes(workspaceId)) {
      return res.status(403).json({ error: 'Access denied to this workspace' });
    }

    const campaigns = await Campaign.find({ workspaceId }).sort({ createdAt: -1 });
    res.json({ success: true, data: campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const { workspaceId, name, type, audience, message } = req.body;

    // Auth check
    if (!req.user.workspaces.includes(workspaceId)) {
      return res.status(403).json({ error: 'Access denied to this workspace' });
    }

    const campaign = new Campaign({
      workspaceId,
      name,
      type,
      audience,
      message,
      status: 'Draft',
      sent: 0,
      opened: '-',
      clicked: '-'
    });

    await campaign.save();
    res.status(201).json({ success: true, data: campaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

// Publish (Update status to Active)
exports.publishCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { workspaceId } = req.body; // Needs workspaceId to verify

    if (!req.user.workspaces.includes(workspaceId)) {
      return res.status(403).json({ error: 'Access denied to this workspace' });
    }

    const campaign = await Campaign.findOne({ _id: id, workspaceId });
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    campaign.status = 'Active';
    await campaign.save();

    res.json({ success: true, data: campaign });
  } catch (error) {
    console.error('Error publishing campaign:', error);
    res.status(500).json({ error: 'Failed to publish campaign' });
  }
};
