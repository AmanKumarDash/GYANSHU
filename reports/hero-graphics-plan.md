# Unique landing graphics for every interior page

## The problem

Every interior hero is one composition. `hero()` in `scripts/art-painter.js` draws the same sky, skyline, water, globe, rings, road and tile arc for every topic. The live layer in `HeroArt.jsx` adds the same turning globe, comets and sheen. Only a seed, six tile icons and one floating icon change.

The dark panel below has the same fault: `flow` and `hub` are one layout each, with different icons. `/privacy`, `/terms`, `/compliance` and `/cookies` also share one key, as do `/blog` and its post.

## The goal

A visitor who sees only the landing graphic, with the title hidden, can tell which page they are on. Each page gets its own subject, taken from that page's copy.

## Rules for every scene

1. **One dominant subject**, from the concept table below. It should fill most of the free area and be recognisable as a silhouette at 400px wide.
2. **Different silhouette from every other scene.** Vary the shape, the placement of mass, the viewpoint and the number of objects. Do not build scenes by swapping objects on a shared layout.
3. **No shared set dressing.** No globe, skyline, water, road, ring set or tile arc as the backdrop. Interior scenes may share only the palette, lighting, line quality and paper-light ground.
4. **Same family as the home page.** Before painting, view `public/images/home/*.webp` and match the navy, cyan and brand-blue palette, glow and finish. The left side must stay light and quiet, because the title can overlap the left 30%.
5. **No words, numbers or logos in the artwork.** No regulator, standard, vendor or client marks, and no invented statistics or dashboards presented as real product UI. Use abstract glyphs and bars.
6. **Depict only what the copy states.** Parts of the product copy are marked unverified (for example automated scoring and language support). Do not depict those.
7. **Do not change** copy, routes, page order, SEO, forms, anything in `src/components/home/`, the home page's appearance, or the `/images/products/*.svg` interface screens.

## Deliverables per key

| Kind | Size | Use | Notes |
|---|---|---|---|
| `hero` | 1672×941 | Light landing art | Same box as today, so hero layout does not move |
| `panel` | 2000×1125 | First dark panel slide | The same subject, dark theme, full view |
| `detail` | 2000×1125 | Second dark panel slide | Dark theme, a close view of the scene's focal part. It must read as a different picture from `panel` |

Size targets: `hero` up to 250 KB, `panel` and `detail` up to 150 KB each. Existing `flow`, `hub` and `card` files stay for use further down the pages, but must no longer appear in a hero panel.

## Live motion

Each scene declares what moves, and it must make sense for the subject: for example, packets along the painted fibre, a radar sweep, an ECG trace, a robot-arm status light. Use normalised coordinates shared with the painter so that overlays stay on the painted lines. Keep to a small set of primitives: `paths` (light travelling along a polyline), `pulses` (expanding ping), `sweeps` (rotating wedge), `blinks` (status lights). Motion must pause off screen and honour reduced motion, using `useCanvasLoop`. Motion data ships to the browser; painter code must not.

## Concepts

