import {
  Activity, BadgeCheck, BookOpen, Boxes, Briefcase, Bug, Building2, Cloud, Code2, Compass, Cpu, Eye, Factory, FileCheck2,
  GraduationCap, HeartHandshake, Layers, Lightbulb, LineChart, Lock, MonitorSmartphone, Network, Palette, Radar, RefreshCw,
  Route, Scale, Search, Server, ShieldAlert, ShieldCheck, Siren, Smartphone, Sparkles, Target, Users, Workflow, Wrench, Zap,
} from 'lucide-react'
import { art, artKeyFor } from './artManifest'

// Every interior image is generated artwork (public/images/art). Topic keys come from artManifest.
const card = (key) => art(key, 'card')
const hub = (key) => art(key, 'hub')
// A page's standard set: hero slides, the process backdrop and the closing-band images.
const pageSet = (key, extra = {}) => ({ hero: [art(key, 'flow'), hub(key)], steps: hub(key), cta: [card(key), hub(key)], ...extra })

// Card thumbnails: used wherever a service, industry or product is linked from another page.
export const serviceImages = {
  '/services/cybersecurity': card('cybersecurity'),
  '/services/network': card('network'),
  '/services/iot': card('iot'),
  '/services/application': card('application'),
  '/services/regulatory': card('regulatory'),
}

export const industryImages = {
  '/industries/government': card('government'),
  '/industries/telecom': card('telecom'),
  '/industries/finance': card('finance'),
  '/industries/enterprise': card('enterprise'),
  '/industries/datacenter': card('datacenter'),
  '/industries/healthcare': card('healthcare'),
  '/industries/education': card('education'),
  '/industries/manufacturing': card('manufacturing'),
  '/industries/startup': card('startup'),
}

// The home page's industry strip keeps its photographs; only home/Industries.jsx uses these.
export const homeIndustryImages = {
  '/industries/government': 'photo-1555848962-6e79363ec58f',
  '/industries/telecom': 'photo-1782055984204-43c6cdfb99b1',
  '/industries/finance': 'photo-1501167786227-4cba60f6d58f',
  '/industries/enterprise': 'photo-1486406146926-c627a92ad1ab',
  '/industries/datacenter': 'photo-1784652852605-6945598f2af3',
  '/industries/healthcare': 'photo-1576091160550-2173dba999ef',
  '/industries/education': 'photo-1562774053-701939374585',
  '/industries/manufacturing': 'photo-1647427060118-4911c9821b82',
  '/industries/startup': 'photo-1522071820081-009f0129c71c',
}

export const productImages = {
  '/products/flowbits-nexora': card('nexora'),
  '/products/nested-va': card('nestedva'),
}

// Per-page sets. `hero` feeds the hero slideshow, `cta` the closing band;
// other keys name the single section they illustrate.
export const pageImages = {
  '/solutions': pageSet('solutions'),
  '/industries': pageSet('industries', { orbit: hub('industries') }),

  '/services/cybersecurity': pageSet('cybersecurity', {
    // VAPT, code review, application & device security, cloud, SOC, incident response, red team, security consulting
    services: ['cybersecurity', 'application', 'iot', 'datacenter', 'panoptix', 'telecom', 'nestedva', 'regulatory'].map(card),
    // certified experts, threat intelligence, compliance, round-the-clock monitoring
    strengths: ['about', 'nexora', 'regulatory', 'netsight'].map(card),
    monitoring: hub('netsight'),
    products: hub('products'),
    training: hub('training'),
  }),
  '/services/network': pageSet('network'),
  '/services/iot': pageSet('iot'),
  '/services/application': pageSet('application'),
  '/services/regulatory': pageSet('regulatory'),

  '/industries/government': pageSet('government'),
  '/industries/telecom': pageSet('telecom'),
  '/industries/finance': pageSet('finance'),
  '/industries/enterprise': pageSet('enterprise'),
  '/industries/datacenter': pageSet('datacenter'),
  '/industries/healthcare': pageSet('healthcare'),
  '/industries/education': pageSet('education'),
  '/industries/manufacturing': pageSet('manufacturing'),
  '/industries/startup': pageSet('startup'),

  '/about': pageSet('about'),
  '/why-choose-us': pageSet('whychoose'),
  '/mission': pageSet('mission'),
  '/core-values': pageSet('values'),
  '/careers': pageSet('careers'),
  '/training': pageSet('training', { learning: hub('training') }),
  '/our-work': pageSet('work', {
    // case studies: IPDR, network operations, vulnerability management, IoT water quality
    cases: ['nexora', 'netsight', 'panoptix', 'iot'].map(card),
    // illustrative use cases: infrastructure intelligence, security exposure, connected operations
    useCases: ['datacenter', 'cybersecurity', 'smms'].map(card),
  }),

  '/contact': pageSet('contact'),
  '/support': pageSet('support'),
  '/help': pageSet('help'),
  notFound: pageSet('notfound'),
}

