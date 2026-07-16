"use client";

if (typeof window !== "undefined") {
  // Prevent double-patching
  if (!(window as any).__fetchPatched) {
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
      let [resource, config] = args;
      if (typeof resource === 'string' && resource.includes('/api/')) {
        const token = localStorage.getItem('token');
        if (token) {
          config = config || {};
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          };
        }
      }
      return originalFetch(resource, config);
    };
    (window as any).__fetchPatched = true;
    console.log("✅ Global API Interceptor attached");
  }
}
