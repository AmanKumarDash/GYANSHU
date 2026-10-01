const base = {
  security: {type:'security',accent:'#005564',label:'Threat telemetry',subtitle:'DETECT / ANALYZE / RESPOND',image:'photo-1516321318423-f06f85e504b3',video:32336446},
  network: {type:'network',accent:'#007b8c',label:'Network topology',subtitle:'LINKS / ROUTES / SIGNAL',image:'photo-1558494949-ef010cbdcc31',video:35402241},
  iot: {type:'iot',accent:'#188d83',label:'Connected devices',subtitle:'SENSORS / EDGE / CONTROL',image:'photo-1581091226825-a6a2a5aee158',video:32386581},
  application: {type:'application',accent:'#586f9e',label:'Application workflow',subtitle:'DESIGN / BUILD / SHIP',image:'photo-1498050108023-c5249f4df085',video:5925286},
  learning: {type:'learning',accent:'#8b7852',label:'Learning journey',subtitle:'LEARN / PRACTICE / GROW',image:'photo-1509062522246-3755977927d7',video:8102889},
  industry: {type:'industry',accent:'#007b8c',label:'Industry operations',subtitle:'SYSTEMS / PEOPLE / SERVICES',image:'photo-1567789884554-0b844b597180',video:32386581},
  product: {type:'product',accent:'#005564',label:'Product intelligence',subtitle:'DATA / INSIGHT / ACTION',image:'photo-1558494949-ef010cbdcc31',video:35402241},
  company: {type:'company',accent:'#005564',label:'People and technology',subtitle:'EXPERTISE / PARTNERSHIP / IMPACT',image:'photo-1521737711867-e3b97375f902',video:8102889},
}
const routeScenes = {
  '/products/ipdr':['Subscriber flow correlation','RECORDS / SESSIONS / EVIDENCE','network','photo-1558494949-ef010cbdcc31',35402241],
  '/products/argos-enms':['Live network operations','NODES / UPTIME / CAPACITY','network','photo-1558494949-ef010cbdcc31',35402241],
  '/products/panoptix':['External asset discovery','ASSETS / EXPOSURE / RESPONSE','security','photo-1516321318423-f06f85e504b3',32336446],
  '/products/vapt':['Vulnerability scan cycle','SCAN / VALIDATE / REPORT','security','photo-1516321318423-f06f85e504b3',5377646],
  '/products/hms':['Connected residence operations','ROOMS / PEOPLE / SERVICES','company','photo-1521737711867-e3b97375f902',8102889],
  '/products/lms':['Digital learning progress','CONTENT / PRACTICE / MASTERY','learning','photo-1509062522246-3755977927d7',8102889],
  '/services/cybersecurity':['Security operations','ASSESS / PROTECT / RESPOND','security','photo-1516321318423-f06f85e504b3',35402241],
  '/services/network':['Resilient network design','CONNECT / MONITOR / OPTIMIZE','network','photo-1558494949-ef010cbdcc31',35402241],
  '/services/iot':['Industrial IoT systems','SENSE / AUTOMATE / IMPROVE','iot','photo-1581091226825-a6a2a5aee158',32386581],
  '/services/application':['Software delivery workflow','DESIGN / BUILD / RELEASE','application','photo-1498050108023-c5249f4df085',5925286],
  '/services/regulatory':['Governance and controls','GOVERN / MEASURE / IMPROVE','security','photo-1516321318423-f06f85e504b3',8102889],
  '/industries/government':['Public service systems','TRUST / CONTINUITY / EVIDENCE','industry','photo-1567789884554-0b844b597180',35402241],
  '/industries/telecom':['Telecom network intelligence','TRAFFIC / SUBSCRIBERS / SERVICE','network','photo-1558494949-ef010cbdcc31',35402241],
  '/industries/finance':['Financial resilience','IDENTITY / CONTROLS / CONTINUITY','security','photo-1516321318423-f06f85e504b3',8102889],
  '/industries/healthcare':['Connected care operations','CARE / DEVICES / AVAILABILITY','iot','photo-1581091226825-a6a2a5aee158',8102889],
  '/industries/education':['Connected campus','LEARN / CONNECT / PROTECT','learning','photo-1509062522246-3755977927d7',8102889],
  '/industries/manufacturing':['Industrial operations','EQUIPMENT / EDGE / INSIGHT','iot','photo-1581091226825-a6a2a5aee158',32386581],
}

export function getScene(page = {}) {
  const path = page.path || '/'
  const route = routeScenes[path]
  let family = route?.[2] || 'company'
  if (!route) {
    if (/cybersecurity|vapt|panoptix|privacy|compliance|regulatory|support|help/.test(path)) family = 'security'
    else if (/network|ipdr|argos|telecom|datacenter/.test(path)) family = 'network'
    else if (/iot|manufacturing/.test(path)) family = 'iot'
    else if (/application|hms/.test(path)) family = 'application'
    else if (/training|education|lms/.test(path)) family = 'learning'
    else if (/industries|government|finance|enterprise|healthcare|startup/.test(path)) family = 'industry'
    else if (/products/.test(path)) family = 'product'
    else if (/work|careers|about|mission|values|choose/.test(path)) family = 'company'
  }
  const profile = base[family]
  const slug = path.replace(/[^a-z0-9]+/gi, '-') || 'home'
  const title = page.title || 'Gyanshu Technology'
  const [label, subtitle, , image, video] = route || []
  return {...profile, id:slug, label:label || (title.length > 22 ? `${title.slice(0,20)}…` : title), subtitle:subtitle || profile.subtitle, videoUrl:`https://videos.pexels.com/video-files/${video || profile.video}/${video || profile.video}-hd_1920_1080_25fps.mp4`, posterUrl:`https://images.unsplash.com/${image || profile.image}?auto=format&fit=crop&w=1200&q=80`}
}
