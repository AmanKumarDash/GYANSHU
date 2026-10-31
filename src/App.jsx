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
import { OG_IMAGE, SITE_URL } from './data/siteConfig'

// Interior and blog pages load on demand so the home page ships a smaller bundle.
const InteriorPage = lazy(() => import('./components/sections/InteriorPage'))
const BlogIndex = lazy(() => import('./components/sections/BlogPages').then((m) => ({ default: m.BlogIndex })))
const BlogArticle = lazy(() => import('./components/sections/BlogPages').then((m) => ({ default: m.BlogArticle })))

const SPLASH_SECONDS = 2.4

const SITE = 'Gyanshu Technologies'
const HOME_TITLE = `${SITE} | AI-Powered Enterprise Engineering Intelligence`
const HOME_DESCRIPTION = 'Gyanshu Technologies delivers cybersecurity, intelligent infrastructure, AI-powered platforms and digital engineering to reduce risk and accelerate growth.'

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

// Create or update a <meta>/<link> tag in <head> (invisible; read by search engines and social previews).
function headTag(tag, key, value, attr, content) {
  let el = document.head.querySelector(`${tag}[${key}="${value}"]`)
  if (!el) { el = document.head.appendChild(document.createElement(tag)); el.setAttribute(key, value) }
  el.setAttribute(attr, content)
}

function useRouteSeo(pathname) {
  // A layout effect runs before page-level effects, so pages can still override these values.
  useLayoutEffect(() => {
    const { title, description, noindex } = seoFor(pathname)
    const resolved = getPage(pathname.replace(/\/$/, '') || '/')
    const url = SITE_URL + (resolved.type === 'redirect' ? resolved.to : pathname.replace(/\/$/, '') || '/')
    document.title = title
    headTag('meta', 'name', 'description', 'content', description)
    headTag('meta', 'name', 'robots', 'content', noindex ? 'noindex' : 'index, follow')
    headTag('link', 'rel', 'canonical', 'href', url)
    headTag('meta', 'property', 'og:title', 'content', title)
    headTag('meta', 'property', 'og:description', 'content', description)
    headTag('meta', 'property', 'og:url', 'content', url)
    headTag('meta', 'property', 'og:image', 'content', SITE_URL + OG_IMAGE)
    headTag('meta', 'name', 'twitter:title', 'content', title)
    headTag('meta', 'name', 'twitter:description', 'content', description)
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
