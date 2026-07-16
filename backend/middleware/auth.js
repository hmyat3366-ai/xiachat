const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fail loudly at startup if JWT_SECRET is missing — never use a fallback
if (!process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is not set. Server cannot start securely.');
}
const Workspace = require('../models/Workspace');

exports.requireAuth = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token && req.query.token) {
      token = `Bearer ${req.query.token}`;
    }

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

exports.requireWorkspaceAccess = async (req, res, next) => {
  try {
    const workspaceId = req.params.workspaceId || req.params.id || req.body.workspaceId;
    
    if (!workspaceId) {
      return res.status(400).json({ error: 'Workspace ID is required' });
    }

    // Demo bypass for the preview mode removed to enforce security

    // Check if user is an owner/member of the workspace via their User model
    if (!req.user.workspaces.some(id => id.toString() === workspaceId.toString())) {
      return res.status(403).json({ error: 'Access denied to this workspace' });
    }

    // You can also check roles here by looking up Workspace members array if needed
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    
    const member = workspace.members.find(m => m.userId.toString() === req.user._id.toString());
    if (!member) {
      return res.status(403).json({ error: 'Access denied to this workspace' });
    }

    req.workspaceRole = member.role;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Error verifying workspace access' });
  }
};

exports.requireAdmin = (req, res, next) => {
  if (req.workspaceRole !== 'admin' && req.workspaceRole !== 'owner') {
    return res.status(403).json({ error: 'Admin or Owner privileges required' });
  }
  next();
};

exports.requireManager = (req, res, next) => {
  if (req.workspaceRole !== 'manager' && req.workspaceRole !== 'admin' && req.workspaceRole !== 'owner') {
    return res.status(403).json({ error: 'Manager, Admin or Owner privileges required' });
  }
  next();
};
