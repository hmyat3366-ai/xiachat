const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  senderType: { type: String, enum: ['visitor', 'operator', 'internal', 'campaign', 'ai'], required: true },
  senderName: { type: String },
  text: { type: String, required: true },
  responderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

messageSchema.index({ conversationId: 1 });
messageSchema.index({ conversationId: 1, createdAt: 1 });

module.exports = mongoose.model('Message', messageSchema);
