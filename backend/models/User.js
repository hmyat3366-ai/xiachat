const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  role: { type: String, enum: ['admin', 'member'], default: 'admin' },
  workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
