import {
  Activity, BadgeCheck, BookOpen, Boxes, Briefcase, Bug, Building2, Cloud, Code2, Compass, Cpu, Eye, Factory, FileCheck2,
  GraduationCap, HeartHandshake, Layers, Lightbulb, LineChart, Lock, MonitorSmartphone, Network, Palette, Radar, RefreshCw,
  Route, Scale, Search, Server, ShieldAlert, ShieldCheck, Siren, Smartphone, Sparkles, Target, Users, Workflow, Wrench, Zap,
} from 'lucide-react'

// Unsplash ids, chosen per page and section so each photo matches its context and appears once across the site.

// Card thumbnails: used wherever a service, industry or product is linked from another page.
export const serviceImages = {
  '/services/cybersecurity': 'photo-1510915228340-29c85a43dcfe',
  '/services/network': 'photo-1558494949-ef010cbdcc31',
  '/services/iot': 'photo-1677092590812-78e7db4900d2',
  '/services/application': 'photo-1607799279861-4dd421887fb3',
  '/services/regulatory': 'photo-1628348068343-c6a848d2b6dd',
}

export const industryImages = {
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
  '/products/flowbits-nexora': 'photo-1772862991841-f0e3e1502d7b',
  '/products/nested-va': 'photo-1768839722988-91767bb82b10',
}

