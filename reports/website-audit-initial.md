# Website audit: initial findings (baseline)

Date: 2026-10-29. Scope: all 42 routes in `reports/website-inventory.md`, at 1440, 800 and 375 px.

## Method

- **Build:** `npx vite build` passed, with one chunk-size warning (single JS bundle of 780.32 kB, 233.74 kB gzip).
- **Lint:** `npx eslint .` reported 31 errors. Twenty-six were false positives: core `no-unused-vars` cannot see JSX use of `motion`, or of capitalised destructured parameters such as `Icon`. One was a config-environment error (`module` in `tailwind.config.js`). Four were real unused variables:
  - `clsx` and `speed` in `MarqueeText.jsx`
  - `i` in `TechStack.jsx`
- **Automated sweep:** a Puppeteer script ran headless Chrome against the dev server. For each route and width it waited out the splash, scrolled the full page to trigger in-view content, and then recorded:
  - console errors and failed requests
  - horizontal overflow, with the offending elements
  - the h1 and the heading-level sequence
  - images missing `alt`, and broken images
  - unnamed controls and duplicate IDs
  - title, meta description and canonical
  - every link
  - a full-page screenshot

  That made 126 page loads. A second script checked every in-page `#hash` link against the IDs present, and collected `tel:` links.
- **Manual checks:** the in-app browser was used for the mega-menu, mobile menu, Escape, Explore buttons, product sub-nav, back-to-top and the contact form. The form builds a `mailto:` link; it was not submitted.
- **Primary-source review:** `public/Technology_Product_Capability.pdf` and nytt.in (see `industry-research.md`).

Caveat: the sweep reached about route 20 of 42 before code fixes started. Because the dev server hot-reloads, routes captured later reflect some fixes; this matters mainly for page titles. Findings below are only those confirmed from code or from pre-fix runs.

## Clean baseline results

On all 126 loads:

- exactly one visible `h1`
- no `<img>` without an `alt` attribute (decorative images use `alt=""`)
- no unnamed buttons, links or inputs
- no duplicate IDs
- no JavaScript errors (`pageerror`)

The only failed requests were Unsplash image timeouts on `/solutions` and `/services/cybersecurity`. They came from network instability during the run: the same URLs loaded in an isolated re-run (`probe`) minutes later.

## Findings

Severity scale: **Critical** (blocks a core task), **High**, **Medium**, **Low**.

