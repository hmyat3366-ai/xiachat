const Workspace = require('../models/Workspace');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const crypto = require('crypto');

// 1. Get Workspace Settings
exports.getWorkspace = async (req, res) => {
  try {
    let workspace = await Workspace.findById(req.params.id);
    
    // Get member count (count of valid members in workspace)
    const memberCount = workspace ? workspace.members.length : 1;
    
    res.json({ success: true, data: { ...workspace.toObject(), memberCount } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Update Workspace AI Settings
exports.updateAISettings = async (req, res) => {
  try {
    const { aiEnabled, aiModel, aiApiKey, aiSystemPrompt } = req.body;
    let workspaceId = req.params.id;
    


    const updated = await Workspace.findByIdAndUpdate(
      workspaceId, 
      { aiEnabled, aiModel, aiApiKey, aiSystemPrompt },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2.5 Update Workspace Domains
exports.updateDomains = async (req, res) => {
  try {
    const { allowedDomains } = req.body;
    let workspaceId = req.params.id;
    


    const updated = await Workspace.findByIdAndUpdate(
      workspaceId, 
      { allowedDomains },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWidgetConfig = async (req, res) => {
  try {
    const updated = await Workspace.findByIdAndUpdate(
      req.params.id,
      { $set: { widgetConfig: req.body.widgetConfig } },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Generate Invite Link (Save to DB)
exports.generateInvite = async (req, res) => {
  try {
    let workspaceId = req.params.id;
    const { email, role } = req.body;
    

    
    if (!email) {
      return res.status(400).json({ error: 'Email is required to send an invite' });
    }

    // Check if user is already a member
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const workspace = await Workspace.findById(workspaceId);
      if (workspace && workspace.members.some(m => m.userId.toString() === existingUser._id.toString())) {
        return res.status(400).json({ error: 'User is already a member of this workspace' });
      }
    }

    // Check if pending invite already exists for this email
    const existingInvite = await Invitation.findOne({ workspaceId, email, status: 'pending' });
    if (existingInvite) {
      return res.status(400).json({ error: 'An active invitation already exists for this email.' });
    }
    
    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Create invite valid for 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invite = new Invitation({
      workspaceId,
      email,
      role: role || 'agent',
      token,
      expiresAt
    });
    
    await invite.save();
    
    // In production, we would send an email here using SendGrid or AWS SES
    // await sendEmail(email, `You've been invited to join Xia Chat... link: /join?token=${token}`);
    
    res.json({ success: true, token, invite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3.1 Get Workspace Members & Pending Invites
exports.getMembers = async (req, res) => {
  try {
    let workspaceId = req.params.id;


    const workspace = await Workspace.findById(workspaceId).populate('members.userId', 'name email');
    if (!workspace) return res.status(404).json({ error: 'Workspace not found' });

    const pendingInvites = await Invitation.find({ workspaceId, status: 'pending' });

    res.json({ 
      success: true, 
      members: workspace.members,
      invitations: pendingInvites
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3.2 Update Member Role
exports.updateMemberRole = async (req, res) => {
  try {
    const userId = req.params.memberId || req.body.userId;
    const { role } = req.body;
    let workspaceId = req.params.id;
    


    if (!['admin', 'agent'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Only admin and agent roles can be assigned.' });
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const targetMember = workspace.members.find(m => m.userId.toString() === userId.toString());
    if (!targetMember) {
      return res.status(404).json({ error: 'Target member not found in this workspace.' });
    }

    if (targetMember.role === 'owner') {
      return res.status(400).json({ error: "Owner's role cannot be changed." });
    }

    await Workspace.updateOne(
      { _id: workspaceId, "members.userId": userId },
      { $set: { "members.$.role": role } }
    );
    
    res.json({ success: true, message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3.3 Remove Member
exports.removeMember = async (req, res) => {
  try {
    const userId = req.params.memberId || req.body.userId;
    let workspaceId = req.params.id;
    


    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    const targetMember = workspace.members.find(m => m.userId.toString() === userId.toString());
    if (targetMember && targetMember.role === 'owner') {
      return res.status(400).json({ error: 'Owner cannot be removed.' });
    }

    await Workspace.findByIdAndUpdate(workspaceId, {
      $pull: { members: { userId } }
    });
    
    await User.findByIdAndUpdate(userId, {
      $pull: { workspaces: workspaceId }
    });
    
    res.json({ success: true, message: 'Member removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3.3.5 Revoke Invitation
exports.revokeInvite = async (req, res) => {
  try {
    let workspaceId = req.params.id;
    const { inviteId } = req.params;



    const invite = await Invitation.findOne({ _id: inviteId, workspaceId });
    if (!invite) {
      return res.status(404).json({ error: 'Invitation not found in this workspace' });
    }

    if (invite.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending invitations can be revoked' });
    }

    invite.status = 'revoked';
    await invite.save();

    res.json({ success: true, message: 'Invitation revoked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3.4 Join Workspace via Token
exports.joinWorkspace = async (req, res) => {
  try {
    const { token, userId } = req.body;
    if (!token || !userId) {
      return res.status(400).json({ error: 'Token and User ID are required' });
    }

    const invite = await Invitation.findOne({ token, status: 'pending' });
    if (!invite) {
      return res.status(404).json({ error: 'Invalid or expired invitation token' });
    }

    if (new Date() > invite.expiresAt) {
      invite.status = 'expired';
      await invite.save();
      return res.status(400).json({ error: 'Invitation has expired' });
    }

    const workspaceId = invite.workspaceId;

    // Check if user is already a member
    const checkWs = await Workspace.findById(workspaceId);
    if (!checkWs) {
      return res.status(404).json({ error: 'Workspace not found' });
    }
    if (checkWs.members.some(m => m.userId.toString() === userId.toString())) {
       return res.status(400).json({ error: 'User is already a member of this workspace' });
    }

    // Atomic update: Add user to workspace ONLY if limit is not reached
    // Free plan max is 2 members, so current members length must be < 2 (meaning members[1] does not exist)
    const updatedWorkspace = await Workspace.findOneAndUpdate(
      {
        _id: workspaceId,
        $or: [
          { plan: 'enterprise' },
          { plan: 'pro', "members.19": { $exists: false } },
          { plan: { $in: ['free', 'hobby', null, undefined] }, "members.1": { $exists: false } }
        ]
      },
      {
        $push: { members: { userId, role: invite.role } }
      },
      { new: true }
    );

    if (!updatedWorkspace) {
      return res.status(403).json({ error: 'Workspace member limit reached. Cannot accept invitation on Free plan.' });
    }

    // Add workspace to user
    await User.findByIdAndUpdate(userId, {
      $push: { workspaces: workspaceId }
    });

    // Update invite status
    invite.status = 'accepted';
    await invite.save();

    res.json({ success: true, message: 'Successfully joined the workspace' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Upgrade Plan (Simulated Checkout)
exports.upgradePlan = async (req, res) => {
  try {
    let workspaceId = req.params.id;
    

    
    // Simulate successful payment and upgrade
    const updated = await Workspace.findByIdAndUpdate(
      workspaceId,
      { plan: 'pro' },
      { new: true }
    );
    
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
