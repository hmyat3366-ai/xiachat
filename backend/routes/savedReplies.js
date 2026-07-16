const express = require('express');
const router = express.Router();
const savedRepliesController = require('../controllers/savedRepliesController');
const { requireAuth, requireWorkspaceAccess } = require('../middleware/auth');

router.get('/:workspaceId', requireAuth, requireWorkspaceAccess, savedRepliesController.getReplies);
router.post('/:workspaceId', requireAuth, requireWorkspaceAccess, savedRepliesController.createReply);
router.put('/:workspaceId/:id', requireAuth, requireWorkspaceAccess, savedRepliesController.updateReply);
router.delete('/:workspaceId/:id', requireAuth, requireWorkspaceAccess, savedRepliesController.deleteReply);

module.exports = router;
