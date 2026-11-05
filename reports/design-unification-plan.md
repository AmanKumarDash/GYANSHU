# Design unification: every page matches the home page

The home page is the reference. It must not change visually. Read `src/components/sections/ExperienceHome.jsx` and `src/components/home/*` before editing anything.

## What is different today

| | Home page (target) | Interior pages (today) |
|---|---|---|
| Hero | Left-aligned text, globe artwork bleeding off the right, then a dark full-width panel with slide copy, chips and progress bars | Centred text with an image pill inside the headline and a spin badge |
| Headline accent | Key words in bright `text-brand-500` (`text-brand-300` on dark) | Key words greyed out with low opacity |
| Graphics | Glowing navy and cyan technology artwork | Unrelated stock photos, hotlinked from Unsplash and Pexels |
| Sections | Large rounded dark containers holding white cards with pointer spotlight | Mostly flat light sections |
| Process | Pinned, dark, on-theme | Steps floating over washed-out photos |

## Already built: do not rewrite these

Media and animation are finished. Use them; do not repaint or replace them.

- `src/data/artManifest.js`: `art(key, kind)` returns the image path. `artManifest` lists the keys. Kinds are `hero`, `flow`, `hub`, `card`.
- `public/images/art/<key>-<kind>.webp`: 144 generated images, 36 topics by 4 kinds.
- `src/components/art/HeroArt.jsx`: `<HeroArt name="network" className="w-full" />`. Light artwork with a live globe, moving light and a floating topic icon. Same composition as the home hero. Height follows the 1672:941 artwork.
- `src/components/art/SceneArt.jsx`: `<SceneArt name="network" kind="flow|hub|card" live={true} position="center" />`. Fills a `relative`, sized parent. Light runs along the painted lines. Pass `live={false}` for small repeated thumbnails such as grids and menus.
- `src/components/art/SignalField.jsx`: `<SignalField seed={3} />`. Living network backdrop for dark containers. Fills a `relative` parent; content above it needs `relative`.
- All of these pause off screen and honour reduced motion. To regenerate art: `CHROME_PATH=/tmp/chromium node scripts/generate-art.mjs [keys|all] [kinds]`.

Topic keys by route:

