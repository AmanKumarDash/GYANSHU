import { useEffect, useRef } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { EASE, EASE_IN_OUT } from '../../utils/intro'

const markPaths = [
  'M4 31 43 8v36L15 60v21L4 75z',
  'M24 66 43 55v19L67 60v27L43 101 24 90z',
  'M52 40 66 32v32l-14 8zm20-12 12-7v47L72 76zm19-11 11-6v61L91 78z',
  'm20 63 18-11 39 23-17 10z',
]
const word = 'GYANSHU'.split('')

export default function SplashScreen({ duration = 2.4 }) {
  const reduce = useReducedMotion()
  const counter = useRef(null)
  const bar = useRef(null)
  const d = reduce ? 0.2 : 1

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: duration * 0.92 * d,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (counter.current) counter.current.textContent = String(Math.round(v)).padStart(3, '0')
        if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`
      },
    })
    return () => controls.stop()
  }, [duration, d])

  return <motion.div className="fixed inset-0 z-[200]" role="status" aria-label="Loading Gyanshu Technologies" exit={{ pointerEvents: 'none' }}>
    {/* Trailing brand curtain */}
    <motion.div className="absolute inset-0 bg-brand-700" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: reduce ? 0.2 : 1.05, delay: reduce ? 0 : 0.12, ease: EASE_IN_OUT }} />
    {/* Main ink panel */}
    <motion.div className="grain absolute inset-0 overflow-hidden bg-ink-950 text-white" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: reduce ? 0.2 : 1, ease: EASE_IN_OUT }}>
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-[120px]" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 * d, ease: EASE }} />

      <motion.div className="relative flex h-full flex-col justify-between p-5 sm:p-8 lg:p-12" exit={{ y: -120, opacity: 0 }} transition={{ duration: 0.8, ease: EASE_IN_OUT }}>
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[.2em] text-white/40">
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * d, duration: 0.6 }}>Gyanshu Technologies Pvt. Ltd.</motion.span>
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 * d, duration: 0.6 }} className="hidden sm:block">Secure · Connect · Operate</motion.span>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <svg viewBox="0 0 106 104" className="h-14 w-14 overflow-visible sm:h-20 sm:w-20" aria-hidden="true">
            <defs><linearGradient id="splash-mark" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5fd8c6" /><stop offset="1" stopColor="#0a8a8f" /></linearGradient></defs>
            <g fill="url(#splash-mark)" stroke="#5fd8c6" strokeWidth="1.2" strokeLinejoin="round">
              {markPaths.slice(0, 3).map((p, i) => <motion.path key={p} d={p} transform={i === 1 ? 'translate(0 -8)' : undefined} initial={{ pathLength: 0, fillOpacity: 0 }} animate={{ pathLength: 1, fillOpacity: 1 }} transition={{ pathLength: { duration: 0.9 * d, delay: (0.15 + i * 0.15) * d, ease: 'easeInOut' }, fillOpacity: { duration: 0.5 * d, delay: (0.75 + i * 0.12) * d } }} />)}
              <motion.path d={markPaths[3]} fill="#bff3ea" stroke="#bff3ea" initial={{ pathLength: 0, fillOpacity: 0 }} animate={{ pathLength: 1, fillOpacity: 1 }} transition={{ pathLength: { duration: 0.7 * d, delay: 0.6 * d }, fillOpacity: { duration: 0.4 * d, delay: 1.05 * d } }} />
            </g>
            {[[73, 1], [87, 13], [101, 1]].map(([x, y], i) => <motion.rect key={x + '-' + y} x={x} y={y} width="8" height="8" rx="1" fill="#26c8b2" style={{ transformOrigin: `${x + 4}px ${y + 4}px` }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 14, delay: (1 + i * 0.12) * d }} />)}
          </svg>
          <div>
            <div className="flex overflow-hidden font-[Roboto] text-[2.6rem] font-extrabold leading-none tracking-[-.04em] sm:text-[4.4rem]">
              {word.map((ch, i) => <motion.span key={i} className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9 * d, delay: (0.55 + i * 0.05) * d, ease: EASE }}>{ch}</motion.span>)}
            </div>
            <div className="mt-2 overflow-hidden">
              <motion.p className="font-mono text-[9px] uppercase tracking-[.42em] text-brand-300/80 sm:text-[11px]" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8 * d, delay: 1.05 * d, ease: EASE }}>Technologies Pvt. Ltd.</motion.p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <motion.p className="max-w-[14rem] font-mono text-[10px] uppercase leading-relaxed tracking-[.2em] text-white/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 * d, duration: 0.6 }}>Intelligence<span className="text-brand-400"> · </span>Trust<span className="text-brand-400"> · </span>Innovation</motion.p>
          <span className="font-poster text-[5.5rem] leading-[.8] text-white sm:text-[9rem] lg:text-[11rem]"><span ref={counter}>000</span><span className="text-brand-400">%</span></span>
        </div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10"><div ref={bar} className="h-full origin-left scale-x-0 bg-brand-400 shadow-[0_0_14px_#26c8b2]" /></div>
    </motion.div>
  </motion.div>
}
