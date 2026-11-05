// Generated artwork, one set per topic. scripts/generate-art.mjs paints these into public/images/art/<key>-<kind>.webp
// and components/art/* animates them. Icon names are lucide-react exports.
// `motif` floats on the hero globe; `panels` are the six hero tiles; `sources` feed the flow scene; `outputs` end it.
const set = (motif, panels, sources, outputs, seed) => ({ motif, panels, sources, outputs, seed })

export const artManifest = {
  // Listings
  products: set('Layers', ['Radar', 'Network', 'ShieldCheck', 'Bug', 'Activity', 'Bot'], ['Server', 'Router', 'Cloud', 'Database', 'Cctv', 'Laptop'], ['ShieldCheck', 'ChartColumn', 'FileText'], 11),
  solutions: set('Boxes', ['ShieldCheck', 'Network', 'Cpu', 'Code2', 'FileCheck2', 'Cloud'], ['Server', 'Network', 'Cloud', 'Cpu', 'Code2', 'Users'], ['BadgeCheck', 'TrendingUp', 'ShieldCheck'], 12),
  industries: set('Building2', ['Landmark', 'RadioTower', 'Banknote', 'Building2', 'HeartPulse', 'Factory'], ['Landmark', 'RadioTower', 'Banknote', 'Server', 'GraduationCap', 'Factory'], ['ShieldCheck', 'ChartColumn', 'BadgeCheck'], 13),
  // Services
  cybersecurity: set('ShieldCheck', ['Lock', 'Bug', 'ScanSearch', 'Siren', 'KeyRound', 'Fingerprint'], ['Server', 'Laptop', 'Cloud', 'Globe', 'Smartphone', 'Database'], ['ShieldCheck', 'Siren', 'FileText'], 21),
  network: set('Network', ['Router', 'Server', 'Cable', 'Wifi', 'Cloud', 'Activity'], ['Router', 'Server', 'Wifi', 'Cloud', 'Cable', 'Laptop'], ['Activity', 'ChartColumn', 'BadgeCheck'], 22),
  iot: set('Cpu', ['Cpu', 'Thermometer', 'Wifi', 'Gauge', 'Factory', 'Cog'], ['Thermometer', 'Cctv', 'Wifi', 'Gauge', 'Factory', 'Cpu'], ['Activity', 'Cog', 'ChartColumn'], 23),
  application: set('Code2', ['Code2', 'MonitorSmartphone', 'Database', 'Cloud', 'GitBranch', 'Rocket'], ['Code2', 'Database', 'GitBranch', 'Cloud', 'Smartphone', 'Laptop'], ['Rocket', 'BadgeCheck', 'TrendingUp'], 24),
  regulatory: set('Scale', ['FileCheck2', 'Scale', 'ClipboardCheck', 'Landmark', 'ShieldCheck', 'FileText'], ['FileText', 'ClipboardCheck', 'Landmark', 'Database', 'Users', 'Server'], ['FileCheck2', 'ShieldCheck', 'BadgeCheck'], 25),
  // Industries
  government: set('Landmark', ['Landmark', 'Fingerprint', 'ScanSearch', 'FileCheck2', 'ShieldCheck', 'Globe'], ['Globe', 'Database', 'Fingerprint', 'RadioTower', 'Server', 'Cctv'], ['ScanSearch', 'FileCheck2', 'ShieldCheck'], 31),
  telecom: set('RadioTower', ['RadioTower', 'Wifi', 'Router', 'Network', 'Smartphone', 'Globe'], ['RadioTower', 'Router', 'Smartphone', 'Wifi', 'Server', 'Globe'], ['Activity', 'FileText', 'ChartColumn'], 32),
  finance: set('Banknote', ['Banknote', 'CreditCard', 'TrendingUp', 'ShieldCheck', 'Lock', 'FileCheck2'], ['CreditCard', 'Smartphone', 'Banknote', 'Database', 'Server', 'Globe'], ['ShieldCheck', 'TrendingUp', 'FileCheck2'], 33),
  enterprise: set('Building2', ['Building2', 'Network', 'Cloud', 'Users', 'ShieldCheck', 'ChartColumn'], ['Building2', 'Laptop', 'Cloud', 'Users', 'Server', 'Wifi'], ['ChartColumn', 'ShieldCheck', 'BadgeCheck'], 34),
  datacenter: set('Server', ['Server', 'Database', 'Cloud', 'HardDrive', 'Zap', 'Activity'], ['Server', 'HardDrive', 'Database', 'Cloud', 'Router', 'Zap'], ['Activity', 'Gauge', 'ShieldCheck'], 35),
  healthcare: set('HeartPulse', ['HeartPulse', 'Stethoscope', 'Hospital', 'Lock', 'Database', 'ShieldCheck'], ['Hospital', 'Stethoscope', 'HeartPulse', 'Database', 'Laptop', 'Wifi'], ['ShieldCheck', 'Activity', 'FileCheck2'], 36),
  education: set('GraduationCap', ['GraduationCap', 'BookOpen', 'School', 'Wifi', 'Laptop', 'ShieldCheck'], ['School', 'Laptop', 'BookOpen', 'Wifi', 'Users', 'Cloud'], ['GraduationCap', 'ShieldCheck', 'ChartColumn'], 37),
  manufacturing: set('Factory', ['Factory', 'Cog', 'Gauge', 'Cpu', 'Wrench', 'ChartColumn'], ['Factory', 'Cog', 'Gauge', 'Cpu', 'Thermometer', 'Cctv'], ['ChartColumn', 'Cog', 'ShieldCheck'], 38),
  startup: set('Rocket', ['Rocket', 'Cloud', 'Code2', 'TrendingUp', 'Lock', 'Users'], ['Lightbulb', 'Code2', 'Cloud', 'Users', 'Smartphone', 'Laptop'], ['Rocket', 'TrendingUp', 'ShieldCheck'], 39),
  // Company
  about: set('Sparkles', ['ShieldCheck', 'Network', 'Cpu', 'Code2', 'Users', 'Lightbulb'], ['Users', 'Lightbulb', 'Code2', 'Network', 'ShieldCheck', 'Cpu'], ['BadgeCheck', 'TrendingUp', 'ShieldCheck'], 41),
  whychoose: set('BadgeCheck', ['BadgeCheck', 'Users', 'ShieldCheck', 'Target', 'Handshake', 'TrendingUp'], ['Users', 'ShieldCheck', 'Target', 'Lightbulb', 'Code2', 'Handshake'], ['BadgeCheck', 'TrendingUp', 'Handshake'], 42),
  mission: set('Target', ['Target', 'ShieldCheck', 'Compass', 'Rocket', 'Globe', 'Lightbulb'], ['Compass', 'Lightbulb', 'Globe', 'Users', 'Target', 'Code2'], ['Target', 'ShieldCheck', 'TrendingUp'], 43),
  values: set('Handshake', ['Handshake', 'Eye', 'Lightbulb', 'Target', 'Users', 'HeartHandshake'], ['Eye', 'Lightbulb', 'Handshake', 'Users', 'Target', 'Compass'], ['HeartHandshake', 'BadgeCheck', 'TrendingUp'], 44),
  careers: set('Users', ['Users', 'Code2', 'Rocket', 'GraduationCap', 'Lightbulb', 'Briefcase'], ['Briefcase', 'Code2', 'Lightbulb', 'GraduationCap', 'Users', 'Network'], ['Rocket', 'TrendingUp', 'Users'], 45),
  training: set('GraduationCap', ['GraduationCap', 'BookOpen', 'Terminal', 'ShieldCheck', 'Network', 'Award'], ['BookOpen', 'Terminal', 'Laptop', 'Network', 'ShieldCheck', 'Users'], ['Award', 'GraduationCap', 'TrendingUp'], 46),
  work: set('Briefcase', ['Radar', 'Activity', 'Bug', 'Droplets', 'Network', 'FileCheck2'], ['Radar', 'Server', 'Bug', 'Droplets', 'Network', 'Cloud'], ['ChartColumn', 'BadgeCheck', 'FileCheck2'], 47),
  contact: set('Mail', ['Mail', 'Phone', 'MessageSquare', 'MapPin', 'Users', 'Send'], ['Mail', 'Phone', 'MessageSquare', 'Users', 'Globe', 'Send'], ['Handshake', 'BadgeCheck', 'Rocket'], 48),
  support: set('LifeBuoy', ['LifeBuoy', 'Headphones', 'Wrench', 'Activity', 'MessageSquare', 'Clock'], ['Headphones', 'MessageSquare', 'Mail', 'Server', 'Activity', 'Wrench'], ['BadgeCheck', 'Clock', 'LifeBuoy'], 49),
  help: set('CircleHelp', ['CircleHelp', 'BookOpen', 'Search', 'MessageSquare', 'Lightbulb', 'FileText'], ['Search', 'BookOpen', 'MessageSquare', 'FileText', 'Users', 'Lightbulb'], ['BadgeCheck', 'Lightbulb', 'CircleHelp'], 50),
  blog: set('Newspaper', ['Newspaper', 'PenLine', 'Megaphone', 'Calendar', 'Rss', 'BookOpen'], ['PenLine', 'Megaphone', 'Calendar', 'BookOpen', 'Users', 'Rss'], ['Newspaper', 'TrendingUp', 'Sparkles'], 51),
  legal: set('FileText', ['FileText', 'Lock', 'Scale', 'Cookie', 'ShieldCheck', 'ClipboardCheck'], ['FileText', 'Scale', 'Cookie', 'Lock', 'Database', 'Users'], ['ShieldCheck', 'FileCheck2', 'BadgeCheck'], 52),
  notfound: set('Compass', ['Compass', 'Search', 'MapPin', 'Route', 'Globe', 'Signpost'], ['Search', 'Compass', 'MapPin', 'Globe', 'Route', 'Signpost'], ['Compass', 'BadgeCheck', 'Rocket'], 53),
  // Products (their interface screens stay; this is the hero art and section backdrop)
  nexora: set('ScanSearch', ['ScanSearch', 'Database', 'Fingerprint', 'Network', 'Radar', 'FileText'], ['Router', 'RadioTower', 'Server', 'Database', 'Globe', 'Smartphone'], ['ScanSearch', 'FileText', 'ShieldCheck'], 61),
  netsight: set('Activity', ['Activity', 'Network', 'Router', 'Server', 'Siren', 'ChartColumn'], ['Router', 'Server', 'Wifi', 'Cloud', 'Cctv', 'Laptop'], ['Activity', 'Siren', 'ChartColumn'], 62),
  panoptix: set('Radar', ['Radar', 'Bug', 'Globe', 'ShieldAlert', 'ListChecks', 'Target'], ['Globe', 'Cloud', 'Server', 'KeyRound', 'Laptop', 'Database'], ['Target', 'ListChecks', 'ShieldCheck'], 63),
  nestedva: set('Bug', ['Bug', 'ScanSearch', 'Terminal', 'FileCheck2', 'ShieldAlert', 'RefreshCw'], ['Globe', 'Code2', 'Server', 'Smartphone', 'Cloud', 'Terminal'], ['FileCheck2', 'RefreshCw', 'ShieldCheck'], 64),
  smms: set('Gauge', ['Gauge', 'Server', 'Bell', 'Activity', 'ClipboardCheck', 'Network'], ['Server', 'Router', 'Database', 'Cloud', 'Wifi', 'Laptop'], ['Bell', 'ClipboardCheck', 'Gauge'], 65),
  aiassistant: set('Bot', ['Bot', 'FileText', 'Search', 'Lock', 'PenLine', 'BookOpen'], ['FileText', 'Mail', 'Database', 'BookOpen', 'Users', 'Search'], ['Bot', 'PenLine', 'Lock'], 66),
}

