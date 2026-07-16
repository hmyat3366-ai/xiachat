const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const { requireAuth, requireWorkspaceAccess, requireAdmin } = require('../middleware/auth');

router.post('/:workspaceId/create-checkout-session', requireAuth, requireWorkspaceAccess, requireAdmin, billingController.createCheckoutSession);
router.post('/:workspaceId/create-portal-session', requireAuth, requireWorkspaceAccess, requireAdmin, billingController.createPortalSession);

module.exports = router;
