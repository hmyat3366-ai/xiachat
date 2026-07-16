/**
 * security.js — Centralized security middleware
 *
 * Contains all rate limiters and input sanitizers.
 * Business logic is NOT touched — this is a pure middleware layer.
 *
 * Rate limit tiers:
 *   globalLimiter   → All routes          — 200 req / 10 min per IP
 *   chatLimiter     → Widget/chat routes  — 60 req  / 1 min  per IP (anti-spam)
 *   uploadLimiter   → Upload routes       — 10 req  / 5 min  per IP
 *   apiLimiter      → General API         — 100 req / 5 min  per IP
 */

const rateLimit = require('express-rate-limit');

// ─── Rate Limiters ────────────────────────────────────────────────────────────

/** Broad catch-all — prevents volumetric DDoS */
const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down.' },
  skip: (req) => req.path === '/api/health', // health check never rate-limited
});

/** Chat / widget endpoints — tighter window to prevent AI prompt spam */
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Chat rate limit reached. Please wait a moment.' },
});

/** Auth endpoints — brute force protection (replaces old inline definition in server.js) */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

/** File upload — prevent storage abuse */
const uploadLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Upload limit reached. Please wait before uploading again.' },
});

/** General authenticated API — prevents scraping and enumeration */
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'API rate limit exceeded. Please retry shortly.' },
});

// ─── Input Sanitizer ──────────────────────────────────────────────────────────

/**
 * Sanitizes request body to prevent MongoDB Operator Injection.
 * e.g. { "email": { "$gt": "" } } — a common NoSQL injection pattern.
 *
 * This does NOT modify any values — it only strips keys that start with '$'.
 * Controllers and models are completely untouched.
 */
function sanitizeBody(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) {
      delete obj[key]; // strip MongoDB operators from user input
    } else if (typeof obj[key] === 'object') {
      sanitizeBody(obj[key]); // recurse into nested objects
    }
  }
  return obj;
}

const mongoSanitizer = (req, _res, next) => {
  if (req.body) sanitizeBody(req.body);
  if (req.query) sanitizeBody(req.query);
  if (req.params) sanitizeBody(req.params);
  next();
};

// ─── Message Size Guard ───────────────────────────────────────────────────────

/**
 * Rejects chat messages that are unreasonably large.
 * Prevents prompt injection via oversized payloads.
 * Only applied to chat routes — no other routes are affected.
 */
const MAX_MESSAGE_LENGTH = 4000;

const chatMessageGuard = (req, res, next) => {
  const { message, content } = req.body || {};
  const text = message || content;
  if (text && typeof text === 'string' && text.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      error: `Message too long. Maximum allowed is ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }
  next();
};

module.exports = {
  globalLimiter,
  authLimiter,
  chatLimiter,
  uploadLimiter,
  apiLimiter,
  mongoSanitizer,
  chatMessageGuard,
};
