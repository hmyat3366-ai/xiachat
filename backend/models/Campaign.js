const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Email', 'In-App Popup', 'Automated Message'], 
    default: 'Email' 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Draft', 'Completed'], 
    default: 'Draft' 
  },
  audience: { type: String, required: true },
  message: { type: String, required: true },
  sent: { type: Number, default: 0 },
  opened: { type: String, default: '-' },
  clicked: { type: String, default: '-' }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
