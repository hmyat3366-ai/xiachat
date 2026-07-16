const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['text', 'faq', 'document', 'url'], default: 'text' },
  content: { type: String, required: true },
  status: { type: String, enum: ['processing', 'active', 'failed'], default: 'active' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

knowledgeBaseSchema.index({ workspaceId: 1 });

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);
