const stripeApiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = require('stripe')(stripeApiKey);
const Workspace = require('../models/Workspace');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    if (workspace.subscriptionStatus === 'active') {
      return res.status(400).json({ error: 'Workspace already has an active subscription. Please manage your subscription via the billing portal.' });
    }

    let customerId = workspace.stripeCustomerId;

    // Create Stripe Customer if not exists
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        name: req.user.name,
        metadata: {
          workspaceId: workspace._id.toString()
        }
      });
      customerId = customer.id;
      workspace.stripeCustomerId = customerId;
      await workspace.save();
    }

    const { plan } = req.body;
    let priceId;
    let targetPlan = plan || 'pro'; // default to pro for backward compatibility
    
    if (targetPlan === 'enterprise') {
      priceId = process.env.STRIPE_PRICE_ID_ENTERPRISE;
    } else {
      priceId = process.env.STRIPE_PRICE_ID_PRO;
      targetPlan = 'pro';
    }

    if (!priceId) {
      return res.status(500).json({ error: 'Stripe price ID not configured for the selected plan' });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'https://xiachat-pied.vercel.app';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${frontendUrl}/dashboard/settings?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${frontendUrl}/dashboard/settings?canceled=true`,
      metadata: {
        workspaceId: workspace._id.toString(),
        plan: targetPlan
      }
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPortalSession = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) {
      return res.status(404).json({ error: 'Workspace not found' });
    }

    if (!workspace.stripeCustomerId) {
      return res.status(400).json({ error: 'No billing account found for this workspace' });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'https://xiachat-pied.vercel.app';

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: workspace.stripeCustomerId,
      return_url: `${frontendUrl}/dashboard/settings`,
    });

    res.json({ success: true, url: portalSession.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
