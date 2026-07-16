const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Facebook (Messenger/Instagram) Webhook Verification
router.get('/facebook', webhookController.verifyFacebookWebhook);

// Facebook (Messenger/Instagram) Message Handling
router.post('/facebook', webhookController.handleFacebookMessage);

// WhatsApp Webhook Verification
router.get('/whatsapp', webhookController.verifyWhatsAppWebhook);

// WhatsApp Message Handling
router.post('/whatsapp', webhookController.handleWhatsAppMessage);

module.exports = router;
