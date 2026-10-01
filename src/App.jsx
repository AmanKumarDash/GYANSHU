import { MotionConfig } from 'framer-motion'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ExperienceHome from './components/sections/ExperienceHome'
import InteriorPage from './components/sections/InteriorPage'
import SplashScreen from './components/ui/SplashScreen'

function HomePage() {
  return <ExperienceHome />
}

function SiteShell() {
  const { pathname } = useLocation()
  const [showSplash, setShowSplash] = useState(true)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), reduceMotion ? 650 : 3350)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return <MotionConfig reducedMotion="user"><div className="relative bg-white font-body text-ink-950 overflow-x-hidden selection:bg-signal selection:text-ink-950"><AnimatePresence>{showSplash && <SplashScreen key="gyanshu-splash" />}</AnimatePresence><ScrollProgressBar /><Navbar /><Routes><Route path="/" element={<HomePage />} /><Route path="*" element={<InteriorPage key={pathname} />} /></Routes><Footer /></div></MotionConfig>
}

export default function App() { return <BrowserRouter><SiteShell /></BrowserRouter> }
