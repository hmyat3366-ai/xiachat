const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  workspaceId: { type: String, required: true },
  name: { type: String, default: 'Anonymous Visitor' },
  email: { type: String },
  location: { type: String },
  browser: { type: String },
  os: { type: String },
  ipAddress: { type: String },
  currentPage: { type: String },
  phone: { type: String },
  company: { type: String },
  status: { type: String, default: 'Lead' },
  deliveredCampaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', visitorSchema);
