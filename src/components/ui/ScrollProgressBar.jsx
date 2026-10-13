import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-brand-500 to-brand-400"
      style={{ scaleX }}
    />
  )
}
