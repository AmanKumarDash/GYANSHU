import { motion, useReducedMotion } from 'framer-motion'

const markPaths = [
  'M4 31 43 8v36L15 60v21L4 75z',
  'M24 66 43 55v19L67 60v27L43 101 24 90z',
  'M52 40 66 32v32l-14 8zm20-12 12-7v47L72 76zm19-11 11-6v61L91 78z',
  'm20 63 18-11 39 23-17 10z',
]

export default function SplashScreen() {
  const reduceMotion = useReducedMotion()
  const pace = reduceMotion ? 0.18 : 1
  const duration = (seconds) => seconds * pace
  const delay = (seconds) => seconds * pace
  return <motion.div className="brand-splash fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#032f38]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:1.025}} transition={{duration:reduceMotion ? .12 : .35}} role="status" aria-label="Gyanshu Technologies">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(26,164,164,.28),transparent_38%),radial-gradient(ellipse_at_80%_15%,rgba(63,174,198,.18),transparent_34%),linear-gradient(145deg,#032f38,#005564_62%,#073f4b)]"/>
    <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(76vw,42rem)] w-[min(76vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#80dfd5]/15" initial={{scale:.72,opacity:0}} animate={{scale:[.72,1.04,1],opacity:[0,.7,.25]}} transition={{duration:duration(2.7),ease:'easeOut'}}/>
    <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(57vw,31rem)] w-[min(57vw,31rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#74d7d0]/20" animate={reduceMotion?{}:{rotate:360}} transition={{duration:42,repeat:Infinity,ease:'linear'}}/>
    <div className="pointer-events-none absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(rgba(126,222,216,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(126,222,216,.12) 1px,transparent 1px)',backgroundSize:'70px 70px',maskImage:'radial-gradient(ellipse at center,black,transparent 72%)'}}/>

    <motion.svg viewBox="0 0 470 110" className="relative z-10 w-[min(92vw,660px)] overflow-visible" role="img" aria-label="Gyanshu Technologies Pvt. Ltd.">
      <defs>
        <linearGradient id="gyanshu-splash-mark" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#52e0cd"/><stop offset=".52" stopColor="#14aa9e"/><stop offset="1" stopColor="#005564"/></linearGradient>
        <linearGradient id="gyanshu-splash-sweep" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#fff" stopOpacity="0"/><stop offset=".5" stopColor="#a5fff2" stopOpacity=".9"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
        <clipPath id="gyanshu-splash-wordmark"><motion.rect x="122" y="10" height="48" initial={{width:0}} animate={{width:260}} transition={{duration:duration(.82),delay:delay(1.05),ease:[.18,.72,.22,1]}}/></clipPath>
      </defs>

      <motion.g fill="url(#gyanshu-splash-mark)" stroke="#7af0df" strokeWidth="1.35" strokeLinejoin="round">
        {markPaths.slice(0,3).map((d,i)=><motion.path key={d} d={d} transform={i===1?'translate(0 -8)':undefined} pathLength={1} strokeDasharray="1" initial={{pathLength:0,fillOpacity:0,opacity:.5}} animate={{pathLength:1,fillOpacity:1,opacity:1}} transition={{pathLength:{duration:duration(.82),delay:delay(.14+i*.18),ease:'easeInOut'},fillOpacity:{duration:duration(.38),delay:delay(.7+i*.16)},opacity:{duration:duration(.25),delay:delay(.14+i*.18)}}}/>)}
        <motion.path d={markPaths[3]} fill="#7ee9dc" stroke="#c5fff5" pathLength={1} strokeDasharray="1" initial={{pathLength:0,fillOpacity:0,opacity:.4}} animate={{pathLength:1,fillOpacity:1,opacity:1}} transition={{pathLength:{duration:duration(.7),delay:delay(.62),ease:'easeInOut'},fillOpacity:{duration:duration(.3),delay:delay(1.02)}}}/>
      </motion.g>
      <g fill="#20c8b4">
        {[[73,1],[87,13],[101,1]].map(([x,y],i)=><motion.rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} style={{transformOrigin:`${x+4}px ${y+4}px`}} transition={{type:'spring',stiffness:320,damping:15,delay:delay(.95+i*.14)}}/>)}
      </g>
      <text x="126" y="51" fill="#f4ffff" fontFamily="Roboto,Arial,sans-serif" fontSize="39" fontWeight="800" letterSpacing="-1.6" clipPath="url(#gyanshu-splash-wordmark)">GYANSHU</text>
      <motion.text x="128" y="76" fill="#9fe9df" fontFamily="Roboto,Arial,sans-serif" fontSize="12" fontWeight="700" letterSpacing="4.1" initial={{opacity:0,letterSpacing:8}} animate={{opacity:1,letterSpacing:4.1}} transition={{duration:duration(.55),delay:delay(1.72),ease:'easeOut'}}>TECHNOLOGIES PVT. LTD.</motion.text>

      <motion.rect x="-42" y="-15" width="24" height="140" rx="12" fill="url(#gyanshu-splash-sweep)" filter="blur(3px)" initial={{x:-42,opacity:0}} animate={{x:[-42,190,490],opacity:[0,.85,0]}} transition={{duration:duration(1.1),delay:delay(2.12),ease:'easeInOut'}}/>
    </motion.svg>
    <motion.p className="absolute bottom-12 font-mono text-[9px] uppercase tracking-[.38em] text-[#a2dad6]/55" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:duration(.4),delay:delay(2)}}>Intelligence · Trust · Innovation</motion.p>
    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10"><motion.div className="h-full origin-left bg-gradient-to-r from-[#005564] via-[#42d1c3] to-[#95edf0] shadow-[0_0_14px_#42d1c3]" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:duration(2.85),ease:'linear'}}/></div>
  </motion.div>
}
