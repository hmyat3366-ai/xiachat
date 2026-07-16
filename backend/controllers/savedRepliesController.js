const SavedReply = require('../models/SavedReply');
const Workspace = require('../models/Workspace');

exports.getReplies = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const replies = await SavedReply.find({ workspaceId }).sort({ createdAt: -1 });
    res.json({ success: true, data: replies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReply = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { title, shortcut, content, category } = req.body;
    
    if (!title || !shortcut || !content) {
      return res.status(400).json({ error: 'Title, shortcut, and content are required' });
    }

    const formattedShortcut = shortcut.startsWith('/') ? shortcut : `/${shortcut}`;

    const reply = new SavedReply({
      workspaceId,
      title,
      shortcut: formattedShortcut,
      content,
      category,
      createdBy: req.user._id
    });
    
    await reply.save();
    res.json({ success: true, data: reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortcut, content, category } = req.body;
    
    const formattedShortcut = shortcut && !shortcut.startsWith('/') ? `/${shortcut}` : shortcut;

    const reply = await SavedReply.findByIdAndUpdate(
      id,
      { title, shortcut: formattedShortcut, content, category },
      { new: true }
    );
    
    res.json({ success: true, data: reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    const { id } = req.params;
    await SavedReply.findByIdAndDelete(id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
