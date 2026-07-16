const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { requireAuth, requireWorkspaceAccess } = require('../middleware/auth');

router.get('/:workspaceId', requireAuth, requireWorkspaceAccess, analyticsController.getAnalytics);

module.exports = router;
