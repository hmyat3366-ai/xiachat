// Safe stripe initialization that won't crash the server if key is missing
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'dummy_key_to_prevent_crash');
const Workspace = require('../models/Workspace');

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const workspaceId = session.metadata?.workspaceId;
        const targetPlan = session.metadata?.plan || 'pro';
        
        if (workspaceId) {
          const workspace = await Workspace.findById(workspaceId);
          if (workspace) {
            workspace.plan = targetPlan;
            workspace.stripeSubscriptionId = session.subscription;
            workspace.stripeCustomerId = session.customer;
            workspace.subscriptionStatus = 'active';
            await workspace.save();
          }
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const status = subscription.status;
        
        const workspace = await Workspace.findOne({ stripeCustomerId: customerId });
        if (workspace) {
          workspace.subscriptionStatus = status;
          workspace.cancelAtPeriodEnd = subscription.cancel_at_period_end;
          workspace.subscriptionCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
          
          if (status !== 'active' && status !== 'past_due' && status !== 'trialing') {
             workspace.plan = 'free'; // Fallback to free if not active
          } else if (status === 'active') {
             const priceId = subscription.items?.data[0]?.price?.id;
             if (priceId === process.env.STRIPE_PRICE_ID_ENTERPRISE) {
               workspace.plan = 'enterprise';
             } else if (priceId === process.env.STRIPE_PRICE_ID_PRO) {
               workspace.plan = 'pro';
             } else {
               workspace.plan = 'pro'; // default active fallback
             }
          }
          
          await workspace.save();
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        const workspace = await Workspace.findOne({ stripeCustomerId: customerId });
        if (workspace) {
          workspace.plan = 'free';
          workspace.subscriptionStatus = 'canceled';
          workspace.cancelAtPeriodEnd = false;
          await workspace.save();
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        if (invoice.subscription) {
          const workspace = await Workspace.findOne({ stripeSubscriptionId: invoice.subscription });
          if (workspace) {
            workspace.subscriptionStatus = 'active';
            await workspace.save();
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        if (invoice.subscription) {
          const workspace = await Workspace.findOne({ stripeSubscriptionId: invoice.subscription });
          if (workspace) {
            workspace.subscriptionStatus = 'past_due';
            await workspace.save();
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
  } catch (err) {
    console.error('Webhook handler error:', err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};
