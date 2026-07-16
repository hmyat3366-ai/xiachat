const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['owner', 'admin', 'manager', 'agent'], default: 'agent' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, default: null },
    joinedAt: { type: Date, default: Date.now }
  }],
  departments: [{
    name: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  websiteUrl: { type: String },
  aiEnabled: { type: Boolean, default: false },
  aiModel: { type: String, default: 'llama-3-8b-free' },
  aiApiKey: { type: String, default: '' },
  aiSystemPrompt: { type: String, default: 'နင်က Xia Chat ရဲ့ Customer Support AI Assistant ဖြစ်တယ်။ Customer လာနှုတ်ဆက်ရင် ယဉ်ယဉ်ကျေးကျေးနဲ့ မြန်မာလို ပြန်နှုတ်ဆက်ပါ။ Customer မေးတာတွေကို တတ်နိုင်သလောက် ဖြေပေးပါ။ မဖြေနိုင်တဲ့ ကိစ္စတွေဖြစ်ဖြစ်၊ Customer က Admin နဲ့ စကားပြောချင်တာပဲဖြစ်ဖြစ် ကြုံလာရင် "Admin မကြာခင် ပြန်လည်ဖြေကြားပေးပါလိမ့်မယ်ရှင်၊ ကျေးဇူးပြုပြီး ခဏလေး စောင့်ဆိုင်းပေးပါနော်" လို့ ပြောပြီး စောင့်ခိုင်းပါ။ စာကို တိုတိုနဲ့ ရှင်းရှင်းလင်းလင်းပဲ ပြန်ပါ။' },
  aiTokensUsed: { type: Number, default: 0 },
  aiRequestsUsed: { type: Number, default: 0 },
  aiMonthlyLimit: { type: Number, default: 500000 },
  channels: [{
    name: String,
    connected: Boolean,
    providerData: mongoose.Schema.Types.Mixed // API keys or tokens for Facebook/WhatsApp
  }],
  plan: { type: String, enum: ['free', 'hobby', 'pro', 'enterprise'], default: 'free' },
  monthlyConversations: { type: Number, default: 0 },
  allowedDomains: [{ type: String }],
  
  widgetConfig: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  // Stripe Billing Fields
  stripeCustomerId: { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },
  stripePriceId: { type: String, default: null },
  subscriptionStatus: { 
    type: String, 
    enum: ['active', 'past_due', 'canceled', 'unpaid', 'incomplete', 'trialing', null],
    default: null 
  },
  subscriptionCurrentPeriodEnd: { type: Date, default: null },
  cancelAtPeriodEnd: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workspace', workspaceSchema);
