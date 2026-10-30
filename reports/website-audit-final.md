# Website audit: final report

Date: 2026-10-29. Companion reports:

- `website-inventory.md`: routes, components and interactive elements
- `website-audit-initial.md`: baseline findings WEB-001 to WEB-023
- `industry-research.md`: sources, claim checks and competitor insight

Nothing has been committed. All changes are in the working tree, on top of the previous session's uncommitted edits.

## Summary

- 42 routes were inspected at 1440, 800 and 375 px before and after the fixes.
- Of 23 findings: 15 are Fixed and Verified, 1 is Fixed but Not Verified, 2 are Partially Fixed, 2 are Open (proposals), 2 are Blocked on a business decision, and 1 was resolved by a business decision (WEB-014: the PDF stays public).
- Lint went from 31 errors to 0. The build passes. The JS that loads on the home page dropped from 780 kB to 511 kB (161 kB gzip); interior pages load a separate 269 kB chunk on demand.

## Test output (final)

| Check | Result |
|-------|--------|
| `npx eslint .` | 0 problems (baseline: 31 errors) |
| `npx vite build` | Succeeds. Chunks: `index` 510.55 kB (161.49 kB gzip), `InteriorPage` 269.20 kB (73.99 kB gzip), `BlogPages` 4.47 kB, CSS 96.67 kB. Vite still warns that one chunk is over 500 kB, by 10 kB. |
| Automated sweep, 42 routes × 3 widths = 126 loads (`final/results.json` in the session scratchpad) | Console errors 0, failed requests 0, broken images 0, horizontal overflow 0, images without `alt` 0, unnamed controls 0, duplicate IDs 0, heading-level skips 0 (baseline 57), broken in-page anchors 0 (baseline 17 route-level), exactly one h1 on every load, 42 unique titles (baseline 3), `noindex` on both 404 variants |
| Keyboard (Puppeteer) | First Tab focuses a visible “Skip to content” link. Enter moves focus to `#main-content`. Focusing “Products” opens its mega-menu (`aria-expanded=true`); Escape closes it (`false`). |
| Mobile menu (in-app browser) | Opens; Escape closes it and restores body scroll |
| Carousel pause (Puppeteer, 375 px) | Rotates by default. After Pause, the same story stays for 7 s, and the button becomes “Play featured stories” with `aria-pressed`. |
| Explore button (in-app browser, `/industries/telecom`) | Clicking scrolls from the top to the first section after the hero. It did nothing before. |
| Product sub-nav (`/products/argos-enms`) | `#deployment` is hidden; the visible links `#overview`, `#capabilities` and `#workflow` all resolve |
| Route SEO (client-side navigation) | SMMS keeps its own product title. `/about`, `/blog/...` and `/` reset correctly afterwards. Unknown routes get “Page not found” and `noindex`. |
| Back to top (Lenis active) | Scrolls from the bottom to `y = 0` |
| Contact form | Not submitted (it builds a `mailto:` link). The message field is now `required`. |

Screenshots are in `reports/screenshots/`:

- `baseline/`: pre-fix examples, including `privacy-375.jpg` showing the overflow
- `final/`: post-fix full pages and home hero crops
- `skip-link-focus.png`
- `carousel-pause-375.png`

## Findings and status

