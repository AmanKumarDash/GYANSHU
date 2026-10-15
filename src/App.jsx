import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ExperienceHome from './components/sections/ExperienceHome'
import InteriorPage from './components/sections/InteriorPage'
import { BlogArticle, BlogIndex } from './components/sections/BlogPages'
import SplashScreen from './components/ui/SplashScreen'
import { IntroContext } from './utils/intro'

const SPLASH_SECONDS = 2.4

function SiteShell() {
  const { pathname, hash } = useLocation()
  const reduceMotion = useReducedMotion()
  const [showSplash, setShowSplash] = useState(true)
  const lenis = useRef(null)

  useEffect(() => {
    if (reduceMotion) return undefined
    const instance = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: { offset: -80 } })
    lenis.current = instance
    window.lenis = instance
    let frame = requestAnimationFrame(function raf(time) { instance.raf(time); frame = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(frame); instance.destroy(); lenis.current = null; window.lenis = undefined }
  }, [reduceMotion])

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), reduceMotion ? 500 : SPLASH_SECONDS * 1000)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  useEffect(() => {
    if (showSplash) lenis.current?.stop()
    else lenis.current?.start()
    document.documentElement.style.overflow = showSplash ? 'hidden' : ''
  }, [showSplash])

  useEffect(() => {
    if (hash) return
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return <MotionConfig reducedMotion="user">
    <IntroContext.Provider value={!showSplash}>
      <div className="relative min-h-screen bg-paper font-body text-ink">
        <AnimatePresence>{showSplash && <SplashScreen key="splash" duration={SPLASH_SECONDS} />}</AnimatePresence>
        <ScrollProgressBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<ExperienceHome />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />
          <Route path="*" element={<InteriorPage key={pathname} />} />
        </Routes>
        <Footer />
      </div>
    </IntroContext.Provider>
  </MotionConfig>
}

export default function App() { return <BrowserRouter><SiteShell /></BrowserRouter> }