// Per-page sets. `hero` feeds the hero slideshow and headline pill, `cta` the closing photo strip;
// other keys name the single section they illustrate.
export const pageImages = {
  '/solutions': {
    hero: ['photo-1548092372-0d1bd40894a3', 'photo-1691435828932-911a7801adfb', 'photo-1717386255773-a456c611dc4e', 'photo-1759661990336-51bd4b951fea', 'photo-1762427354051-a9bdb181ae3b'],
    steps: 'photo-1758691736872-61a1f75fe2d5',
    cta: ['px-4486718', 'photo-1517048676732-d65bc937f952', 'px-9242280', 'photo-1521737852567-6949f3f9f2b5', 'px-7731400'],
  },
  '/industries': {
    hero: ['px-5548399', 'photo-1557174360-3f4f7c724501', 'px-5831259', 'photo-1758691737543-09a1b2b715fa', 'px-4508751'],
    orbit: 'photo-1484557052118-f32bd25b45b5',
    cta: ['px-17343501', 'px-6129037', 'px-32845692', 'px-5530447', 'px-14845309'],
  },

  '/services/cybersecurity': {
    hero: ['px-19317897', 'px-6963098', 'photo-1633265486064-086b219458ec', 'photo-1585079374502-415f8516dcc3'],
    // VAPT, code review, application & device security, cloud, SOC, incident response, red team, security consulting
    services: ['px-5473298', 'photo-1542831371-29b0f74f9713', 'photo-1584433144859-1fc3ab64a957', 'px-17323801', 'px-30692441', 'px-3913021', 'px-6330644', 'photo-1758691736067-b309ee3ef7b9'],
    // certified experts, threat intelligence, compliance, round-the-clock monitoring
    strengths: ['px-1181341', 'px-5380642', 'photo-1454165804606-c3d57bc86b40', 'px-30481728'],
    monitoring: 'px-586104',
    steps: 'px-5380618',
    products: 'photo-1751448555253-f39c06e29d82',
    training: 'photo-1524178232363-1fb2b075b655',
    cta: ['photo-1774898989484-0b9becf69efb', 'px-27742642', 'px-1181339', 'photo-1762340275855-ae8f4c2c144e', 'px-4973899'],
  },
  '/services/network': {
    hero: ['photo-1544197150-b99a580bb7a8', 'photo-1698668975271-2ba9a323be6b', 'photo-1682559736721-c2e77ff4c650', 'photo-1783419231367-89bd75443ad7'],
    steps: 'photo-1604869515882-4d10fa4b0492',
    cta: ['photo-1606814540563-5c02d62fd409', 'photo-1776052823208-b9d3df048e34', 'photo-1683322499436-f4383dd59f5a', 'photo-1548544027-1a96c4c24c7a', 'photo-1581092919535-7146ff1a590b'],
  },
  '/services/iot': {
    hero: ['photo-1677092419414-e974582c492c', 'photo-1716191299980-a6e8827ba10b', 'photo-1533163238111-4a7ced54f2e4', 'photo-1599508266124-804fc6eecf09'],
    steps: 'photo-1780034766228-3fd70d9463c3',
    cta: ['photo-1645760051467-9d61131d133e', 'photo-1682971829405-42b40b5f0895', 'px-32391505', 'photo-1774789599304-cca1e1ffbb95', 'photo-1717386255773-1e3037c81788'],
  },
  '/services/application': {
    hero: ['photo-1498050108023-c5249f4df085', 'photo-1515879218367-8466d910aaa4', 'photo-1558655146-d09347e92766', 'photo-1587620962725-abab7fe55159'],
    steps: 'photo-1758873268695-1b55590e507a',
    cta: ['photo-1602576666092-bf6447a729fc', 'px-6804071', 'photo-1545665277-5937489579f2', 'photo-1619410283995-43d9134e7656', 'photo-1758873271857-c42a7ef7d692'],
  },
  '/services/regulatory': {
    hero: ['px-7876001', 'photo-1768839724256-28cd4a373209', 'photo-1711097383282-28097ae16b1d', 'photo-1714974528683-8940bd8311aa'],
    steps: 'photo-1772588627474-ae6acc69ac42',
    cta: ['photo-1738566061961-4e20e3bf470d', 'photo-1779729686198-117c1307894d', 'px-6814526', 'photo-1689330305908-aa231c1dd595', 'px-7821674'],
  },

  '/industries/government': {
    hero: ['px-18347328', 'px-19353800', 'photo-1618482914248-29272d021005', 'photo-1785947058973-43d5e9c64ef7'],
    cta: ['px-39119983', 'px-34525311', 'photo-1589935447067-5531094415d1', 'px-3881113'],
  },
  '/industries/telecom': {
    hero: ['photo-1768699504864-7c8e99cb3c33', 'photo-1582193607281-dafb7941640f', 'photo-1532356884227-66d7c0e9e4c2', 'photo-1632277232577-09bcf876d6fb'],
    cta: ['photo-1533664488202-6af66d26c44a', 'photo-1602823284936-463177448097', 'photo-1774803202421-764eda5deb50', 'photo-1673798880756-889117cacb7e'],
  },
  '/industries/finance': {
    hero: ['px-8204355', 'px-4226272', 'photo-1551288049-bebda4e38f71', 'photo-1596843720750-7de9329da5d7'],
    cta: ['photo-1470075801209-17f9ec0cada6', 'photo-1556742031-c6961e8560b0', 'px-7561698', 'px-5831263'],
  },
  '/industries/enterprise': {
    hero: ['px-442150', 'photo-1758691737568-a1572060ce5a', 'photo-1573164574572-cb89e39749b4', 'photo-1606836591695-4d58a73eba1e'],
    cta: ['px-36397550', 'px-6804586', 'px-7698707', 'px-1181316'],
  },
  '/industries/datacenter': {
    hero: ['photo-1584169417032-d34e8d805e8b', 'px-5408005', 'photo-1762163516269-3c143e04175c', 'px-1181354'],
    cta: ['photo-1695668548342-c0c1ad479aee', 'photo-1785682231847-93265d8e633d', 'photo-1564457461758-8ff96e439e83', 'photo-1580106815433-a5b1d1d53d85'],
  },
  '/industries/healthcare': {
    hero: ['photo-1519494026892-80bbd2d6fd0d', 'photo-1758691463203-cce9d415b2b5', 'photo-1787338718195-ee70ca40765b', 'photo-1776104501583-3c83f2adfc3d'],
    cta: ['photo-1758691462353-36b215702253', 'px-6285379', 'photo-1778151270902-cb0ca572f2ee', 'px-9574482'],
  },
  '/industries/education': {
    hero: ['photo-1758270704587-43339a801396', 'px-5530484', 'photo-1606761568499-6d2451b23c66', 'photo-1580582932707-520aed937b7b'],
    cta: ['photo-1758270704524-596810e891b5', 'px-5539293', 'px-4622108', 'px-32394664'],
  },
  '/industries/manufacturing': {
    hero: ['photo-1496247749665-49cf5b1022e9', 'photo-1777383975764-bec6f5cabf00', 'photo-1787039467622-ddec5c24320c', 'px-37769419'],
    cta: ['photo-1578776349090-de61da00ff1a', 'photo-1701328778019-e95dedbf5346', 'px-32845695', 'photo-1716194583732-0b9874234218'],
  },
  '/industries/startup': {
    hero: ['photo-1758873269811-4e62e346b4b7', 'px-4307840', 'photo-1603201667141-5a2d4c673378', 'photo-1556740758-90de374c12ad'],
    cta: ['photo-1758873268933-e0765262e58d', 'photo-1521737604893-d14cc237f11d', 'px-7857557', 'px-18067562'],
  },

  '/about': {
    hero: ['photo-1521737711867-e3b97375f902', 'px-4623332', 'photo-1758691736843-90f58dce465e', 'px-6804068'],
    cta: ['px-5439478', 'px-7988116', 'px-31786661', 'px-1181335'],
  },
  '/why-choose-us': {
    hero: ['px-7698712', 'px-8000545', 'px-6804590', 'px-7693148'],
    steps: 'photo-1787647560683-0e4b037ea9d6',
    cta: ['px-17713788', 'px-7709231', 'photo-1768055105012-4c53791b2877', 'photo-1581087724694-14c17b0c17fc'],
  },
  '/mission': {
    hero: ['px-17489157', 'photo-1758873268136-83e3e1be9315', 'px-12899162', 'px-32845690'],
    cta: ['px-4864249', 'px-1181319', 'px-5530450', 'px-4623316'],
  },
  '/core-values': {
    hero: ['px-7581110', 'px-7988757', 'photo-1758873268745-dd2cf0d677b5', 'photo-1581091226033-d5c48150dbaa'],
    steps: 'photo-1761250246894-ee2314939662',
    cta: ['px-34054482', 'photo-1581091226205-b28ac533a45f', 'photo-1702468049239-49fd1cf99d20', 'photo-1580982333389-cca46f167381'],
  },
  '/careers': {
    hero: ['photo-1758520144437-f068ecaf0d83', 'photo-1635350736475-c8cef4b21906', 'photo-1573497620053-ea5300f94f21', 'photo-1511376979163-f804dff7ad7b'],
    steps: 'photo-1758691736979-ff263c04b3d1',
    cta: ['photo-1629904853716-f0bc54eea481', 'photo-1544006659-f0b21884ce1d', 'photo-1602016736566-7ed6a58894bd', 'photo-1622151834677-70f982c9adef'],
  },
  '/training': {
    hero: ['photo-1580894732444-8ecded7900cd', 'px-35571660', 'px-17471201', 'photo-1646579886135-068c73800308'],
    learning: 'photo-1758270703928-6a8597669abc',
    cta: ['photo-1778877035089-c80dcb877f45', 'photo-1758270705031-ebd46917a454', 'photo-1758270704021-361c165d68fd', 'px-5530515'],
  },
  '/our-work': {
    hero: ['photo-1763038311036-6d18805537e5', 'photo-1779896412277-c4fd15c7a89c', 'px-577210', 'px-12969403'],
    // case studies: IPDR, network operations, vulnerability management, IoT water quality
    cases: ['photo-1643155193188-38eb08e2b54f', 'px-37605911', 'px-7988747', 'photo-1526599256864-6bedb9d7dfb5'],
    // illustrative use cases: infrastructure intelligence, security exposure, connected operations
    useCases: ['photo-1526628953301-3e589a6a8b74', 'px-3803517', 'photo-1783419482520-2f8b80a40369'],
    steps: 'photo-1764195287345-2086f504cb0b',
    cta: ['photo-1784729553968-07da5d7b7c99', 'photo-1781246435700-afec19012b45', 'photo-1783115259399-3a5a3e0e4592', 'photo-1460925895917-afdab827c52f'],
  },

  '/contact': { hero: ['px-8681899', 'photo-1615840287214-7ff58936c4cf', 'photo-1587560699334-bea93391dcef', 'px-7709168'] },
  '/support': { hero: ['photo-1553775282-20af80779df7', 'photo-1551434678-e076c223a692', 'photo-1536148935331-408321065b18', 'photo-1518655048521-f130df041f66'] },
  '/help': {
    hero: ['photo-1560264418-c4445382edbc', 'photo-1592890288564-76628a30a657', 'px-8867628', 'px-7682358'],
    cta: ['px-7709255', 'px-8867382', 'photo-1570215171424-f74325192b55', 'photo-1544717305-f9c88f2897bc'],
  },
  notFound: { hero: ['photo-1470115636492-6d2b56f9146d', 'photo-1566331677361-6376aed9ecda', 'photo-1553198194-1b81858f6436', 'photo-1608916330368-55763e6a6c3c'] },
}

// Pages without their own entry (e.g. a new industry) fall back to their card image so nothing renders blank.
export const mediaFor = (path) => {
  if (pageImages[path]) return pageImages[path]
  const hero = [serviceImages[path] || industryImages[path] || productImages[path]].filter(Boolean)
  return { hero, cta: hero }
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