| ID | Finding | Status | What changed / evidence |
|----|---------|--------|-------------------------|
| WEB-001 | “Explore” and the spin badge went nowhere on 11 routes | Fixed and Verified | Both now target a `#hero-end` marker rendered after every hero (`Blocks.jsx`). Anchor check: 0 missing. Click test scrolls. |
| WEB-002 | Product sub-nav links pointed at sections that don't exist | Fixed and Verified | A layout effect hides links whose target ID is absent (`ProductExperience.jsx`), and the nav is labelled “On this page”. Anchor check: 0 visible broken links. |
| WEB-003 | Identical title and description on 40 routes; 404 indexable | Fixed and Verified | `useRouteSeo` in `App.jsx` sets the title, description and robots tag per route from `sitePages.js` and the blog data. Product SEO still overrides it; its cleanup no longer restores a stale title. Result: 42 unique titles, and `noindex` on 404s. |
| WEB-004 | h1 page text ran words together (“ContactGyanshu”) | Fixed and Verified | A space text node now follows each word span in `PosterHeadline`, and the home hero lines likewise. Flex layout is unchanged (compared screenshots at 1440 and 375). The home h1 now reads “Intelligence. Trust. Innovation.” |
| WEB-005 | No skip link; menus could not be closed with Escape | Fixed and Verified | Skip link plus a focusable `#main-content` wrapper (`App.jsx`); Escape handler (`Navbar.jsx`) |
| WEB-006 | Heading-level skips | Fixed and Verified | Footer column titles are now `h2` with the same styling; the home “Featured perspectives” section has a visually hidden `h2`. Sweep: 0 skips. |
| WEB-007 | Legal pages overflowed horizontally at 375 px | Fixed and Verified | The button label is now “Email our team”, and the address sits in the wrapping paragraph. `/terms` at 375: `scrollWidth` 375. Sweep: 0 overflow. |
| WEB-008 | Unverifiable statistics and certification-like claims on industry pages | Fixed and Verified (needs business sign-off) | 25 hero chips and key-feature tiles in `sitePages.js` and `Pages.jsx` were replaced with qualitative labels, e.g. “DoT/TRAI-Aligned Reporting”, “RBI-Aligned Controls”, “HIPAA-Aligned Controls”, “High Availability”, “Ransomware Defense”. If the business has evidence for any of the original figures, they can be restored from git. |
| WEB-009 | Training page called SMMS a school-operations platform | Fixed and Verified | The note now offers team training batches. Corporate training is listed on nytt.in. |
| WEB-010 | Garbled or inconsistent copy | Fixed and Verified | Rewritten: IoT, Network and Cybersecurity intros; Application hero title (“Smarter Software Through Agile Development”); Regulatory overclaim. Footer now reads “© {current year} Gyanshu Technologies”. |
| WEB-011 | Non-clickable “View Details” tags | Fixed and Verified | FLOWBITS NEXORA and Nested VA cards on the Regulatory page now link to their product pages. HMS and LMS cards show descriptive tags, because no pages exist for them. |
| WEB-012 | Social icons linked to platform home pages | Fixed and Verified | The icons render only when a real profile URL is filled in (`Footer.jsx`), so none currently show. **Action:** add the company's LinkedIn, Instagram and Facebook URLs. |
| WEB-013 | Three phone numbers, two unverified | Blocked: business decision | Unchanged. +91 99388 83028 (Cybersecurity, Network, Application) and +91 90909 09301 (NetSight360) need confirmation. Only +91 90409 61361 is corroborated, by nytt.in. |
| WEB-014 | Confidential capability PDF is publicly downloadable | Resolved: business decision | The user confirmed on 2026-10-29 that the PDF may stay public. It remains at `/Technology_Product_Capability.pdf`, and `robots.txt` no longer disallows it. Consider removing the “Confidential” label from the PDF itself so it does not mislead readers. |
| WEB-015 | Legal pages are one-sentence placeholders | Blocked: business decision | Needs real privacy, terms and cookie text from the company or its counsel. Not invented. |
| WEB-016 | Single 780 kB bundle | Partially Fixed | `React.lazy` splits interior and blog routes; initial JS is 511 kB (161 kB gzip, down from 234). The remaining weight is framer-motion, Lenis and the home page. Further splitting (lazy home sections, a lighter motion import) is possible, but would change load behaviour around the splash screen. |
| WEB-017 | 31 lint errors | Fixed and Verified | `eslint.config.js` now understands JSX use of `motion` and capitalised components, and gives the Tailwind config Node globals. Removed the real unused variables in `MarqueeText.jsx` and `TechStack.jsx`. Result: 0 problems. |
| WEB-018 | Contact message optional | Fixed but Not Verified (by design) | `required` added. Submission was not exercised, because it opens a mail client. |
| WEB-019 | No robots.txt or Open Graph tags; no sitemap or canonical | Partially Fixed | `robots.txt` and default OG and Twitter tags in `index.html` are present in `dist/`. The sitemap and canonical URLs are Blocked on the production domain. |
| WEB-020 | Auto-rotating carousel had no pause control | Fixed and Verified | Pause/Play button (`aria-pressed`) visible at all widths; previous/next buttons still appear from 768 px up (`Perspectives.jsx`). |
| WEB-021 | Mega-menu keyboard order | Open | The panel's links follow the whole bar in DOM order. Listing pages are reachable and Escape now works. Restructuring the menu into a disclosure pattern is a larger nav change, left as a proposal. |
| WEB-022 | Every photo hot-linked from Unsplash | Open | The baseline saw timeouts on two routes; the final sweep saw none. Proposal: self-host hero and above-the-fold images. |
| WEB-023 | Low-contrast footer text | Fixed and Verified | Group titles raised to `white/50` (~5.3:1) and the copyright line to `white/55`. Checked in screenshots; ratios computed by hand, not with a contrast tool. |