// Kinds: hero (light, transparent, for the split page hero), flow and hub (dark 16:9 panels), card (dark 4:3 thumbnails).
export const art = (key, kind = 'flow') => `/images/art/${key}-${kind}.webp`
export const artKeys = Object.keys(artManifest)

// Route → artwork topic. Exact paths first, then prefixes (blog posts, new industries and so on); anything else is the 404 art.
const routeKeys = {
  '/products': 'products', '/solutions': 'solutions', '/industries': 'industries',
  '/services/cybersecurity': 'cybersecurity', '/services/network': 'network', '/services/iot': 'iot', '/services/application': 'application', '/services/regulatory': 'regulatory',
  '/industries/government': 'government', '/industries/telecom': 'telecom', '/industries/finance': 'finance', '/industries/enterprise': 'enterprise', '/industries/datacenter': 'datacenter',
  '/industries/healthcare': 'healthcare', '/industries/education': 'education', '/industries/manufacturing': 'manufacturing', '/industries/startup': 'startup',
  '/about': 'about', '/why-choose-us': 'whychoose', '/mission': 'mission', '/core-values': 'values', '/careers': 'careers', '/training': 'training', '/our-work': 'work',
  '/contact': 'contact', '/support': 'support', '/help': 'help', '/blog': 'blog',
  '/privacy': 'legal', '/terms': 'legal', '/compliance': 'legal', '/cookies': 'legal',
  '/products/flowbits-nexora': 'nexora', '/products/netsight360': 'netsight', '/products/panoptix': 'panoptix', '/products/nested-va': 'nestedva', '/products/smms': 'smms', '/products/ai-office-assistant': 'aiassistant',
}
const routePrefixes = [['/blog/', 'blog'], ['/services/', 'solutions'], ['/industries/', 'industries'], ['/products/', 'products']]
export const artKeyFor = (pathname = '/') => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return routeKeys[path] || routePrefixes.find(([p]) => path.startsWith(p))?.[1] || 'notfound'
}
