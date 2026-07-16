const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');
const { requireAuth, requireWorkspaceAccess } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/auth'); // assuming admin needed to manage KB

router.post('/:workspaceId', requireAuth, requireWorkspaceAccess, requireAdmin, knowledgeController.addKnowledge);
router.post('/:workspaceId/scan', requireAuth, requireWorkspaceAccess, requireAdmin, knowledgeController.scanWebsite);
router.post('/:workspaceId/crawl', requireAuth, requireWorkspaceAccess, requireAdmin, knowledgeController.crawlWebsite);
router.get('/:workspaceId', requireAuth, requireWorkspaceAccess, knowledgeController.getKnowledge);
router.delete('/:workspaceId/:kbId', requireAuth, requireWorkspaceAccess, requireAdmin, knowledgeController.deleteKnowledge);

module.exports = router;
