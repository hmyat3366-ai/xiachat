const Workspace = require('../models/Workspace');

exports.checkMemberLimit = async (req, res, next) => {
  try {
    const workspaceId = req.params.id || req.body.workspaceId;
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
    
    if (workspace.plan === 'free' || workspace.plan === 'hobby') {
      if (workspace.members.length >= 2) {
        return res.status(403).json({ 
          error: 'Free plan limit reached. Upgrade to Pro to add more members.',
          requiresUpgrade: true
        });
      }
    }
    
    next();
  } catch (err) {
    res.status(500).json({ error: 'Limit check failed' });
  }
};

exports.checkDomainLimit = async (req, res, next) => {
  try {
    const workspaceId = req.params.id || req.body.workspaceId;
    const { allowedDomains } = req.body;
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
    
    if (workspace.plan === 'free' || workspace.plan === 'hobby') {
      if (allowedDomains && allowedDomains.length > 1) {
        return res.status(403).json({ 
          error: 'Free plan allows only 1 domain. Upgrade to Pro to add more domains.',
          requiresUpgrade: true
        });
      }
    }
    
    next();
  } catch (err) {
    res.status(500).json({ error: 'Limit check failed' });
  }
};

exports.checkAIAccess = async (req, res, next) => {
  try {
    const workspaceId = req.params.id || req.body.workspaceId;
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) return res.status(404).json({ error: 'Workspace not found' });
    
    if (workspace.plan === 'free' || workspace.plan === 'hobby') {
      const isFreeModel = workspace.aiModel && (
        workspace.aiModel.includes('free') ||
        workspace.aiModel.includes('llama') ||
        workspace.aiModel.includes('gemma') ||
        workspace.aiModel.includes('qwen')
      );
      if (isFreeModel) {
        return next();
      }
      return res.status(403).json({ 
        error: 'AI Features are only available on the Pro plan or when using Free Models.',
        requiresUpgrade: true
      });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ error: 'Limit check failed' });
  }
};