| ID | Severity | Area | Evidence | Expected | Actual | Proposed fix |
|----|----------|------|----------|----------|--------|--------------|
| WEB-001 | High | Functional | Anchor check: the hero “Explore” button and the “Scroll to explore” spin badge link to `#details`. On 11 routes no such ID exists: `/products`, `/services/cybersecurity`, and all 9 `/industries/*` detail pages. | Clicking Explore scrolls to the content | Nothing happens | Point both at a marker rendered right after every hero (`#hero-end`) |
| WEB-002 | Medium | Functional | Product sub-nav links point at sections that are not rendered: `/products/ipdr` → `#highlights`, `/products/argos-enms` → `#deployment`, `/products/vapt` → `#people` | Every sub-nav link scrolls somewhere | Dead links | Hide sub-nav links whose target section is absent |
| WEB-003 | Medium | SEO | 40 of 42 routes share the title “Gyanshu Technologies \| Secure Digital Operations” and the same meta description. Only SMMS and AI Office Assistant set their own. No canonical. The 404 page is indexable. | A unique title and description per route; 404 marked `noindex` | Identical metadata | Set title, description and robots per route from `sitePages.js` data |
| WEB-004 | Medium | Accessibility / SEO | The poster h1 `textContent` joins words with no spaces, e.g. `ContactGyanshu`, `TechnologySolutions`. Each word is its own span and there is no whitespace between them. `aria-label` covers screen readers, but crawlers, reader modes and copy-paste get the joined text. | Words separated in page text | Joined | Emit a space text node between word spans; flex layout ignores it |
| WEB-005 | Medium | Accessibility | No skip link. The mobile menu and mega-menus cannot be closed with Escape. | Keyboard users can skip the nav and dismiss menus | Not possible | Add a “Skip to content” link and Escape handling |
| WEB-006 | Medium | Accessibility | Heading-level skips on 57 of 126 loads: footer column titles are `h4` directly after page `h2`s, and the home “Featured perspectives” story titles are `h3` with no `h2` above them. | Sequential heading levels | `h2→h4`, `h1→h3` | Footer titles become `h2`; add a visually hidden `h2` to the home section |
| WEB-007 | Medium | Responsive | At 375 px, `/privacy`, `/terms` and `/compliance` scroll horizontally: the document is 396 px wide for a 375 px viewport. The non-wrapping “Email Support.gyanshu@gmail.com” button widens the single grid column, so the legal side-nav overflows. | No horizontal scroll | 21 px overflow | Shorten the button label and let the address wrap in the paragraph |
| WEB-008 | High | Content / trust | Industry pages show headline statistics with no source in the company's capability deck or anywhere else: “90% Faster Investigations”, “Billion+ Sessions/Day”, “100% TRAI Compliant”, “<5 ms”, “70% Fraud Reduction”, “99.99% Uptime”, “Zero Breaches”, “100% Isolation”, “Zero Ransomware”, “100% HIPAA Ready”, “100% Production Uptime”, “Zero Disruption”. “RBI Compliant”, “LEA Compliant” and “100% Compliance” read as certifications. | Only claims the business can substantiate | Unverifiable absolutes, a legal and reputational risk | Replace with qualitative capability labels (“RBI-aligned controls”, “Ransomware defence”) and flag for the business |
| WEB-009 | Medium | Content | Training page StepsBanner note: “Looking for a school operations platform? Explore SMMS…”. SMMS is the Smart Monitoring & Management System (infrastructure), per its product page and the capability PDF. | Accurate cross-reference | Wrong product description | Replace the note |
| WEB-010 | Low | Content | Copy errors: the IoT and Network intros say “provides truly network services”; the Application hero reads “Empowering Businesses: Through Agile Development Smarter Solutions for Digital World”; the Cybersecurity intro begins “Preparing for your success,”; Regulatory claims to help “meet all regulatory requirements”; the footer says “© 2026 Gyanshu Technology” while the rest of the site says “Technologies”. | Clear, consistent copy | Garbled or inconsistent | Rewrite those lines |
| WEB-011 | Medium | Functional | “View Details” is rendered as a non-clickable tag on four cards: GYANSHU HMS, GYANSHU LMS (Application page), FLOWBITS NEXORA and Nested VA (Regulatory page). | A call to action either works or is not shown | Looks clickable, does nothing | Link the two product cards to their pages; use descriptive tags for HMS/LMS, which have no pages |
| WEB-012 | Medium | Content / trust | Footer social icons link to `https://linkedin.com`, `https://instagram.com` and `https://facebook.com` (platform home pages, not company profiles). | Links to real profiles, or no icons | Misleading | Hide the icons until real URLs are supplied |
| WEB-013 | Medium | Content / trust | Three different phone numbers: +91 90409 61361 (footer, contact; matches nytt.in), +91 99388 83028 (Cybersecurity and Network “Emergency Support”, Application CTA), and +91 90909 09301 (NetSight360 page). | One verified number, or clearly labelled numbers | Unverified extra numbers | **Business decision**: confirm which numbers are live |
| WEB-014 | High | Data exposure | `public/Technology_Product_Capability.pdf` is marked “Confidential” on every page but is copied to `dist/` and is publicly downloadable at `/Technology_Product_Capability.pdf`. It is not linked from the site. | Confidential documents not deployed | Publicly reachable | **Business decision**: remove it from `public/`, or confirm it may be public. Meanwhile, disallow it in `robots.txt`. |
| WEB-015 | Medium | Content / legal | `/privacy`, `/terms`, `/compliance` and `/cookies` each contain a single sentence. There is no real privacy, cookie or terms text. | Proper policy text | Placeholder | **Business/legal decision**: needs text from the company. Not something to invent. |
| WEB-016 | Medium | Performance | One 780 kB JS bundle (234 kB gzip) loads on every route, including the home page. | Route-level splitting | Single chunk | Lazy-load interior and blog routes |
| WEB-017 | Low | Code quality | 31 lint errors (see Method) | Lint passes | Fails | Teach the rule about JSX use; fix the 4 real unused variables; give `tailwind.config.js` Node globals |
| WEB-018 | Low | Forms | The contact form allows an empty message (no `required`). Sending is via `mailto:`, so nothing is lost, but an empty email can be composed. | Message required | Optional | Add `required` to the message field |
| WEB-019 | Low | SEO | No `robots.txt`, no Open Graph tags, no sitemap. The production domain is unknown, so a sitemap with absolute URLs and canonical tags cannot be generated. | Basic crawl and share metadata | Missing | Add `robots.txt` and default OG tags. Sitemap and canonical are blocked on the domain. |
| WEB-020 | Low | Accessibility | The home “Featured perspectives” carousel auto-advances. It pauses only on mouse hover, and its previous/next buttons are hidden below 768 px. | A pause control for auto-moving content (WCAG 2.2.2) | Hover only | Add a visible pause/play button (design change; proposed) |
| WEB-021 | Low | Accessibility | Mega-menu links come after the nav bar in DOM order. A keyboard user who focuses “Products” opens the panel but reaches its links only after tabbing past the rest of the bar, and focus on the next item switches panels. The listing pages remain reachable. | Panel links reachable straight after their trigger | Awkward | Move the panel next to its trigger, or make triggers buttons with arrow-key handling (proposed) |
| WEB-022 | Low | Robustness | All photography is hot-linked from images.unsplash.com: about 330 IDs, no fallback, no local copies. The baseline run saw timeouts on two routes. | Resilient images | Third-party dependency | Self-host the hero and above-the-fold images, or add a neutral fallback background (already `bg-ink`) (proposed) |
| WEB-023 | Low | Footer contrast | Footer group titles use `text-white/35` and the copyright line `text-white/40` on `#070d0f`, roughly 3.3:1 and 3.9:1 contrast. Small text needs 4.5:1. | ≥ 4.5:1 | Below | Raise to `/50` and `/55` |

