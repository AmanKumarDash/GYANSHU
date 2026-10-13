import { motion, useReducedMotion } from 'framer-motion'
import { getScene } from '../../data/visualScenes'

function SceneArt({ scene }) {
  const center = scene.type === 'iot' ? 'M130 58a25 25 0 1 0 0 50 25 25 0 1 0 0-50Z' : scene.type === 'learning' ? 'M102 62q28-18 56 0v47q-28-18-56 0Zm56 0q28-18 56 0v47q-28-18-56 0Z' : scene.type === 'application' ? 'M91 62h122v85H91z' : scene.type === 'network' ? 'M150 75 94 119m56-44 56 44m-56-44v74m-56-30 56 30 56-30' : 'M150 55 195 72v35c0 27-19 47-45 59-26-12-45-32-45-59V72z'
  const accent = '#5fd8c6'
  return <svg viewBox="0 0 300 230" className="h-full w-full" fill="none" aria-hidden="true">
    <defs><radialGradient id={`glow-${scene.id}`}><stop stopColor={accent} stopOpacity=".28" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient></defs>
    <circle cx="150" cy="112" r="104" fill={`url(#glow-${scene.id})`} />
    {[68, 92, 116].map((radius, index) => <motion.circle key={radius} cx="150" cy="112" r={radius} stroke={accent} strokeOpacity={index === 0 ? '.4' : '.15'} strokeDasharray={index === 1 ? '3 7' : 'none'} animate={{ rotate: index % 2 ? 360 : -360 }} style={{ transformOrigin: '150px 112px' }} transition={{ duration: 35 + index * 9, repeat: Infinity, ease: 'linear' }} />)}
    <motion.g animate={{ y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
      <path d={center} fill="rgba(7,13,15,.75)" stroke={accent} strokeWidth="1.6" />
      {scene.type === 'network' && <><circle cx="150" cy="75" r="7" fill={accent} /><circle cx="94" cy="119" r="6" fill="#fff" /><circle cx="206" cy="119" r="6" fill="#fff" /><circle cx="150" cy="149" r="6" fill="#fff" /></>}
      {scene.type === 'iot' && <><rect x="116" y="68" width="28" height="31" rx="5" stroke={accent} strokeWidth="2" /><path d="M120 110h20m-10 0v10m-20 0h40" stroke={accent} strokeWidth="2" strokeLinecap="round" /><circle cx="130" cy="83" r="4" fill={accent} /></>}
      {scene.type === 'application' && <><path d="M91 78h122" stroke={accent} /><circle cx="103" cy="70" r="2" fill={accent} /><path d="M110 96h42m-42 11h78m-78 11h60m-60 11h38" stroke="#fff" strokeOpacity=".65" strokeWidth="3" strokeLinecap="round" /></>}
      {scene.type === 'learning' && <><path d="M117 81h26m-26 9h17m23-9h27m-27 9h18" stroke={accent} strokeWidth="2" strokeLinecap="round" /><path d="m137 118 9 9 19-20" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></>}
      {scene.type === 'security' && <><path d="M150 82v17m-8-1v-8a8 8 0 0 1 16 0v8" stroke={accent} strokeWidth="2.5" strokeLinecap="round" /><rect x="136" y="98" width="28" height="21" rx="4" stroke={accent} strokeWidth="2.5" /><circle cx="150" cy="107" r="2" fill={accent} /></>}
      {scene.type === 'product' && <><circle cx="150" cy="96" r="18" stroke={accent} strokeWidth="2" /><path d="M139 96h22m-11-11v22" stroke={accent} strokeWidth="2" /><path d="M124 129h52" stroke="#fff" strokeOpacity=".65" strokeWidth="3" strokeLinecap="round" /></>}
      {scene.type === 'industry' && <><path d="M112 124V96l20-12 20 12v28m0 0V82l21 12v30m-61 0h81" stroke={accent} strokeWidth="2" /><path d="M123 103h5m-5 10h5m36-8h6m-6 10h6" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></>}
      {scene.type === 'company' && <><circle cx="150" cy="89" r="14" stroke={accent} strokeWidth="2" /><circle cx="127" cy="113" r="10" stroke="#fff" strokeWidth="2" /><circle cx="173" cy="113" r="10" stroke="#fff" strokeWidth="2" /><path d="M150 104v11m-15-5 8 5m22-5-8 5" stroke={accent} strokeWidth="2" /></>}
    </motion.g>
  </svg>
}

export default function VisualBanner({ page, className = '' }) {
  const scene = getScene(page)
  const reduce = useReducedMotion()
  return <div className={`grain relative isolate h-full w-full overflow-hidden bg-ink-950 ${className}`} aria-label={`Video banner: ${scene.label}`} role="img">
    <img src={scene.posterUrl.replace('w=1200', 'w=2000')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
    {!reduce && <video key={scene.videoUrl} autoPlay loop muted playsInline preload="none" poster={scene.posterUrl} className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen"><source src={scene.videoUrl} type="video/mp4" /></video>}
    <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/45 to-ink-950/20" />
    <div className="dot-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(90deg,transparent,black)]" />
    <div className="absolute left-6 top-6 z-10 md:left-9 md:top-9">
      <span className="eyebrow-dark"><span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-brand-400" /></span>Live system view</span>
      <p className="mt-4 font-display text-2xl font-medium tracking-[-.02em] text-white md:text-3xl">{scene.label}</p>
    </div>
    <motion.div className="absolute bottom-0 right-0 top-0 hidden w-[46%] items-center justify-center md:flex" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
      <div className="h-[78%] w-full max-w-[420px]"><SceneArt scene={scene} /></div>
    </motion.div>
    <div className="absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-3 md:inset-x-9 md:bottom-8">
      <span className="font-mono text-[10.5px] uppercase tracking-[.2em] text-white/50">{scene.subtitle}</span>
      <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[.2em] text-brand-300"><span className="h-1.5 w-1.5 rounded-full bg-brand-400" />Signal active</span>
    </div>
  </div>
}
