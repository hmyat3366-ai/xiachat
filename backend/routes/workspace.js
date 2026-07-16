const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController');
const { requireAuth, requireWorkspaceAccess, requireAdmin } = require('../middleware/auth');
const { checkMemberLimit, checkDomainLimit, checkAIAccess } = require('../middleware/limits');

router.get('/:id', requireAuth, requireWorkspaceAccess, workspaceController.getWorkspace);
router.put('/:id/ai-settings', requireAuth, requireWorkspaceAccess, requireAdmin, checkAIAccess, workspaceController.updateAISettings);
router.put('/:id/domains', requireAuth, requireWorkspaceAccess, requireAdmin, checkDomainLimit, workspaceController.updateDomains);
router.put('/:id/widget', requireAuth, requireWorkspaceAccess, requireAdmin, workspaceController.updateWidgetConfig);
router.post('/:id/invite', requireAuth, requireWorkspaceAccess, requireAdmin, checkMemberLimit, workspaceController.generateInvite);
router.post('/join', requireAuth, workspaceController.joinWorkspace);
router.get('/:id/members', requireAuth, requireWorkspaceAccess, workspaceController.getMembers);
router.patch('/:id/members/:memberId/role', requireAuth, requireWorkspaceAccess, requireAdmin, workspaceController.updateMemberRole);
router.delete('/:id/members/:memberId', requireAuth, requireWorkspaceAccess, requireAdmin, workspaceController.removeMember);
router.delete('/:id/members', requireAuth, requireWorkspaceAccess, requireAdmin, workspaceController.removeMember);
router.post('/:id/upgrade', requireAuth, requireWorkspaceAccess, requireAdmin, workspaceController.upgradePlan);
router.delete('/:id/invites/:inviteId', requireAuth, requireWorkspaceAccess, requireAdmin, workspaceController.revokeInvite);
module.exports = router;
