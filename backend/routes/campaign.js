const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { requireAuth } = require('../middleware/auth');

// Apply auth middleware to all campaign routes
router.use(requireAuth);

router.get('/:workspaceId', campaignController.getCampaigns);
router.post('/', campaignController.createCampaign);
router.patch('/:id/publish', campaignController.publishCampaign);

module.exports = router;
