/**
 * Xia Chat — Website Crawler Service
 * Crawls same-domain pages respecting robots.txt
 * Extracts title, headings, paragraphs, FAQs
 */

const axios = require('axios');
const cheerio = require('cheerio');

const USER_AGENT = 'Mozilla/5.0 (compatible; XiaChatBot/1.0; +https://xiachat.com)';
const MAX_DEPTH = 3;
const MAX_PAGES = 30;
const REQUEST_DELAY_MS = 500;
const IGNORE_PATTERNS = [
  /login/i, /logout/i, /admin/i, /register/i, /signup/i,
  /sign-up/i, /sign-in/i, /account/i, /password/i,
  /checkout/i, /cart/i, /wp-admin/i, /\.pdf$/i, /\.zip$/i,
  /\.png$/i, /\.jpg$/i, /\.gif$/i, /\.css$/i, /\.js$/i,
  /#/, /\?s=/, /feed/, /xmlrpc/
];

/**
 * Fetch and parse robots.txt to get disallowed paths
 */
async function fetchRobotsTxt(baseUrl) {
  const disallowed = [];
  try {
    const res = await axios.get(`${baseUrl}/robots.txt`, {
      headers: { 'User-Agent': USER_AGENT },
      timeout: 5000
    });
    const lines = res.data.split('\n');
    let userAgentMatch = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith('user-agent:')) {
        const ua = trimmed.split(':')[1].trim();
        userAgentMatch = ua === '*' || ua.toLowerCase().includes('xiaChat');
      }
      if (userAgentMatch && trimmed.toLowerCase().startsWith('disallow:')) {
        const path = trimmed.split(':')[1].trim();
        if (path && path !== '/') {
          disallowed.push(path);
        }
      }
    }
  } catch (e) {
    // robots.txt not found — assume all allowed
  }
  return disallowed;
}

/**
 * Check if a URL should be ignored
 */
function shouldIgnore(url, disallowedPaths) {
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.test(url)) return true;
  }
  try {
    const parsed = new URL(url);
    const path = parsed.pathname;
    for (const d of disallowedPaths) {
      if (path.startsWith(d)) return true;
    }
  } catch (e) {
    return true;
  }
  return false;
}

/**
 * Extract meaningful text content from a page's HTML
 */
function extractContent(html, url) {
  const $ = cheerio.load(html);

  // Remove noise elements
  $('script, style, noscript, iframe, img, svg, video, nav, footer, header, aside, .cookie, [class*="cookie"], [class*="popup"], [class*="modal"]').remove();

  const title = $('title').text().trim() || $('h1').first().text().trim() || url;

  // Extract headings
  const headings = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 3) headings.push(text);
  });

  // Extract paragraphs
  const paragraphs = [];
  $('p, li, dd, blockquote').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 30) paragraphs.push(text);
  });

  // Extract meta description
  const metaDesc = $('meta[name="description"]').attr('content') || '';

  // Build readable content chunks
  const chunks = [];

  if (metaDesc) chunks.push(`Summary: ${metaDesc}`);

  // Combine headings with following paragraphs (simulated FAQ/section pairing)
  $('h2, h3').each((_, el) => {
    const heading = $(el).text().trim();
    if (!heading) return;
    const nextText = $(el).next('p, ul, ol, div').text().trim();
    if (nextText && nextText.length > 20) {
      chunks.push(`${heading}: ${nextText.substring(0, 500)}`);
    }
  });

  // Add standalone paragraphs
  paragraphs.slice(0, 20).forEach(p => chunks.push(p.substring(0, 300)));

  const fullContent = chunks.join('\n\n');

  return {
    title,
    content: fullContent.substring(0, 6000), // max 6000 chars per page
    headings,
    url
  };
}

/**
 * Extract all same-domain links from a page
 */
function extractLinks(html, baseUrl, currentUrl) {
  const $ = cheerio.load(html);
  const links = new Set();
  let baseDomain;
  try {
    baseDomain = new URL(baseUrl).hostname;
  } catch (e) {
    return [];
  }

  $('a[href]').each((_, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    try {
      const absolute = new URL(href, currentUrl).href;
      const parsed = new URL(absolute);
      // Only same-domain, http/https
      if (
        (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
        parsed.hostname === baseDomain
      ) {
        // Normalize — strip fragment and trailing slash
        const normalized = absolute.split('#')[0].replace(/\/$/, '') || baseUrl;
        links.add(normalized);
      }
    } catch (e) {
      // Invalid URL, skip
    }
  });

  return [...links];
}

/**
 * Main crawl function
 * @param {string} startUrl — the URL to start crawling from
 * @param {Function} onProgress — callback(pagesScanned, totalFound, currentUrl) for live progress
 * @returns {Array} array of { title, content, url } objects
 */
async function crawlWebsite(startUrl, onProgress = () => {}) {
  // Normalize start URL
  let baseUrl = startUrl;
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'https://' + baseUrl;
  }
  // Strip to origin
  try {
    const parsed = new URL(baseUrl);
    baseUrl = `${parsed.protocol}//${parsed.hostname}`;
  } catch (e) {
    throw new Error('Invalid URL: ' + startUrl);
  }

  const disallowedPaths = await fetchRobotsTxt(baseUrl);

  const visited = new Set();
  const queue = [{ url: baseUrl, depth: 0 }];
  const results = [];

  onProgress(0, 1, baseUrl);

  while (queue.length > 0 && results.length < MAX_PAGES) {
    const { url, depth } = queue.shift();

    if (visited.has(url)) continue;
    if (shouldIgnore(url, disallowedPaths)) continue;

    visited.add(url);

    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT },
        timeout: 10000,
        maxRedirects: 5
      });

      const contentType = response.headers['content-type'] || '';
      if (!contentType.includes('text/html')) continue;

      const html = response.data;
      const extracted = extractContent(html, url);

      if (extracted.content && extracted.content.length > 50) {
        results.push(extracted);
        onProgress(results.length, Math.min(visited.size + queue.length, MAX_PAGES), url);
      }

      // Crawl deeper if under depth limit
      if (depth < MAX_DEPTH) {
        const links = extractLinks(html, baseUrl, url);
        for (const link of links) {
          if (!visited.has(link) && !shouldIgnore(link, disallowedPaths)) {
            queue.push({ url: link, depth: depth + 1 });
          }
        }
      }

      // Polite delay to avoid hammering servers
      await new Promise(r => setTimeout(r, REQUEST_DELAY_MS));

    } catch (err) {
      console.warn(`[Crawler] Failed to fetch ${url}: ${err.message}`);
      // Continue to next URL
    }
  }

  return results;
}

module.exports = { crawlWebsite };
