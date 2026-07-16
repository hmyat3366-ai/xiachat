const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  workspaceId: { type: String, required: true },
  visitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
  status: { type: String, enum: ['open', 'pending', 'resolved', 'closed', 'snoozed'], default: 'open' },
  departmentId: { type: String, default: null },
  isTicket: { type: Boolean, default: false },
  ticketId: { type: String, default: null },
  csatScore: { type: Number, default: null, min: 1, max: 5 },
  csatFeedback: { type: String, default: null },
  firstRespondedAt: { type: Date, default: null },
  resolvedAt: { type: Date, default: null },
  channel: { type: String, default: 'web' },
  unreadCount: { type: Number, default: 0 },
  sourceUrl: { type: String, default: 'web' },
  lastMessageAt: { type: Date, default: Date.now },
  mode: { type: String, enum: ['ai', 'human', 'assist'], default: 'human' },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  aiEnabled: { type: Boolean, default: true },
  aiConfidence: { type: Number, default: null },
  aiProcessing: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

conversationSchema.index({ workspaceId: 1 });
conversationSchema.index({ workspaceId: 1, createdAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);
