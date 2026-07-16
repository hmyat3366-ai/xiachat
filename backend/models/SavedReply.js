const mongoose = require('mongoose');

const savedReplySchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  title: { type: String, required: true },
  shortcut: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

savedReplySchema.index({ workspaceId: 1 });
savedReplySchema.index({ workspaceId: 1, shortcut: 1 });

module.exports = mongoose.model('SavedReply', savedReplySchema);
