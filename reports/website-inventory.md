# Gyanshu Technologies website — inventory

Audit date: 2026-10-29. Stack: Vite 8, React 19, React Router 7, Tailwind 3, framer-motion 12, Lenis 1.3, lucide-react. Dev server `npm run dev` (this audit ran it on port 5175 because 5173 was taken by another session).

## Routing

`src/App.jsx` defines four routes: `/` (home), `/blog`, `/blog/:slug`, and a catch-all `*` that renders `InteriorPage`. `InteriorPage` (`src/components/sections/InteriorPage.jsx`) resolves the path through `getPage()` in `src/data/sitePages.js` and picks a page component. Unknown paths get the in-app 404 page.

| # | Route | Page component | Source of copy |
|---|-------|----------------|----------------|
| 1 | `/` | `ExperienceHome` → Hero, Perspectives, Platforms, Capabilities, Industries, Process, UseCases, ClosingCTA | `src/components/home/*` |
| 2 | `/blog` | `BlogIndex` | `src/data/blogPosts.js` |
| 3 | `/blog/welcome-to-gyanshu-updates` | `BlogArticle` | `blogPosts.js` |
| 4 | `/blog/<unknown>` | `BlogArticle` “Post not found” | — |
| 5 | `/products` | `ProductCatalog` (search, category filter) | `ProductExperience.jsx` profiles |
| 6–11 | `/products/ipdr` (FLOWBITS NEXORA), `/products/argos-enms` (NetSight360), `/products/panoptix`, `/products/vapt` (Nested VA), `/products/smms`, `/products/gyanshu-ai-office-assistance` | `ProductDetail` | `ProductExperience.jsx`, `flowbitsProfile.js`, `sitePages.js` |
| 12 | `/solutions` | `ServicesListing` | `Pages.jsx`, `content.js` |
| 13 | `/services/cybersecurity` | `CybersecurityServiceContent` | `Pages.jsx` |
| 14–17 | `/services/network`, `/services/iot`, `/services/application`, `/services/regulatory` | `ServiceDetail` | `Pages.jsx` |
| 18 | `/industries` | `IndustriesListing` (Orbit arc, paginated CaseGrid) | `Pages.jsx` |
| 19–27 | `/industries/{government, telecom, finance, enterprise, datacenter, healthcare, education, manufacturing, startup}` | `IndustryDetail` (one bespoke layout per industry) | `Pages.jsx`, `sitePages.js` |
| 28–34 | `/about`, `/our-work`, `/training`, `/careers`, `/why-choose-us`, `/mission`, `/core-values` | `CompanyPage` (config-driven sections) | `Pages.jsx` |
| 35–36 | `/contact`, `/support` | `ContactPage` (mailto form) | `Pages.jsx` |
| 37 | `/help` | `HelpPage` (12 FAQs) | `content.js` |
| 38–41 | `/privacy`, `/terms`, `/compliance`, `/cookies` | `LegalPage` | `sitePages.js` |
| 42 | any other path | `NotFound` | `sitePages.js` |

## Shared layout

- **Navbar** (`src/components/layout/Navbar.jsx`): fixed pill bar; hides on scroll down past 480 px. At ≥1280 px (`xl`): three mega-menus (Products, Services, Industries) with a hover bridge and 150 ms close delay, plus About / Our Work / Training / Blog / Careers and a “Get Started” CTA. Below `xl`: full-screen mobile menu.
- **Footer** (`src/components/layout/Footer.jsx`): email, phone, location, three link groups, legal links, back-to-top button.
- **Splash screen** (2.4 s on every full page load), scroll progress bar, Lenis smooth scrolling (disabled for reduced motion).

## Shared blocks (`src/components/interior/Blocks.jsx`)

PosterHeadline, HeroCentered (poster h1 + image slideshow + chips + spin badge), Slideshow, Statement (scroll-lit words), KeyFeatures, FeatureCards, Bento, StepsBanner (pinned stepper), Orbit (industries arc), CaseGrid (paginated), Openings (job cards), TrainingPanel, TechMarquee, Quotes, FaqDark (accordion), StatsBand (counters), NeedsSplit, CtaPhotos (photo marquee CTA).

## Interactive elements

| Element | Where | Behaviour |
|---------|-------|-----------|
| Mega-menus | Navbar, ≥1280 px | Hover/focus to open; Escape closes (added in this pass) |
| Mobile menu | Navbar, <1280 px | Toggle button with `aria-expanded`; locks body scroll; Escape closes (added) |
| Hero slideshow dots | Every interior hero with media | Buttons with `aria-label`, `aria-current` |
| “Explore” button and spin badge | Interior heroes | Scroll to the section after the hero |
| Product sub-nav | Product detail pages | Sticky in-page links |
| Product search + category chips | `/products` | Client-side filter |
| CaseGrid pagination | `/industries`, `/our-work`, service pages | Previous / page numbers / Next |
| FAQ accordion | FaqDark on many pages | Buttons with `aria-expanded` |
| Capability flip cards | Product pages | Focusable (`tabIndex=0`), reveal on hover/focus |
| Contact form | `/contact`, `/support` | Builds a `mailto:` link; nothing is sent by the site |
| Home contact modal | ClosingCTA | Dialog with mailto link |
| Back to top | Footer | `window.scrollTo` smooth |

## Data and assets

- `src/data/sitePages.js` — page titles/intros, product/service/industry registries, nav links.
- `src/data/pageMedia.js` — Unsplash photo IDs per page (`pageImages`, `serviceImages`, `industryImages`, `productImages`).
- `src/data/content.js` — capability list, case studies, practice “voices”, 12 FAQs.
- `src/data/flowbitsProfile.js` — FLOWBITS NEXORA product copy.
- `public/images/tech/` — Devicon SVG logos; `public/images/smms/`, `public/images/ai-office-assistant/` — local WebP product art.
- `public/Technology_Product_Capability.pdf` — 9-page capability deck marked “Confidential” on every page; not linked from the site but publicly downloadable (see WEB-014).

## Unused code

These components are not imported by any route and are not shipped (tree-shaken): `src/components/sections/{Hero, CTASection, CaseStudies, FAQSection, ProcessTimeline, ServicesGrid, StorySection, TestimonialsCarousel, StatsSection, TeamSection, PricingSection, LogoCloud, BlogPreview, TechStack}.jsx`, and `src/components/ui/{CustomCursor, MagneticButton, MarqueeText, ScrollReveal, VisualBanner}.jsx`. `NoiseBg.jsx` and `ParallaxImage.jsx` are empty files. They were left in place.
