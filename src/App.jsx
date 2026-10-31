import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import ScrollProgressBar from './components/ui/ScrollProgressBar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ExperienceHome from './components/sections/ExperienceHome'
import SplashScreen from './components/ui/SplashScreen'
import { IntroContext } from './utils/intro'
import { getPage } from './data/sitePages'
import { publishedBlogPosts } from './data/blogPosts'

// Interior and blog pages load on demand so the home page ships a smaller bundle.
const InteriorPage = lazy(() => import('./components/sections/InteriorPage'))
const BlogIndex = lazy(() => import('./components/sections/BlogPages').then((m) => ({ default: m.BlogIndex })))
const BlogArticle = lazy(() => import('./components/sections/BlogPages').then((m) => ({ default: m.BlogArticle })))

const SPLASH_SECONDS = 2.4

const SITE = 'Gyanshu Technologies'
const HOME_TITLE = `${SITE} | Secure Digital Operations`
const HOME_DESCRIPTION = 'Gyanshu Technologies helps organizations secure, connect, and operate critical technology environments.'

// Title, description and robots tag for a route. Product pages with their own SEO copy refine this afterwards.
function seoFor(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path === '/') return { title: HOME_TITLE, description: HOME_DESCRIPTION }
  if (path === '/blog') return { title: `Blog & Updates | ${SITE}`, description: 'Product news, documentation, offers, events and milestones from the Gyanshu team.' }
  if (path.startsWith('/blog/')) {
    const post = publishedBlogPosts.find((p) => `/blog/${p.slug}` === path)
    return post ? { title: `${post.title} | ${SITE}`, description: post.excerpt } : { title: `Post not found | ${SITE}`, description: HOME_DESCRIPTION, noindex: true }
  }
  const page = getPage(path)
  if (page.type === 'redirect') return seoFor(page.to)
  if (page.type === 'missing') return { title: `Page not found | ${SITE}`, description: page.intro, noindex: true }
  const description = page.type === 'product' || page.type === 'industry' ? page.intro : `${page.subtitle} ${page.intro}`
  return { title: `${page.title} | ${SITE}`, description: description.length > 160 ? `${description.slice(0, 157).replace(/\s+\S*$/, '')}…` : description }
}

function useRouteSeo(pathname) {
  // A layout effect runs before page-level effects, so pages can still override these values.
  useLayoutEffect(() => {
    const { title, description, noindex } = seoFor(pathname)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    let robots = document.querySelector('meta[name="robots"]')
    if (noindex && !robots) robots = document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'robots' }))
    if (robots) robots.content = noindex ? 'noindex' : 'index, follow'
  }, [pathname])
}

function SiteShell() {
  const { pathname, hash } = useLocation()
  const reduceMotion = useReducedMotion()
  const [showSplash, setShowSplash] = useState(true)
  const lenis = useRef(null)
  useRouteSeo(pathname)

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
        <a href="#main-content" className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <AnimatePresence>{showSplash && <SplashScreen key="splash" duration={SPLASH_SECONDS} />}</AnimatePresence>
        <ScrollProgressBar />
        <Navbar />
        <div id="main-content" tabIndex={-1} className="outline-none">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<ExperienceHome />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="*" element={<InteriorPage key={pathname} />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </IntroContext.Provider>
  </MotionConfig>
}

export default function App() { return <BrowserRouter><SiteShell /></BrowserRouter> }
