# Industry and product research

Date: 2026-10-29. Purpose: check the website's product, service and industry claims against primary sources, and use competitors for insight only. No competitor text, images or branding were copied.

## Sources consulted

| Source | Type | What it established |
|--------|------|---------------------|
| `public/Technology_Product_Capability.pdf` (in this repo, 9 pages, marked “Confidential”) | Primary, company-authored | Six service lines; five “working product platforms”: AI IPDR / NetIntel, AI ENMS, AI SMMS, AI NestedVA, AI NeetIQ; delivery model; “24×7 operations-ready mindset”. It contains no percentages, uptime figures, customer names or certifications. |
| [nytt.in](https://nytt.in) | Primary, sister business (same phone number, +91 90409 61361) | Address Plot 273/3575, Jaydev Vihar, Bhubaneswar 751013; products Flowbits IPDR, ARGOS ENMS, PANOPTIX, NYTT VAPT Scanner; services matching this site; corporate and certification training (CCNA, CISSP); mentions Rust and ClickHouse for IPDR; CCNA/CCNP-certified staff. It also shows client logos, testimonials and marketing statistics (“99.9% uptime”, “0 breaches”, “100% compliant”) that are not independently verifiable. Its social icons link to generic platform home pages, like this site's did. |
| [gyanshu-w8h1.vercel.app](https://gyanshu-w8h1.vercel.app/), [gyanshu01.vercel.app](https://gyanshu01.vercel.app/) | Earlier deployments of this same site | Single-page apps; not independent evidence. |
| Web search for “Gyanshu Technologies” | Third-party | No registry, press or directory listing found. The company's legal name, registration and production domain could not be verified. |
| [Trisul IPDR](https://www.trisul.org/?p=4459), [AnexGate](https://blog.anexgate.com/ipdr-compliance-made-simple-how-anexgate-ace-usg-empower-isps-for-dot-trai-readiness), [C-DOT IPDR booklet](https://dotws.cdot.in/sites/default/files/Letter%20and%20CDoT%20Booklet%20for%20IPDR%20options.pdf?download=1) | Competitors / regulator-linked | Indian IPDR products are sold on DoT licence compliance: NetFlow/IPFIX, NAT syslog and AAA/RADIUS ingestion, CGNAT port-level logging, accurate timestamps, long retention and DoT-format reports. |
| [Outpost24](https://outpost24.com/?p=5946), [Cymulate](https://cymulate.com/platform), [CrowdStrike CTEM](https://www.crowdstrike.com/en-au/platform/exposure-management/continuous-threat-exposure-management-ctem/), [G2 category](https://www.g2.com/categories/exposure-management-platforms) | Competitors | Exposure-management buyers expect continuous asset discovery (EASM/CAASM), attack-path context, validation, risk-based prioritisation and remediation tracking, often framed by Gartner's CTEM cycle. |

## Product-by-product notes

| Website name | Name in the capability PDF | Name on nytt.in | What is supported | Gaps / flags |
|---|---|---|---|---|
| FLOWBITS NEXORA (`/products/ipdr`) | AI IPDR / NetIntel | Flowbits IPDR | IPDR analytics, subscriber/IP correlation, retention, investigation, compliance reporting | The telecom industry page said “100% TRAI Compliant”. IPDR obligations for Indian ISPs come mainly from DoT licence conditions, and competitors frame them that way. Changed to “DoT/TRAI-aligned reporting”. “Billion+ sessions/day” and “<5 ms processing” have no source and were removed. “Petabyte-scale storage” is still on the telecom page and is unverified. |
| NetSight360 (`/products/argos-enms`) | AI ENMS | ARGOS ENMS | Device health, topology, events, incidents, service visibility | The URL slug still says `argos-enms`. That is harmless, but the brand should be confirmed. |
| PANOPTIX | “Cyber exposure management” is listed as a capability, with no product name | Listed in the menu only | Asset discovery, vulnerability and misconfiguration visibility, prioritisation | The site's description matches CTEM norms. No claims needed changing. |
| Nested VA (`/products/vapt`) | AI NestedVA | NYTT VAPT Scanner | On-prem vulnerability assessment, audit checklists, evidence, reporting | The service pages call it “automated platform to simulate attacks”. The PDF describes scanning and audit, not attack simulation, so that wording overstates it. Flagged, not changed. |
| SMMS | AI SMMS | — | Monitoring and management of operations, alerts, assets, workflows | The Training page described SMMS as a “school operations platform”. That contradicts both the PDF and the product page, so it was fixed. |
| AI Office Assistant | Not in the PDF | Private on-prem LLMs and AI agents | — | Product copy is plausible, but no primary source describes the product. |
| — | AI NeetIQ (AI-IoT water quality) | — | Used on `/our-work` and in the home case studies | There is no product page. It is a candidate for a future page if the business wants one. |

## Services and industries

- **Services.** Cybersecurity, network, IoT, application development and regulatory compliance all match the PDF and nytt.in. Training courses (CCNA, CCNP, Ethical Hacking, VAPT, SOC and others) match nytt.in. Per the previous session, the user confirmed the testimonials, “global certification” and classroom/online training.
- **Regulatory page.** It lists GDPR, HIPAA, PCI DSS, FISMA, SOC 2 and ISO. Offering advisory help with these frameworks is fine. Badges such as “HIPAA Ready” or “RBI Compliant” read as certifications and were reworded to “aligned” language. FISMA is a US federal regime and is unlikely to be relevant to an Odisha-based firm's clients. That is a content decision for the business.
- **Industries.** The nine sectors are consistent with nytt.in. All headline statistics on the industry pages had no source: 90% faster investigations, 70% fraud reduction, 99.99% uptime, zero breaches, 100% isolation, zero ransomware, 100% HIPAA, 100% production uptime and zero disruption. They were replaced with qualitative capability labels (WEB-008).

## Competitive insight (for future content, not applied)

1. IPDR buyers look for proof of CGNAT port-level logging, NTP/time-sync accuracy, retention period and a sample DoT-format report. A short “Compliance checklist” section on the FLOWBITS NEXORA page would answer the first questions buyers ask.
2. Exposure-management pages from competitors map features to the five CTEM stages: scoping, discovery, prioritisation, validation, mobilisation. PANOPTIX could adopt that structure without copying anyone's wording.
3. Competitors back claims with named, permissioned case studies. Gyanshu's “Our Work” page shows capability themes, not clients. Real, approved case studies would be the strongest credibility gain.

## Unverifiable items (need a business answer)

- The legal company name: the site uses “Gyanshu Technologies” and once used “Gyanshu Technology”. The footer was aligned to “Technologies”.
- The production domain, for canonical URLs and a sitemap.
- Phone numbers +91 99388 83028 (service pages, “Emergency Support”) and +91 90909 09301 (NetSight360 page). Only +91 90409 61361 is corroborated.
- Social profile URLs: none exist on the site or on nytt.in.
- The office location: nytt.in shows Jaydev Vihar, Bhubaneswar, but this site says only “India”.
- Rust- and ClickHouse-based IPDR and petabyte-scale storage: this technology is mentioned on nytt.in, but no scale figures are given.
