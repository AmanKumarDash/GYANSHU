import { useEffect, useRef } from 'react'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { EASE, EASE_IN_OUT } from '../../utils/intro'

// Brand mark from the brand kit (brand-kit/logo-only.svg, 547×652): ribbon pieces, three bars, four data squares.
const ribbons = [
  ['M28.9852 262.726L363.83 81.2212V183.162L95.2911 325.714V462.464L45.7686 435.085C15.2562 418.154 0 394.711 0 364.756V315.917C2.4628 280.959 4.12044 275.986 28.9852 262.726Z', 'g0'],
  ['M0 455.828V330.193C0 362.893 10.1111 393.103 43.904 408.592L334.821 553.77V651.427L33.7929 507.459C11.2643 495.986 0 478.775 0 455.828Z', 'g1'],
  ['M334.821 651.427V553.63L442.568 506.389V474.067H532.238V529.833C532.238 541.306 526.52 560.007 513.847 566.891L334.821 651.427Z', 'g2'],
  ['M153.309 433.456V354.721C153.309 354.721 439.253 458.32 444.226 474.067C449.199 489.814 442.568 506.389 442.568 506.389C431.959 535.563 398.64 540.646 384.55 536.226L153.309 433.456Z', 'g3'],
  ['M218.786 354.721L532.081 474.067H442.568L153.309 354.721H218.786Z', 'g4'],
]
const bars = [
  ['M305.045 277.644L361.344 245.321V382.9L305.045 359.694V277.644Z', 'g5'],
  ['M392.01 208.026L446.408 179.018V411.908L392.01 394.503V208.026Z', 'g6'],
  ['M474.063 147.524L530.196 121.942V440.915L474.063 423.511V147.524Z', 'g7'],
]
const squares = [[513.848, 56.357, 33.152, '#0B3D3B'], [457.487, 92.824, 26.523, '#14B8A6'], [447.542, 23.206, 39.782, '#14B8A6'], [502.244, 0, 20.826, '#0B3D3B']]
const gradients = [
  ['g0', [-0.0001, 466.343, 387.776, 105.275], [[0, '#063B3A'], [0.673, '#14B8A6']]],
  ['g1', [-0.024, 335.659, 136.622, 696.621], [[0, '#7EE3D9'], [0.389, '#14B8A6'], [1, '#0B3D3B']]],
  ['g2', [532.081, 474.067, 305.686, 527.137], [[0, '#7EE3D9'], [0.318, '#14B8A6'], [1, '#0B3D3B']]],
  ['g3', [298.353, 356.379, 298.353, 532.877], [[0, '#14B8A6'], [1, '#0B3D3B']]],
  ['g4', [342.695, 354.721, 342.695, 474.067], [[0, '#7EE3D9'], [1, '#0B3D3B']]],
  ['g5', [305.045, 247.93, 305.045, 368.496], [[0, '#14B8A6'], [1, '#0B3D3B']]],
  ['g6', [397.812, 179.018, 397.812, 371.924], [[0, '#14B8A6'], [1, '#0B3D3B']]],
  ['g7', [447.36, 146.31, 447.36, 415], [[0, '#14B8A6'], [1, '#0B3D3B']]],
]

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

  const piece = (i) => ({ initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55 * d, delay: (0.05 + i * 0.07) * d, ease: EASE } })
  const wipe = (delay) => ({ initial: { clipPath: 'inset(0 100% 0 0)' }, animate: { clipPath: 'inset(0 0% 0 0)' }, transition: { duration: 0.7 * d, delay: delay * d, ease: EASE_IN_OUT } })

  return <motion.div className="fixed inset-0 z-[200]" role="status" aria-label="Loading Gyanshu Technologies" exit={{ pointerEvents: 'none' }}>
    {/* Trailing deep-teal curtain */}
    <motion.div className="absolute inset-0 bg-brand-900" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: reduce ? 0.2 : 1.05, delay: reduce ? 0 : 0.12, ease: EASE_IN_OUT }} />
    {/* Pearl-white brand panel */}
    <motion.div className="absolute inset-0 overflow-hidden bg-[#F8FCFC] text-brand-900" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: reduce ? 0.2 : 1, ease: EASE_IN_OUT }}>
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(11,61,59,.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/15 blur-[120px]" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 * d, ease: EASE }} />

      <motion.div className="relative flex h-full flex-col justify-between p-5 sm:p-8 lg:p-12" exit={{ y: -120, opacity: 0 }} transition={{ duration: 0.8, ease: EASE_IN_OUT }}>
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[.2em] text-brand-900/55">
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * d, duration: 0.6 }}>From infrastructure to intelligence</motion.span>
          <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 * d, duration: 0.6 }} className="hidden sm:block">Technology · People · Possibilities</motion.span>
        </div>

        <div className="flex flex-col items-center">
          <svg viewBox="0 0 547 652" className="h-24 w-auto overflow-visible sm:h-32 lg:h-36" aria-hidden="true">
            <defs>{gradients.map(([id, [x1, y1, x2, y2], stops]) => <linearGradient key={id} id={`splash-${id}`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">{stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient>)}</defs>
            {ribbons.map(([dPath, g], i) => <motion.path key={g} d={dPath} fill={`url(#splash-${g})`} {...piece(i)} />)}
            {bars.map(([dPath, g], i) => <motion.path key={g} d={dPath} fill={`url(#splash-${g})`} style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 * d, delay: (0.4 + i * 0.08) * d, ease: EASE }} />)}
            {squares.map(([x, y, s, c], i) => <motion.rect key={x} x={x} y={y} width={s} height={s} fill={c} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 380, damping: 14, delay: (0.65 + i * 0.06) * d }} />)}
          </svg>
          <motion.img src="/brand/gyanshu-wordmark.svg" alt="" className="mt-6 w-[16rem] sm:mt-8 sm:w-[24rem] lg:w-[27rem]" {...wipe(0.5)} />
          <motion.img src="/brand/gyanshu-pvt-ltd.svg" alt="" className="mt-3 w-[16rem] sm:mt-4 sm:w-[24rem] lg:w-[27rem]" initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5 * d, delay: 0.85 * d, ease: EASE }} />
          <motion.img src="/brand/gyanshu-tagline.svg" alt="" className="mt-4 w-[15rem] sm:mt-5 sm:w-[22rem] lg:w-[25rem]" {...wipe(0.95)} />
          <span className="sr-only">Gyanshu Technologies Pvt. Ltd. Secure. Intelligent. Connected.</span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <motion.p className="max-w-[14rem] text-left font-mono text-[10px] uppercase leading-relaxed tracking-[.2em] text-brand-900/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 * d, duration: 0.6 }}>A smarter, more secure<span className="text-brand-400"> · </span>connected world</motion.p>
          <span className="font-poster text-[4.5rem] leading-[.8] text-brand-900 sm:text-[7rem] lg:text-[8.5rem]"><span ref={counter}>000</span><span className="text-brand-400">%</span></span>
        </div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-900/10"><div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand-900 via-brand-400 to-brand-300" /></div>
    </motion.div>
  </motion.div>
}
