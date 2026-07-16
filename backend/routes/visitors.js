const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const { requireAuth, requireWorkspaceAccess } = require('../middleware/auth');

router.get('/:workspaceId/export-csv', requireAuth, requireWorkspaceAccess, visitorController.exportContactsCSV);
router.get('/:workspaceId', requireAuth, requireWorkspaceAccess, visitorController.getVisitors);
router.post('/', requireAuth, visitorController.createVisitor);
router.put('/:id', requireAuth, visitorController.updateVisitor);

module.exports = router;
