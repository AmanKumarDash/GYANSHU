import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import AnimatedCounter from '../ui/AnimatedCounter'
import VisualBanner from '../ui/VisualBanner'

export default function Hero() {
  const containerRef = useRef(null)
  const blobRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return
      const { clientX, clientY } = e
      blobRef.current.style.transform = `translate(${clientX - 400}px, ${clientY - 400}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const line1 = "Secure".split(' ')
  const line2 = "critical systems".split(' ')
  const line3 = "with confidence.".split(' ')
  
  let wordIndex = 0

  const renderWords = (words, stroke = false) => {
    return words.map((word, i) => {
      const currentDelay = (wordIndex++) * 0.08
      return (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: currentDelay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`inline-block mr-[2vw] ${stroke ? 'text-stroke opacity-90' : 'text-white'}`}
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
        </motion.span>
      )
    })
  }

  return (
    <section ref={containerRef} className="relative min-h-screen bg-ink-950 overflow-hidden flex flex-col justify-center pt-20 pb-6">
      
      {/* Dynamic Backgrounds */}
      <div 
        ref={blobRef} 
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-signal/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out z-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,85,100,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,100,0.035)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0"></div>
      <div className="grain absolute inset-0 z-[1]"></div>

      <motion.div style={{ opacity, scale, y }} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1.15fr_.85fr] items-center gap-8 mt-0 sm:mt-2">
        <div>
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden bg-white/85 backdrop-blur-md border border-signal/25 text-ink-950 font-mono text-xs px-5 py-3 rounded-md mb-6 flex items-center gap-3 shadow-[0_8px_28px_rgba(54,68,75,0.08)]"
        >
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-signal/20 to-transparent -skew-x-12"
          />
          <div className="relative w-2 h-2 bg-signal rounded-full animate-pulse-slow shadow-[0_0_12px_rgba(0,85,100,0.35)]"></div>
          <span className="relative tracking-wide">Enterprise technology capability, built for operations</span>
          <span className="relative text-signal text-base leading-none">&rarr;</span>
        </motion.div>

        {/* Headlines */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[4.75rem] xl:text-[5.5rem] leading-[0.82] tracking-tight mb-5 w-full perspective-1000" data-cursor="hover">
          <div className="overflow-visible">{renderWords(line1)}</div>
          <div className="overflow-visible">{renderWords(line2, true)}</div>
          <div className="overflow-visible">{renderWords(line3)}</div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="font-body text-mist-900 text-base md:text-lg max-w-2xl mb-6 leading-relaxed"
          data-cursor="text"
        >
          Gyanshu Technology helps enterprises design, secure, automate, monitor, and operate critical technology environments through integrated cybersecurity, infrastructure, software, AI, IoT, and managed operations capability.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-wrap items-center gap-6"
        >
          <MagneticButton className="brand-contrast bg-signal text-ink-950 font-display font-medium px-8 py-4 rounded-full text-lg hover:shadow-[0_0_30px_rgba(0,85,100,0.24)] transition-all">
            Explore Our Capabilities
          </MagneticButton>
          <button className="border border-white/20 text-mist-900 hover:text-white hover:border-white/40 hover:bg-white/5 font-display font-medium px-8 py-4 rounded-full text-lg transition-all" data-cursor="hover">
            How We Deliver
          </button>
        </motion.div>
        </div>
        <div className="w-full max-w-xl mx-auto lg:max-w-none mt-2 lg:mt-0"><VisualBanner page={{ path: '/', title: 'Gyanshu Technology' }} /></div>

      </motion.div>

      {/* Floating Elements & Decorations */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="hidden"
      >
        <svg viewBox="0 0 100 100" width="100" height="100">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
          <text className="font-mono text-[9.5px] fill-white tracking-widest uppercase">
            <textPath href="#circlePath">Cybersecurity · Infrastructure · AI · Cybersecurity · Infrastructure · AI · </textPath>
          </text>
        </svg>
      </motion.div>

      <div className="absolute bottom-8 left-6 md:left-12 z-20 hidden sm:block">
        <div className="font-display flex flex-col gap-1 items-start text-white/80">
          <span className="text-3xl text-signal"><AnimatedCounter end={6} /></span>
          <span className="font-mono text-xs text-mist-900 tracking-wider">Core Service Lines</span>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 z-20"
      >
        <ChevronDown size={24} />
      </motion.div>

      {/* Abstract floating shapes behind content */}
      <div className="hidden">
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="w-64 h-64 border border-signal rounded-full" />
      </div>
      <div className="hidden">
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor"><rect width="100" height="100" className="clip-diagonal"/></svg>
        </motion.div>
      </div>

    </section>
  )
}