## Per-route baseline status

“Pass” means no route-specific issue beyond the sitewide items WEB-003 (metadata), WEB-004 (h1 text) and WEB-006 (footer `h4`).

| Route | 1440 | 800 | 375 | Route-specific issues |
|-------|------|-----|-----|------------------------|
| `/` | Inspected | Inspected | Inspected | WEB-006 (h1→h3), WEB-020 |
| `/blog`, `/blog/welcome-to-gyanshu-updates`, `/blog/does-not-exist` | Inspected | Inspected | Inspected | Pass |
| `/products` | Inspected | Inspected | Inspected | WEB-001 |
| `/products/ipdr` | Inspected | Inspected | Inspected | WEB-002, WEB-008 (telecom claims echo) |
| `/products/argos-enms` | Inspected | Inspected | Inspected | WEB-002, WEB-013 |
| `/products/panoptix`, `/products/smms`, `/products/gyanshu-ai-office-assistance` | Inspected | Inspected | Inspected | Pass |
| `/products/vapt` | Inspected | Inspected | Inspected | WEB-002 |
| `/solutions` | Inspected | Inspected | Inspected | Image timeouts in this run only |
| `/services/cybersecurity` | Inspected | Inspected | Inspected | WEB-001, WEB-010, WEB-013 |
| `/services/network` | Inspected | Inspected | Inspected | WEB-010, WEB-013 |
| `/services/iot` | Inspected | Inspected | Inspected | WEB-010 |
| `/services/application` | Inspected | Inspected | Inspected | WEB-010, WEB-011, WEB-013 |
| `/services/regulatory` | Inspected | Inspected | Inspected | WEB-010, WEB-011 |
| `/industries` | Inspected | Inspected | Inspected | Pass |
| `/industries/*` (9 routes) | Inspected | Inspected | Inspected | WEB-001, WEB-008 |
| `/about`, `/our-work`, `/why-choose-us`, `/mission`, `/core-values`, `/careers` | Inspected | Inspected | Inspected | Pass |
| `/training` | Inspected | Inspected | Inspected | WEB-009 |
| `/contact`, `/support` | Inspected | Inspected | Inspected | WEB-018 |
| `/help` | Inspected | Inspected | Inspected | Pass |
| `/privacy`, `/terms`, `/compliance` | Inspected | Inspected | Inspected | WEB-007 (375 px), WEB-015 |
| `/cookies` | Inspected | Inspected | Inspected | WEB-015 |
| 404 | Inspected | Inspected | Inspected | WEB-003 (indexable) |