// Pages without their own entry (e.g. a new industry) fall back to the art for their route so nothing renders blank.
export const mediaFor = (path) => pageImages[path] || pageSet(artKeyFor(path))

export const industryIcons = {
  '/industries/government': Building2, '/industries/telecom': Radar, '/industries/finance': LineChart,
  '/industries/enterprise': Briefcase, '/industries/datacenter': Server, '/industries/healthcare': HeartHandshake,
  '/industries/education': GraduationCap, '/industries/manufacturing': Factory, '/industries/startup': Sparkles,
}

// Indices into `faqs` (src/data/content.js) most relevant to each page.
export const faqPicks = {
  '/services/cybersecurity': [2, 6, 9, 3],
  '/services/network': [1, 4, 8, 0],
  '/services/iot': [5, 3, 8, 1],
  '/services/application': [0, 1, 8, 10],
  '/services/regulatory': [9, 2, 10, 3],
  '/solutions': [0, 1, 4, 10, 11],
  products: [3, 8, 9, 7, 11],
  '/contact': [11, 1, 10, 0],
}

// Operational pressures shown on service, product and industry pages.
export const operatingNeeds = {
  '/products/flowbits-nexora': ['Correlate address and subscriber records across high-volume sessions.', 'Reconstruct activity quickly while keeping sensitive data under controlled deployment.'],
  '/products/netsight360': ['Understand dependencies across a growing network estate.', 'Identify performance changes early and coordinate an accountable operations response.'],
  '/products/panoptix': ['Maintain an accurate picture of internet-facing assets as they change.', 'Prioritize exposed systems by context so security work starts with the greatest risk.'],
  '/products/nested-va': ['Turn periodic scanning into a repeatable improvement cycle.', 'Give teams clear findings and evidence they can use to track remediation.'],
  '/products/smms': ['See infrastructure status, alerts and service health in one place.', 'Coordinate escalation across distributed sites with consistent, auditable workflows.'],
  '/products/ai-office-assistant': ['Use AI to draft, summarise, and organise everyday office information.', 'Help teams spend less time on routine tasks and more time on meaningful work.'],
  '/services/cybersecurity': ['Security controls drift as infrastructure, identities, and applications change.', 'Incident roles and response paths need to be understood before a critical event.'],
  '/services/network': ['Legacy infrastructure can limit reliability and make change difficult to control.', 'Teams need end-to-end visibility across cloud, network, and data centre dependencies.'],
  '/services/iot': ['Operational data is often isolated from the decisions that could improve outcomes.', 'Connected devices need secure edge processing and lifecycle ownership.'],
  '/services/application': ['Business workflows outgrow existing software and create avoidable friction.', 'Modernization needs to account for integration, security, usability, and ongoing ownership.'],
  '/services/regulatory': ['Requirements can be difficult to translate into everyday controls.', 'Teams need a clear path from risk ownership through evidence and review.'],
}
export const defaultNeeds = ['Technology environments have different constraints, owners, and service expectations.', 'Teams need practical visibility and a clear path from priority to action.']

// Pick a fitting icon from the wording of a feature.
const iconRules = [
  [/vapt|vulnerab|penetration|red team|threat|exposure|attack/i, Bug],
  [/incident|alert|crisis/i, Siren],
  [/source code|code review|application security/i, Code2],
  [/mobile/i, Smartphone],
  [/cloud/i, Cloud],
  [/architecture|design|framework|governance/i, Layers],
  [/security|protect|privacy|secure/i, ShieldCheck],
  [/compliance|audit|regulat|control/i, FileCheck2],
  [/risk/i, ShieldAlert],
  [/network|noc|nms|connect/i, Network],
  [/data cent|server|infrastructure|micro/i, Server],
  [/rollout|setup|amc|maintenance|support/i, Wrench],
  [/operation|monitor|visibility|observ/i, Activity],
  [/open source/i, Boxes],
  [/prototyp|embedded|iot/i, Cpu],
  [/manufactur|industrial|automation/i, Factory],
  [/migration|moderni|change/i, RefreshCw],
  [/process|workflow/i, Workflow],
  [/ux|ui/i, Palette],
  [/web|custom|application/i, MonitorSmartphone],
  [/training|awareness|learn/i, GraduationCap],
  [/consult|strategy|roadmap/i, Compass],
  [/scal|growth/i, Zap],
  [/team|people|multidisciplinary/i, Users],
  [/assess|discover|search/i, Search],
  [/deliver|path|journey/i, Route],
  [/reliab|depend|resilien/i, BadgeCheck],
  [/clear|clarity/i, Eye],
  [/responsib|ownership/i, Target],
  [/curio|innovat/i, Lightbulb],
  [/partner/i, HeartHandshake],
  [/scale|choice/i, Scale],
  [/lock|access/i, Lock],
  [/content|course/i, BookOpen],
]
export const iconFor = (text) => iconRules.find(([re]) => re.test(text))?.[1] || Sparkles
