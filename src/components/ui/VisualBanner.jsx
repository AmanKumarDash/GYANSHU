import { motion, useReducedMotion } from 'framer-motion'
import { getScene } from '../../data/visualScenes'

const float = { y: [0, -9, 0] }

function SceneArt({ scene, compact = false }) {
  const center = scene.type === 'iot' ? 'M130 58a25 25 0 1 0 0 50 25 25 0 1 0 0-50Z' : scene.type === 'learning' ? 'M102 62q28-18 56 0v47q-28-18-56 0Zm56 0q28-18 56 0v47q-28-18-56 0Z' : scene.type === 'application' ? 'M91 62h122v85H91z' : scene.type === 'network' ? 'M150 75 94 119m56-44 56 44m-56-44v74m-56-30 56 30 56-30' : 'M150 55 195 72v35c0 27-19 47-45 59-26-12-45-32-45-59V72z'
  return <svg viewBox="0 0 300 230" className="w-full h-full" fill="none" aria-hidden="true">
    <defs><radialGradient id={`glow-${scene.id}`}><stop stopColor={scene.accent} stopOpacity=".3"/><stop offset="1" stopColor={scene.accent} stopOpacity="0"/></radialGradient><linearGradient id={`stroke-${scene.id}`} x1="70" y1="40" x2="230" y2="190"><stop stopColor={scene.accent}/><stop offset="1" stopColor="#fff" stopOpacity=".25"/></linearGradient></defs>
    <circle cx="150" cy="112" r="100" fill={`url(#glow-${scene.id})`} />
    {[68, 92, 116].map((radius, index) => <motion.circle key={radius} cx="150" cy="112" r={radius} stroke={scene.accent} strokeOpacity={index === 0 ? '.34' : '.13'} strokeDasharray={index === 1 ? '3 7' : 'none'} animate={{ rotate: index % 2 ? 360 : -360 }} style={{ transformOrigin: '150px 112px' }} transition={{ duration: 35 + index * 9, repeat: Infinity, ease: 'linear' }} />)}
    <motion.g animate={float} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
      <path d={center} fill="#101712" stroke={`url(#stroke-${scene.id})`} strokeWidth="2" />
      {scene.type === 'network' && <><circle cx="150" cy="75" r="8" fill={scene.accent}/><circle cx="94" cy="119" r="7" fill="#e6f3ff"/><circle cx="206" cy="119" r="7" fill="#e6f3ff"/><circle cx="150" cy="149" r="7" fill="#e6f3ff"/></>}
      {scene.type === 'iot' && <><rect x="116" y="68" width="28" height="31" rx="5" stroke={scene.accent} strokeWidth="2"/><path d="M120 110h20m-10 0v10m-20 0h40" stroke={scene.accent} strokeWidth="2" strokeLinecap="round"/><circle cx="130" cy="83" r="4" fill={scene.accent}/></>}
      {scene.type === 'application' && <><path d="M91 78h122" stroke={scene.accent}/><circle cx="103" cy="70" r="2" fill={scene.accent}/><path d="M110 96h42m-42 11h78m-78 11h60m-60 11h38" stroke="#dff3f0" strokeOpacity=".65" strokeWidth="3" strokeLinecap="round"/></>}
      {scene.type === 'learning' && <><path d="M117 81h26m-26 9h17m23-9h27m-27 9h18" stroke={scene.accent} strokeWidth="2" strokeLinecap="round"/><path d="m137 118 9 9 19-20" stroke="#e6f3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></>}
      {scene.type === 'security' && <><path d="M150 82v17m-8-1v-8a8 8 0 0 1 16 0v8" stroke={scene.accent} strokeWidth="2.5" strokeLinecap="round"/><rect x="136" y="98" width="28" height="21" rx="4" stroke={scene.accent} strokeWidth="2.5"/><circle cx="150" cy="107" r="2" fill={scene.accent}/></>}
      {scene.type === 'product' && <><circle cx="150" cy="96" r="18" stroke={scene.accent} strokeWidth="2"/><path d="M139 96h22m-11-11v22" stroke={scene.accent} strokeWidth="2"/><path d="M124 129h52" stroke="#dff3f0" strokeOpacity=".65" strokeWidth="3" strokeLinecap="round"/></>}
      {scene.type === 'industry' && <><path d="M112 124V96l20-12 20 12v28m0 0V82l21 12v30m-61 0h81" stroke={scene.accent} strokeWidth="2"/><path d="M123 103h5m-5 10h5m36-8h6m-6 10h6" stroke="#e6f3ff" strokeWidth="3" strokeLinecap="round"/></>}
      {scene.type === 'company' && <><circle cx="150" cy="89" r="14" stroke={scene.accent} strokeWidth="2"/><circle cx="127" cy="113" r="10" stroke="#dff3f0" strokeWidth="2"/><circle cx="173" cy="113" r="10" stroke="#dff3f0" strokeWidth="2"/><path d="M150 104v11m-15-5 8 5m22-5-8 5" stroke={scene.accent} strokeWidth="2"/></>}
    </motion.g>
    {!compact && <>
      <motion.g animate={{ y: [0, -5, 0], opacity: [.65, 1, .65] }} transition={{ duration: 3.8, repeat: Infinity }}><rect x="21" y="35" width="88" height="38" rx="8" fill="#0a100e" stroke="white" strokeOpacity=".13"/><circle cx="35" cy="49" r="4" fill={scene.accent}/><path d="M48 49h48M35 61h45" stroke="white" strokeOpacity=".32" strokeWidth="2" strokeLinecap="round"/></motion.g>
      <motion.g animate={{ y: [0, 5, 0], opacity: [.6, 1, .6] }} transition={{ duration: 4.2, repeat: Infinity, delay: .5 }}><rect x="191" y="149" width="86" height="40" rx="8" fill="#0a100e" stroke="white" strokeOpacity=".13"/><path d="M204 175v-9m9 9v-17m9 17v-12m9 12v-22m9 22v-14" stroke={scene.accent} strokeWidth="3" strokeLinecap="round"/></motion.g>
      <motion.circle cx="217" cy="63" r="5" fill={scene.accent} animate={{ scale: [1, 1.6, 1], opacity: [1, .5, 1] }} transition={{ duration: 2, repeat: Infinity }}/>
      <path d="M36 164h45m-45 9h29" stroke="white" strokeOpacity=".2" strokeWidth="2" strokeLinecap="round"/>
    </>}
  </svg>
}

export default function VisualBanner({ page, compact = false }) {
  const scene = getScene(page)
  const reducedMotion = useReducedMotion()
  return <div className={`visual-banner relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0b110f] ${compact ? 'p-2' : 'min-h-[300px] md:min-h-[390px] p-4 md:p-6'}`} style={{ '--scene-accent': scene.accent }} aria-label={`Video banner: ${scene.label}`} role="img">
    <img src={scene.posterUrl} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-80" />
    {!reducedMotion && <video key={scene.videoUrl} autoPlay loop muted playsInline preload="none" poster={scene.posterUrl} className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"><source src={scene.videoUrl} type="video/mp4" /></video>}
    <div className="absolute inset-0 bg-gradient-to-br from-[#003e49]/40 via-[#005564]/10 to-[#13282e]/40" />
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${scene.accent}18 1px, transparent 1px), linear-gradient(90deg, ${scene.accent}18 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    <div className="absolute left-5 top-5 z-10"><span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.18em] text-white/55"><i className="w-1.5 h-1.5 rounded-full bg-[var(--scene-accent)] animate-pulse" />Live system view</span><p className="font-mono text-xs text-white mt-2">{scene.label}</p></div>
    <motion.div className="absolute inset-4 md:inset-8 top-8 md:top-10" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, ease: 'easeOut' }}><SceneArt scene={scene} compact={compact} /></motion.div>
    {!compact && <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-3"><span className="font-mono text-[9px] uppercase tracking-widest text-white/35">{scene.subtitle}</span><span className="font-mono text-[9px] text-[var(--scene-accent)]">SIGNAL ACTIVE</span></div>}
  </div>
}
