// Public address of the live site, used for canonical links, social previews and the sitemap.
// Change this once the custom domain (e.g. https://www.gyanshu.com) is connected in Vercel,
// or set VITE_SITE_URL in the Vercel project settings.
export const SITE_URL = ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) || 'https://gyanshu-w8h1.vercel.app').replace(/\/$/, '')

// Image shown when a page is shared on LinkedIn, WhatsApp, X, etc. (1200×630).
export const OG_IMAGE = '/og-image.png'