| Route | Key | Route | Key |
|---|---|---|---|
| /products | products | /about | about |
| /solutions | solutions | /why-choose-us | whychoose |
| /industries | industries | /mission | mission |
| /services/cybersecurity | cybersecurity | /core-values | values |
| /services/network | network | /careers | careers |
| /services/iot | iot | /training | training |
| /services/application | application | /our-work | work |
| /services/regulatory | regulatory | /contact | contact |
| /industries/government | government | /support | support |
| /industries/telecom | telecom | /help | help |
| /industries/finance | finance | /blog, /blog/* | blog |
| /industries/enterprise | enterprise | /privacy, /terms, /compliance, /cookies | legal |
| /industries/datacenter | datacenter | 404 | notfound |
| /industries/healthcare | healthcare | /products/flowbits-nexora | nexora |
| /industries/education | education | /products/netsight360 | netsight |
| /industries/manufacturing | manufacturing | /products/panoptix | panoptix |
| /industries/startup | startup | /products/nested-va | nestedva |
| | | /products/smms | smms |
| | | /products/ai-office-assistant | aiassistant |

## Design rules for every page

1. **Headlines.** `h-section` (or `hero-heading` for the page title). Accent words use `text-brand-500`, or `text-brand-300` on dark. Never grey out or lower the opacity of headline words. Remove image pills from headlines.
2. **Dark containers**, as in `home/EmergingTech.jsx`: outer `px-3 sm:px-5`, inner `grain relative isolate mx-auto max-w-[100rem] overflow-hidden rounded-[2.5rem] bg-ink-950 py-9 text-white md:py-11 lg:py-12`, a blurred `bg-brand-500/15` glow, and `dot-grid` or `<SignalField />` behind content.
3. **Cards**, as in `EmergingTech`: white, `rounded-[1.375rem]`, `shadow-card`, icon chip `bg-brand-50 text-brand-600` that turns `bg-brand-400` and rotates on hover, a pointer spotlight (`--mx`/`--my`), and a gradient bar that sweeps in on hover. Inside a card or a dark band, alternate these with the plain cards of `home/WhyGyanshu.jsx`. Do not use one treatment for everything.
4. **Spacing.** Sections use `py-8 md:py-10 lg:py-12`, matching the home page. Headings are centred unless the home pattern being copied is left-aligned.
5. **Motion.** Use `Reveal`, `MaskLines` and `ScrollWords` from `ui/Motion`. Do not add new animation libraries.
6. **Rhythm.** A page should alternate light and dark as the home page does. Avoid three dark bands in a row and avoid long flat light runs.
7. **No stock photos on interior pages.** Replace them with generated art. Keep real product interface screens (`/images/products/*.svg`) and the existing product art (`/images/smms/*`, `/images/ai-office-assistant/*`). Keep technology logos.
8. **Preserve everything else.** Do not change copy, page order, routes, links, anchors, forms, SEO, `alt` meaning, keyboard behaviour or accessibility. Do not change anything under `src/components/home/`.
9. **Responsive.** Check at 1440 and 375 wide. No horizontal overflow. Long titles must fit.

## Work packages

### A. Foundation (runs first, alone)

Files: `src/components/interior/Blocks.jsx`, `src/data/pageMedia.js`, `src/components/layout/Navbar.jsx`, `src/index.css` if needed, and `src/data/artManifest.js` only to add a route helper.

- Add `artKeyFor(pathname)` to `artManifest.js` using the table above.
- Rebuild `HeroCentered` as the home hero, **keeping its props so callers need no changes**: left text column, `HeroArt` right (`lg:absolute lg:bottom-0 lg:right-0 lg:w-[70%]`, stacked below text on small screens, as in `home/Hero.jsx`), gradient rule, then the dark rounded panel with slides, chips, numbered progress bars and the same scroll-in scale. Art key comes from an optional `art` prop, else `artKeyFor(pathname)`. `compact` means the top part only, with no dark panel. Remove the pill and `SpinBadge`; keep the `#hero-end` anchor.
- `PosterHeadline`: `muted` words become the accent colour. No pills. Do not rename the prop.
- `pageMedia.js`: replace every Unsplash and Pexels id with generated art paths, keeping the data shape. Hero sets use the topic's `flow` and `hub`; cards use `-card`; single section images use `-hub`.
- `Slideshow`: render `SceneArt` when given an `/images/art/` path, and a normal image otherwise, so product screens still work.
- **Home must not change.** `home/Industries.jsx` imports `industryImages` from `pageMedia`. Move the existing photo ids into a new `homeIndustryImages` export and point only that import at it. That one-line import is the only permitted edit under `home/`.
- Navbar mega-menu images become `SceneArt` `card` art (`products`, `solutions`, `industries`, `live={false}`).
- Restyle the shared blocks to the rules: `Statement` (`ScrollWords` with accents), `KeyFeatures`, `FeatureCards`, `Bento` (`-card` art), `StepsBanner` (dark container with `SceneArt` backdrop, in the manner of `home/Process.jsx`; keep its scroll logic), `Orbit`, `CaseGrid`, `Openings`, `TrainingPanel`, `TechMarquee`, `Quotes` (as `home/Testimonials.jsx`), `FaqDark`, `StatsBand`, `NeedsSplit`, `CtaPhotos` (dark container with `SignalField`, as the "Your Challenges" band in `ProductCatalog`; no photos).

### B. Products

File: `src/components/sections/ProductExperience.jsx` only. Catalog and all six product detail pages: replace stock ids in `profiles` and `heroScenes` with art, keeping interface screens first in hero slides. Pass `art` to `HeroCentered` where needed. Bring the page sections to the rules.

### C. Services and industries

File: `src/components/interior/Pages.jsx`, only from `ServicesListing` through the end of `IndustryDetail`. Includes the bespoke sections inside `ServiceDetail`, `CybersecurityServiceContent` and `IndustryDetail`.

### D. Company, support, legal, blog

Files: `src/components/interior/Pages.jsx`, from `companyConfig` to the end of the file, and `src/components/sections/BlogPages.jsx`. Blog and legal pages get the new hero (`compact`) and on-theme cards. The contact form and its behaviour stay.

### Facts from package A, for B, C and D

- `HeroCentered` is done; callers need no changes. It ignores `eyebrow`, `pill` and `pillAfter`, which may be left in place. `images` become the dark panel's slides. With none, the topic's art plays. `art="<key>"` overrides the topic, `media` replaces the slides.
- For building cards, `Blocks.jsx` exports `Media` (fills a sized `relative` parent; art paths become `SceneArt`) and `CardFx`, and `DarkBand` (home-style dark container; content needs `relative`). `spot` and `parseArt` are in `src/components/interior/cardFx.js`. `FeatureCards` takes `dark` to sit inside a `DarkBand`.
- `StepsBanner`, `FaqDark`, `StatsBand` and `TrainingPanel` are dark. `CtaPhotos` is light by default (`tone="dark"` available). Rule 6 still applies: where bespoke page sections create dark runs, restyle the bespoke sections, not the page order.
- A pinned `StepsBanner` shows as a tall blank gap in full-page screenshots. This is expected. To inspect what follows, scroll with a viewport screenshot rather than treating the gap as a bug.

## Shared checkout rules

- Packages B, C and D run at the same time in one working tree. Edit only your files and your region of `Pages.jsx`. Use exact-string `Edit` calls, re-reading before editing. Never run `git checkout`, `stash`, `reset` or `commit`.
- A dev server is running on port 5173. Do not start another. After adding Tailwind classes in a new file, `touch src/index.css` if styles look missing.
- If a shared block in `Blocks.jsx` needs a change during B, C or D, make the smallest additive change (a new optional prop) and do not alter default behaviour.

## Checking your work

Screenshot script: `CH=/tmp/chromium node /tmp/gy/shot.mjs /about,/help /tmp/gy/shots 1440` writes full-page JPEGs to the given folder. Use width 375 for mobile. It prints page errors. Read the images and compare with `home-1440.jpg` in that folder. Then run `npx eslint <your files>`.

A package is done when each of its routes has no page errors, matches the rules at both widths, and has no remaining `photo-` or `px-` ids in its files (except the permitted home export).
