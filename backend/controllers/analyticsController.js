const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Workspace = require('../models/Workspace');

exports.getAnalytics = async (req, res) => {
  try {
    let workspaceId = req.params.workspaceId;


    // Total Conversations
    const totalConversations = await Conversation.countDocuments({ workspaceId });
    
    // Total Messages Sent by Operator/AI
    const totalReplies = await Message.countDocuments({ 
      workspaceId,
      senderType: { $in: ['operator', 'ai'] }
    });

    const aiHandled = await Conversation.countDocuments({ workspaceId, mode: 'ai' });
    const humanHandled = await Conversation.countDocuments({ workspaceId, mode: { $in: ['human', 'assist'] } });

    const ratedConversations = await Conversation.find({ workspaceId, csatScore: { $ne: null } });
    const avgCsat = ratedConversations.length > 0 
      ? (ratedConversations.reduce((acc, curr) => acc + curr.csatScore, 0) / ratedConversations.length).toFixed(1)
      : 0;

    // We can simulate some data for UI display
    // e.g., week by week
    const chartData = [10, 15, 8, 24, 13, 30, 20]; // Mock weekly data for now

    res.json({
      success: true,
      data: {
        totalConversations,
        totalReplies,
        aiHandled,
        humanHandled,
        avgCsat,
        chartData
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
