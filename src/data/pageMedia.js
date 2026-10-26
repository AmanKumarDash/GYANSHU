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
  '/products/ipdr': 'photo-1772862991841-f0e3e1502d7b',
  '/products/vapt': 'photo-1768839722988-91767bb82b10',
}

// Per-page sets. `hero` feeds the hero slideshow and headline pill, `cta` the closing photo strip;
// other keys name the single section they illustrate.
export const pageImages = {
  '/solutions': {
    hero: ['photo-1548092372-0d1bd40894a3', 'photo-1691435828932-911a7801adfb', 'photo-1717386255773-a456c611dc4e', 'photo-1759661990336-51bd4b951fea', 'photo-1762427354051-a9bdb181ae3b'],
    steps: 'photo-1758691736872-61a1f75fe2d5',
    cta: ['photo-1758518731706-be5d5230e5a5', 'photo-1517048676732-d65bc937f952', 'photo-1557804506-669a67965ba0', 'photo-1521737852567-6949f3f9f2b5', 'photo-1600880292089-90a7e086ee0c'],
  },
  '/industries': {
    hero: ['photo-1768617154318-b2caa1e97a60', 'photo-1557174360-3f4f7c724501', 'photo-1554469384-e58fac16e23a', 'photo-1758691737543-09a1b2b715fa', 'photo-1506399558188-acca6f8cbf41'],
    orbit: 'photo-1484557052118-f32bd25b45b5',
    cta: ['photo-1480714378408-67cf0d13bc1b', 'photo-1444723121867-7a241cacace9', 'photo-1496568816309-51d7c20e3b21', 'photo-1760553120209-8e9d5d2493e3', 'photo-1779981140213-8ba54c2c7a5a'],
  },

  '/services/cybersecurity': {
    hero: ['photo-1760199789455-49098afd02f0', 'photo-1770159116807-9b2a7bb82294', 'photo-1633265486064-086b219458ec', 'photo-1585079374502-415f8516dcc3'],
    // VAPT, code review, application & device security, cloud, SOC, incident response, red team, security consulting
    services: ['photo-1562813733-b31f71025d54', 'photo-1542831371-29b0f74f9713', 'photo-1584433144859-1fc3ab64a957', 'photo-1667984390538-3dea7a3fe33d', 'photo-1663841366340-c0fee65c6a11', 'photo-1779021874809-420451076ee1', 'photo-1519575706483-221027bfbb31', 'photo-1758691736067-b309ee3ef7b9'],
    // certified experts, threat intelligence, compliance, round-the-clock monitoring
    strengths: ['photo-1758691736407-02406d18df6c', 'photo-1677442135703-1787eea5ce01', 'photo-1454165804606-c3d57bc86b40', 'photo-1652145595413-0a79398e5888'],
    monitoring: 'photo-1782945217386-300f33f22069',
    steps: 'photo-1765445665883-085301570c87',
    products: 'photo-1751448555253-f39c06e29d82',
    training: 'photo-1524178232363-1fb2b075b655',
    cta: ['photo-1774898989484-0b9becf69efb', 'photo-1765410853873-c8e85309c73d', 'photo-1771986931223-8dc05e52363c', 'photo-1762340275855-ae8f4c2c144e', 'photo-1523961131990-5ea7c61b2107'],
  },
  '/services/network': {
    hero: ['photo-1544197150-b99a580bb7a8', 'photo-1698668975271-2ba9a323be6b', 'photo-1682559736721-c2e77ff4c650', 'photo-1783419231367-89bd75443ad7'],
    steps: 'photo-1604869515882-4d10fa4b0492',
    cta: ['photo-1606814540563-5c02d62fd409', 'photo-1776052823208-b9d3df048e34', 'photo-1683322499436-f4383dd59f5a', 'photo-1548544027-1a96c4c24c7a', 'photo-1581092919535-7146ff1a590b'],
  },
  '/services/iot': {
    hero: ['photo-1677092419414-e974582c492c', 'photo-1716191299980-a6e8827ba10b', 'photo-1533163238111-4a7ced54f2e4', 'photo-1599508266124-804fc6eecf09'],
    steps: 'photo-1780034766228-3fd70d9463c3',
    cta: ['photo-1645760051467-9d61131d133e', 'photo-1682971829405-42b40b5f0895', 'photo-1760553120312-2821bf54e767', 'photo-1774789599304-cca1e1ffbb95', 'photo-1717386255773-1e3037c81788'],
  },
  '/services/application': {
    hero: ['photo-1498050108023-c5249f4df085', 'photo-1515879218367-8466d910aaa4', 'photo-1558655146-d09347e92766', 'photo-1587620962725-abab7fe55159'],
    steps: 'photo-1758873268695-1b55590e507a',
    cta: ['photo-1602576666092-bf6447a729fc', 'photo-1777503810337-e78757a41278', 'photo-1545665277-5937489579f2', 'photo-1619410283995-43d9134e7656', 'photo-1758873271857-c42a7ef7d692'],
  },
  '/services/regulatory': {
    hero: ['photo-1556761175-5973dc0f32e7', 'photo-1768839724256-28cd4a373209', 'photo-1711097383282-28097ae16b1d', 'photo-1714974528683-8940bd8311aa'],
    steps: 'photo-1772588627474-ae6acc69ac42',
    cta: ['photo-1738566061961-4e20e3bf470d', 'photo-1779729686198-117c1307894d', 'photo-1758519289074-9de36003622b', 'photo-1689330305908-aa231c1dd595', 'photo-1658142034594-12b5c411069d'],
  },

  '/industries/government': {
    hero: ['photo-1594581979864-36977b15d0dc', 'photo-1606022831434-91293aebf25a', 'photo-1618482914248-29272d021005', 'photo-1785947058973-43d5e9c64ef7'],
    cta: ['photo-1775436889537-4859f965a6e4', 'photo-1760054333343-e758377d89ea', 'photo-1589935447067-5531094415d1', 'photo-1557081999-0ea3e23579d2'],
  },
  '/industries/telecom': {
    hero: ['photo-1768699504864-7c8e99cb3c33', 'photo-1582193607281-dafb7941640f', 'photo-1532356884227-66d7c0e9e4c2', 'photo-1632277232577-09bcf876d6fb'],
    cta: ['photo-1533664488202-6af66d26c44a', 'photo-1602823284936-463177448097', 'photo-1774803202421-764eda5deb50', 'photo-1673798880756-889117cacb7e'],
  },
  '/industries/finance': {
    hero: ['photo-1764983255241-3768b4df0c57', 'photo-1556742502-ec7c0e9f34b1', 'photo-1551288049-bebda4e38f71', 'photo-1596843720750-7de9329da5d7'],
    cta: ['photo-1470075801209-17f9ec0cada6', 'photo-1556742031-c6961e8560b0', 'photo-1649359569078-c445b3c6a116', 'photo-1764983432249-ec5965fc01be'],
  },
  '/industries/enterprise': {
    hero: ['photo-1636142466028-8c6c7cd616b7', 'photo-1758691737568-a1572060ce5a', 'photo-1573164574572-cb89e39749b4', 'photo-1606836591695-4d58a73eba1e'],
    cta: ['photo-1768661770207-9aa46d5ed526', 'photo-1594007336248-95440e3fde6d', 'photo-1758599543129-5269a8f29e68', 'photo-1759310610325-2c7cb621e5e3'],
  },
  '/industries/datacenter': {
    hero: ['photo-1584169417032-d34e8d805e8b', 'photo-1782094673136-5198a372980c', 'photo-1762163516269-3c143e04175c', 'photo-1690627931320-16ac56eb2588'],
    cta: ['photo-1695668548342-c0c1ad479aee', 'photo-1785682231847-93265d8e633d', 'photo-1564457461758-8ff96e439e83', 'photo-1580106815433-a5b1d1d53d85'],
  },
  '/industries/healthcare': {
    hero: ['photo-1519494026892-80bbd2d6fd0d', 'photo-1758691463203-cce9d415b2b5', 'photo-1787338718195-ee70ca40765b', 'photo-1776104501583-3c83f2adfc3d'],
    cta: ['photo-1758691462353-36b215702253', 'photo-1532938911079-1b06ac7ceec7', 'photo-1778151270902-cb0ca572f2ee', 'photo-1758691461990-03b49d969495'],
  },
  '/industries/education': {
    hero: ['photo-1758270704587-43339a801396', 'photo-1576495199011-eb94736d05d6', 'photo-1606761568499-6d2451b23c66', 'photo-1580582932707-520aed937b7b'],
    cta: ['photo-1758270704524-596810e891b5', 'photo-1583373834259-46cc92173cb7', 'photo-1536925155833-43e9c2b2f499', 'photo-1772418028359-823f2eb333d4'],
  },
  '/industries/manufacturing': {
    hero: ['photo-1496247749665-49cf5b1022e9', 'photo-1777383975764-bec6f5cabf00', 'photo-1787039467622-ddec5c24320c', 'photo-1581094373271-1fa59e2ab263'],
    cta: ['photo-1578776349090-de61da00ff1a', 'photo-1701328778019-e95dedbf5346', 'photo-1772299121503-cd62a57e3a26', 'photo-1716194583732-0b9874234218'],
  },
  '/industries/startup': {
    hero: ['photo-1758873269811-4e62e346b4b7', 'photo-1531058240690-006c446962d8', 'photo-1603201667141-5a2d4c673378', 'photo-1556740758-90de374c12ad'],
    cta: ['photo-1758873268933-e0765262e58d', 'photo-1521737604893-d14cc237f11d', 'photo-1773146916231-e6aeae932080', 'photo-1687422808248-f807f4ea2a2e'],
  },

  '/about': {
    hero: ['photo-1521737711867-e3b97375f902', 'photo-1582213782179-e0d53f98f2ca', 'photo-1758691736843-90f58dce465e', 'photo-1600880292203-757bb62b4baf'],
    quotes: 'photo-1758873269181-270f5b7fc6aa',
    cta: ['photo-1739285452621-59d92842fcc8', 'photo-1566140967404-b8b3932483f5', 'photo-1776057441344-38e0587ad1e6', 'photo-1492366254240-43affaefc3e3'],
  },
  '/why-choose-us': {
    hero: ['photo-1549923746-c502d488b3ea', 'photo-1758518730384-be3d205838e8', 'photo-1686771416282-3888ddaf249b', 'photo-1758520144427-ddb02ac74e9d'],
    quotes: 'photo-1758691737278-3af15b37af48',
    steps: 'photo-1787647560683-0e4b037ea9d6',
    cta: ['photo-1758518729240-7162d07427b8', 'photo-1698047682091-782b1e5c6536', 'photo-1768055105012-4c53791b2877', 'photo-1581087724694-14c17b0c17fc'],
  },
  '/mission': {
    hero: ['photo-1663427929917-333d88949f7a', 'photo-1758873268136-83e3e1be9315', 'photo-1512314889357-e157c22f938d', 'photo-1581094482523-8555833e6aba'],
    cta: ['photo-1663427929868-3941f957bb36', 'photo-1769251968740-f8ffa70f9043', 'photo-1660316478325-f16d1141f4a0', 'photo-1676944229887-b2def0f94185'],
  },
  '/core-values': {
    hero: ['photo-1544027993-37dbfe43562a', 'photo-1501770118606-b1d640526693', 'photo-1758873268745-dd2cf0d677b5', 'photo-1581091226033-d5c48150dbaa'],
    quotes: 'photo-1758691737207-e75821e080cb',
    steps: 'photo-1761250246894-ee2314939662',
    cta: ['photo-1581094481644-f2ab64522498', 'photo-1581091226205-b28ac533a45f', 'photo-1702468049239-49fd1cf99d20', 'photo-1580982333389-cca46f167381'],
  },
  '/careers': {
    hero: ['photo-1758520144437-f068ecaf0d83', 'photo-1635350736475-c8cef4b21906', 'photo-1573497620053-ea5300f94f21', 'photo-1511376979163-f804dff7ad7b'],
    quotes: 'photo-1598970434795-0c54fe7c0648',
    cta: ['photo-1629904853716-f0bc54eea481', 'photo-1544006659-f0b21884ce1d', 'photo-1602016736566-7ed6a58894bd', 'photo-1622151834677-70f982c9adef'],
  },
  '/training': {
    hero: ['photo-1580894732444-8ecded7900cd', 'photo-1664382953481-141e97ad9825', 'photo-1776039325240-02916820bfeb', 'photo-1646579886135-068c73800308'],
    learning: 'photo-1758270703928-6a8597669abc',
    cta: ['photo-1778877035089-c80dcb877f45', 'photo-1758270705031-ebd46917a454', 'photo-1758270704021-361c165d68fd', 'photo-1588072432836-e10032774350'],
  },
  '/our-work': {
    hero: ['photo-1763038311036-6d18805537e5', 'photo-1779896412277-c4fd15c7a89c', 'photo-1674027444485-cec3da58eef4', 'photo-1694903089438-bf28d4697d9a'],
    // case studies: IPDR, network operations, vulnerability management, IoT water quality
    cases: ['photo-1643155193188-38eb08e2b54f', 'photo-1589186161289-9eb8898086df', 'photo-1765192133262-5641a39f6008', 'photo-1526599256864-6bedb9d7dfb5'],
    // illustrative use cases: infrastructure intelligence, security exposure, connected operations
    useCases: ['photo-1526628953301-3e589a6a8b74', 'photo-1757484965213-8393e82789fe', 'photo-1783419482520-2f8b80a40369'],
    steps: 'photo-1764195287345-2086f504cb0b',
    cta: ['photo-1784729553968-07da5d7b7c99', 'photo-1781246435700-afec19012b45', 'photo-1783115259399-3a5a3e0e4592', 'photo-1460925895917-afdab827c52f'],
  },

  '/contact': { hero: ['photo-1523966211575-eb4a01e7dd51', 'photo-1615840287214-7ff58936c4cf', 'photo-1587560699334-bea93391dcef', 'photo-1596524430615-b46475ddff6e'] },
  '/support': { hero: ['photo-1553775282-20af80779df7', 'photo-1551434678-e076c223a692', 'photo-1536148935331-408321065b18', 'photo-1518655048521-f130df041f66'] },
  '/help': {
    hero: ['photo-1560264418-c4445382edbc', 'photo-1592890288564-76628a30a657', 'photo-1534536281715-e28d76689b4d', 'photo-1499159058454-75067059248a'],
    cta: ['photo-1525598912003-663126343e1f', 'photo-1740560051533-3acef26ace95', 'photo-1570215171424-f74325192b55', 'photo-1544717305-f9c88f2897bc'],
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