| Key | Route | Dominant subject | Focal part for `detail` | Motion idea |
|---|---|---|---|---|
| products | /products | Six different instrument modules slotting into one console | The console's central slot | Lights passing between modules |
| solutions | /solutions | Eight interlocking capability blocks forming a large cube | Two blocks locking together | Seams lighting up in turn |
| industries | /industries | Isometric diorama of nine small sector buildings on one plate | Bank and factory corner | Links between buildings |
| cybersecurity | /services/cybersecurity | Large layered shield with a scan beam passing over code and a blocked probe | Scan beam on code lines | Sweep, blocked probes |
| network | /services/network | Open micro data-centre rack with fibre bundles running to a NOC screen | Patch panel and fibre | Packets along fibre, port lights |
| iot | /services/iot | Circuit board gateway linked to sensors, a smart building and a farm plot | Sensor node on the board | Radio pulses, traces lit |
| application | /services/application | Browser and phone windows stacked over code, inside an agile loop | Phone screen and code | Light circling the loop |
| regulatory | /services/regulatory | Shelf of standards binders with a magnifier over one open page | Magnifier on control checklist | Ticks appearing in sequence |
| government | /industries/government | Investigation board: case file with linked timeline and magnifier | Linked session timeline | Light tracing evidence links |
| telecom | /industries/telecom | Tall cell tower sending subscriber streams into storage columns | Tower head with antennas | Radio pulses, streams |
| finance | /industries/finance | Columned bank with a transaction chain, one mule path flagged and stopped | The flagged node | Transactions, flag blink |
| enterprise | /industries/enterprise | Corporate tower and campus blocks behind a firewall wall | Firewall section | Traffic stopping at the wall |
| datacenter | /industries/datacenter | Perspective rack aisle with east-west light between coloured tenant zones | Junction between tenant zones | East-west flows |
| healthcare | /industries/healthcare | Hospital with a bedside monitor and an ECG trace, in segmented zones | Monitor and ECG | ECG trace, segment gates |
| education | /industries/education | Campus hall with an open book and connected student devices | Book and devices | Wi-Fi pulses |
| manufacturing | /industries/manufacturing | Factory line with a robot arm, a conveyor and a PLC with a passive tap | Robot arm and PLC | Conveyor light, status blinks |
| startup | /industries/startup | Small shopfront office with a compact cloud SOC above it | The cloud and small shield | Gentle pulse from the cloud |
| about | /about | Four distinct pillars (security, infrastructure, software and AI, IoT) holding one deck | The capital where pillars meet the deck | Light rising up the pillars |
| whychoose | /why-choose-us | Five ascending steps: assess, design, implement, validate, improve | The top step | Light climbing the steps |
| mission | /mission | Lighthouse throwing a beam across dark structures | Lamp room | Rotating beam |
| values | /core-values | Four interlinked emblems: balance, lens, magnifier, linked hands motif | The central linkage | Links lighting in turn |
| careers | /careers | Open desk with laptop and ID badge, an empty chair and a team alongside | Badge and laptop | Screen glow, four-step path |
| training | /training | Classroom whiteboard with a network sketch, a lab bench and a certificate | Certificate and lab bench | Sketch being drawn |
| work | /our-work | Gallery wall of four case panels: evidence, topology, risk, water quality | Water-quality and risk panels | Each panel lighting up |
| contact | /contact | Large envelope and speech bubble flying to a phone handset | Envelope seal | Message trail |
| support | /support | Headset with a ticket moving along a path to a resolved tick | Headset and tick | Ticket along the path |
| help | /help | Oversized question mark over an open FAQ book with answer bubbles | Book and bubbles | Bubbles appearing |
| blog | /blog | Stack of news cards with a megaphone | Top card and megaphone | Cards lifting in turn |
| blogpost | /blog/* | Opened welcome envelope with a card rising out of it | The rising card | Card glow |
| privacy | /privacy | Padlocked personal data folder with an ID card | Padlock on folder | Keyhole glow |
| terms | /terms | Contract sheets with a fountain pen and a scope checklist | Pen nib on signature line | Line being written |
| compliance | /compliance | Balance scale weighing a clipboard against a risk gauge | Risk gauge | Needle settling |
| cookies | /cookies | Browser window holding a cookie, with settings toggles | Toggles | Toggle switching |
| notfound | 404 | Severed fibre cable sparking at a signpost with blank arms | The severed ends | Sparks |
| nexora | /products/flowbits-nexora | Four log streams funnelling into one correlated subscriber timeline | The funnel throat | Streams converging |
| netsight | /products/netsight360 | Wall display of a device topology with health rings | A node with its links | Health rings, link pulses |
| panoptix | /products/panoptix | Radar sweep across attack-surface assets with ranked risk bars | Sweep over one asset | Radar sweep |
| nestedva | /products/nested-va | Nested layers cut away, with a probe reaching a weakness and a report | The probe tip | Probe pulse |
| smms | /products/smms | Control-room video wall with an alert escalating along a chain | The escalating alert | Alert moving |
| aiassistant | /products/ai-office-assistant | Sealed on-premises server box with documents entering and a chat bubble out | Documents entering | Documents moving |

## Work packages

### 1. Foundation (runs first, alone)

Build the scene framework, register all 40 keys, paint three pilots that prove it (`network`, `finance`, `privacy`), and wire up the pages. Packages 2 to 5 can then add a scene by creating or editing only their own file. Details are in the agent's brief.

### 2 to 5. Scenes (run in parallel, each editing only its own scene file)

- **Package 2, products:** products, solutions, industries, nexora, netsight, panoptix, nestedva, smms, aiassistant.
- **Package 3, services and tech sectors:** cybersecurity, iot, application, regulatory, telecom, enterprise, datacenter, startup.
- **Package 4, sectors and company:** government, healthcare, education, manufacturing, about, whychoose, mission, values.
- **Package 5, people and documents:** careers, training, work, contact, support, help, blog, blogpost, terms, compliance, cookies, notfound.

## Done means

- Every route resolves to its own scene, and the only shared keys are unknown blog slugs.
- A contact sheet of all `hero` images shows no two with the same layout or silhouette.
- Home is pixel-identical to the previous commit.
- Lint and build pass, and all routes are clean at 1440 and 375: no page errors, failed requests or sideways scrolling.
- No commit or push until the user asks.
