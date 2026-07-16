const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

const { requireAuth, requireWorkspaceAccess } = require('../middleware/auth');
const { checkAIAccess } = require('../middleware/limits');

router.post('/widget/init', chatController.initWidget);
router.get('/conversations/:workspaceId', requireAuth, requireWorkspaceAccess, chatController.getConversations);
router.get('/messages/:conversationId', requireAuth, chatController.getMessages);
router.put('/conversations/:id/resolve', requireAuth, chatController.resolveConversation);
router.patch('/conversations/:id/mode', requireAuth, chatController.updateConversationMode);
router.post('/ai-assist', requireAuth, checkAIAccess, chatController.aiAssist);

module.exports = router;
