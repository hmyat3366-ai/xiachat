const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'expired', 'revoked'], default: 'pending' },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

// Ensure only one pending invitation per email per workspace
invitationSchema.index(
  { workspaceId: 1, email: 1, status: 1 }, 
  { unique: true, partialFilterExpression: { status: 'pending' } }
);

module.exports = mongoose.model('Invitation', invitationSchema);
