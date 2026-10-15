import {
  Activity, BadgeCheck, BookOpen, Boxes, Briefcase, Bug, Building2, Cloud, Code2, Compass, Cpu, Eye, Factory, FileCheck2,
  GraduationCap, HeartHandshake, Layers, Lightbulb, LineChart, Lock, MonitorSmartphone, Network, Palette, Radar, RefreshCw,
  Route, Scale, Search, Server, ShieldAlert, ShieldCheck, Siren, Smartphone, Sparkles, Target, Users, Workflow, Wrench, Zap,
} from 'lucide-react'

// Unsplash ids grouped by visual family (all verified to resolve).
export const imagePools = {
  security: ['photo-1550751827-4bd374c3f58b', 'photo-1760199789455-49098afd02f0', 'photo-1516321318423-f06f85e504b3', 'photo-1526374965328-7f61d4dc18c5'],
  network: ['photo-1597733336794-12d05021d510', 'photo-1544197150-b99a580bb7a8', 'photo-1451187580459-43490279c0fa', 'photo-1484557052118-f32bd25b45b5'],
  iot: ['photo-1581091226825-a6a2a5aee158', 'photo-1581092160562-40aa08e78837', 'photo-1567789884554-0b844b597180', 'photo-1581091212991-8891c7d4bd9b'],
  application: ['photo-1498050108023-c5249f4df085', 'photo-1515879218367-8466d910aaa4', 'photo-1488590528505-98d2b5aba04b', 'photo-1531297484001-80022131f5a1'],
  learning: ['photo-1509062522246-3755977927d7', 'photo-1427504494785-3a9ca7044f45', 'photo-1552664730-d307ca884978', 'photo-1529390079861-591de354faf5'],
  industry: ['photo-1486406146926-c627a92ad1ab', 'photo-1567789884554-0b844b597180', 'photo-1451187580459-43490279c0fa', 'photo-1573164713988-8665fc963095'],
  company: ['photo-1521737711867-e3b97375f902', 'photo-1552664730-d307ca884978', 'photo-1556761175-5973dc0f32e7', 'photo-1600880292203-757bb62b4baf', 'photo-1519389950473-47ba0277781c'],
  product: ['photo-1597733336794-12d05021d510', 'photo-1639322537228-f710d846310a', 'photo-1518770660439-4636190af475', 'photo-1550751827-4bd374c3f58b'],
}

export const serviceImages = {
  '/services/cybersecurity': 'photo-1550751827-4bd374c3f58b',
  '/services/network': 'photo-1544197150-b99a580bb7a8',
  '/services/iot': 'photo-1581091226825-a6a2a5aee158',
  '/services/application': 'photo-1498050108023-c5249f4df085',
  '/services/regulatory': 'photo-1556761175-5973dc0f32e7',
}

export const industryImages = {
  '/industries/government': 'photo-1555848962-6e79363ec58f',
  '/industries/telecom': 'photo-1597733336794-12d05021d510',
  '/industries/finance': 'photo-1501167786227-4cba60f6d58f',
  '/industries/enterprise': 'photo-1486406146926-c627a92ad1ab',
  '/industries/datacenter': 'photo-1484557052118-f32bd25b45b5',
  '/industries/healthcare': 'photo-1576091160550-2173dba999ef',
  '/industries/education': 'photo-1509062522246-3755977927d7',
  '/industries/manufacturing': 'photo-1567789884554-0b844b597180',
  '/industries/startup': 'photo-1552664730-d307ca884978',
}

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
  '/products/ipdr': ['Correlate address and subscriber records across high-volume sessions.', 'Reconstruct activity quickly while keeping sensitive data under controlled deployment.'],
  '/products/argos-enms': ['Understand dependencies across a growing network estate.', 'Identify performance changes early and coordinate an accountable operations response.'],
  '/products/panoptix': ['Maintain an accurate picture of internet-facing assets as they change.', 'Prioritize exposed systems by context so security work starts with the greatest risk.'],
  '/products/vapt': ['Turn periodic scanning into a repeatable improvement cycle.', 'Give teams clear findings and evidence they can use to track remediation.'],
  '/products/smms': ['Coordinate student records and daily school operations.', 'Connect administrators, teachers, students, and families around shared information.'],
  '/products/gyanshu-ai-office-assistance': ['Use AI to draft, summarise, and organise everyday office information.', 'Help teams spend less time on routine tasks and more time on meaningful work.'],
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
