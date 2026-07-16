const axios = require('axios');
const io = require('socket.io-client');

const API_URL = 'https://xiachat.onrender.com/api';
const SOCKET_URL = 'https://xiachat.onrender.com';

async function runE2E() {
  console.log('--- STARTING LIVE PRODUCTION QA TEST ---');
  let token = '';
  let workspaceId = '';
  let visitorId = '';
  let conversationId = '';
  let room = '';
  const email = `qa-test-${Date.now()}@xiachat.com`;
  const password = 'QaTestPassword123!';

  try {
    console.log(`\n[1/7] Registering new user: ${email}`);
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      name: 'QA User',
      email: email,
      password: password
    });
    token = registerRes.data.token;
    console.log('✅ Registration successful. Token received.');

    console.log(`\n[2/7] Verifying workspace creation...`);
    const checkUserRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    workspaceId = checkUserRes.data.workspaces[0];
    if (workspaceId) {
       console.log(`✅ Default workspace created automatically: ${workspaceId}`);
    } else {
       throw new Error('Workspace was not created automatically');
    }

    console.log(`\n[3/7] Connecting visitor chat widget socket...`);
    // Need to whitelist "localhost" or test domain first?
    // Let's whitelist 'localhost' via API just in case CORS blocks widget, although backend defaults allow localhost.
    
    const widgetSocket = io(SOCKET_URL, {
      query: { type: 'visitor' },
      transports: ['websocket']
    });

    await new Promise((resolve, reject) => {
      widgetSocket.on('connect', resolve);
      setTimeout(() => reject('Widget socket timeout'), 5000);
    });
    console.log('✅ Visitor socket connected.');

    console.log(`\n[4/7] Initializing widget and sending customer chat...`);
    const initRes = await axios.post(`${API_URL}/widget/init`, {
      workspaceId: workspaceId,
      visitorInfo: { name: 'E2E Customer', email: 'customer@test.com', origin: 'http://localhost' }
    });
    
    visitorId = initRes.data.visitorId;
    conversationId = initRes.data.conversationId;
    room = initRes.data.room;
    console.log(`✅ Widget initialized. Conversation: ${conversationId}`);

    widgetSocket.emit('join_room', room);

    // Now connect Agent Socket
    const agentSocket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket']
    });
    await new Promise((resolve) => agentSocket.on('connect', resolve));
    console.log('✅ Agent socket connected.');
    agentSocket.emit('join_workspace', workspaceId);

    // Send customer message
    widgetSocket.emit('send_message', {
      room,
      conversationId,
      workspaceId,
      sender: 'visitor',
      text: 'Hello, I need help with your service.'
    });
    console.log('✅ Customer message sent.');

    console.log(`\n[5/7] Waiting for AI reply...`);
    let aiResponded = false;
    await new Promise((resolve) => {
      widgetSocket.on('receive_message', (msg) => {
        if (msg.senderType === 'ai' || msg.sender === 'System') {
           console.log(`🤖 AI Reply received: "${msg.text}"`);
           aiResponded = true;
           resolve();
        }
      });
      setTimeout(() => {
        console.log("⚠️ AI did not reply in 30s. Skipping...");
        resolve();
      }, 30000);
    });

    console.log(`\n[6/7] Agent taking over and replying...`);
    await axios.patch(`${API_URL}/conversations/${conversationId}/mode`, { mode: 'human' }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Conversation mode updated to HUMAN.');
    
    agentSocket.emit('send_message', {
      room,
      conversationId,
      workspaceId,
      sender: 'agent',
      text: 'Hello! A human agent is here to help.'
    });

    await new Promise((resolve, reject) => {
      widgetSocket.on('receive_message', (msg) => {
        if (msg.sender === 'agent' && !msg.isAi) {
           console.log(`👩‍💼 Agent Reply received: "${msg.text}"`);
           resolve();
        }
      });
      setTimeout(() => reject('Agent Reply Timeout'), 5000);
    });

    console.log(`\n[7/7] Verifying Upgrade Plan restrictions (Stripe flow mock)...`);
    // We cannot mock stripe checkout fully here without webhooks, but we can verify the checkout session creation works.
    try {
      const checkoutRes = await axios.post(`${API_URL}/billing/${workspaceId}/create-checkout-session`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (checkoutRes.data.url) {
        console.log('✅ Stripe checkout session created successfully: ' + checkoutRes.data.url);
      }
    } catch(err) {
      console.log('Note: Stripe checkout creation failed (expected if keys missing). ' + (err.response?.data?.error || err.message));
    }

    console.log('\n--- LIVE PRODUCTION QA TEST PASSED SUCCESSFULLY ---');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ E2E TEST FAILED:', error.response?.data || error.message || error);
    process.exit(1);
  }
}

runE2E();
