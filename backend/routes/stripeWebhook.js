const express = require('express');
const router = express.Router();
const stripeWebhookController = require('../controllers/stripeWebhookController');

// The raw body is required by Stripe, so we do not use requireAuth or express.json here
router.post('/', stripeWebhookController.handleWebhook);

module.exports = router;