### Additional items noted, not changed

- The service pages describe Nested VA as an “automated platform to simulate attacks”. The capability PDF describes scanning, audit checklists and evidence, not attack simulation. Worth reviewing.
- The telecom page still mentions “Rust-Based IPDR Collection” and “ClickHouse-Scale Storage… petabyte-scale”. The technology is mentioned on nytt.in, but no scale is given.
- The legal name: the logo artwork reads “Gyanshu Technologies Pvt. Ltd.”, but the site text says “Gyanshu Technologies”. Confirm the registered name for the footer and legal pages.
- About 20 legacy components are unused, plus two empty files (list in `website-inventory.md`). They are tree-shaken, so they don't affect users. Removing them is an optional cleanup.
- The site mixes UK and US spelling (“prioritisation” on product pages, “defense” on industry pages).

## Changed files

| File | Change |
|------|--------|
| `src/App.jsx` | Per-route SEO (title, description, robots); skip link and `#main-content`; lazy-loaded interior and blog routes with `Suspense` |
| `src/components/interior/Blocks.jsx` | `#hero-end` marker; Explore and spin badge retargeted; word spacing in `PosterHeadline` |
| `src/components/interior/Pages.jsx` | Industry claims, copy fixes, “View Details” cards, Training note, required message field, legal-page email button |
| `src/components/sections/ProductExperience.jsx` | Sub-nav hides missing targets and gets `aria-label`; SEO cleanup no longer restores a stale title |
| `src/components/layout/Navbar.jsx` | Escape closes the mega-menu and mobile menu |
| `src/components/layout/Footer.jsx` | Social icons hidden until URLs exist; column titles `h2`; contrast; company name and current year |
| `src/components/home/Perspectives.jsx` | Visually hidden section `h2`; carousel Pause/Play |
| `src/components/home/Hero.jsx` | Word spacing in the h1 text |
| `src/data/sitePages.js` | Industry hero chips without unverifiable figures |
| `src/components/ui/MarqueeText.jsx`, `src/components/sections/TechStack.jsx` | Unused variables removed (both files are unused legacy components) |
| `eslint.config.js` | JSX-aware unused-vars options; Node globals for `tailwind.config.js` |
| `index.html` | Open Graph and Twitter defaults |
| `public/robots.txt` | New (allows all crawling) |
| `reports/*` | New: four reports and screenshots |

To undo everything from this pass, use git diff or revert on these files. The previous session's uncommitted changes in `Blocks.jsx`, `Pages.jsx`, `Navbar.jsx`, `ProductExperience.jsx` and `index.css` are interleaved in the same files, so revert selectively.

## Limitations and untested areas

- Testing used the Vite dev server (port 5175), not `vite preview` of `dist/`. Lazy chunks load through the same dynamic-import path, but the production build was only built, not browsed.
- Browsers covered: headless Chrome (Puppeteer 24) and the desktop app's Chromium pane. No Firefox, Safari or real mobile devices. Mobile was emulated by viewport size; the sweep did not emulate touch.
- No screen-reader session (NVDA or VoiceOver). Accessibility checks were structural: names, headings, focus order and `aria-*` attributes.
- No Lighthouse or Core Web Vitals measurement. Bundle sizes are the only performance evidence.
- Hover-only effects (flip cards, image zooms) and the pinned scroll steppers were not re-tested beyond the full-page sweep, which scrolls through them. This pass did not modify them.
- The in-app browser pane renders frames only while visible. Some checks there relied on DOM measurements rather than screenshots.
- The research could not find any third-party record of Gyanshu Technologies (registry, press or directories).

## Next steps (in priority order)

1. Confirm the two unverified phone numbers (WEB-013).
2. Supply legal page text (WEB-015), social profile URLs (WEB-012) and the production domain, which enables a sitemap and canonical URLs (WEB-019).
3. Confirm or replace the reworded industry claims (WEB-008), and review the Nested VA “simulate attacks” wording.
4. Optional engineering: mega-menu disclosure pattern (WEB-021), self-hosted key images (WEB-022), further bundle splitting (WEB-016), removal of dead legacy components.
