import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { productLinks, serviceLinks, industryLinks } from '../../data/sitePages'
import { EASE, useIntroReady } from '../../utils/intro'
import Logo from '../ui/Logo'

const groups = [
  { label: 'Products', to: '/products', links: productLinks, blurb: 'Platforms for network intelligence, cyber exposure, and connected operations.' },
  { label: 'Services', to: '/solutions', links: serviceLinks, blurb: 'Cybersecurity, infrastructure, IoT, applications, and compliance expertise.' },
  { label: 'Industries', to: '/industries', links: industryLinks, blurb: 'Secure technology shaped for high-stakes environments.' },
]
const pages = [['About', '/about'], ['Our Work', '/our-work'], ['Training', '/training'], ['Careers', '/careers']]

export default function Navbar() {
  const ready = useIntroReady()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 480 && y > prev && !mobileOpen)
  })
  // Close menus when the route changes (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) { setLastPath(pathname); setOpen(null); setMobileOpen(false) }
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return <>
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      initial={{ y: -90, opacity: 0 }}
      animate={ready ? { y: hidden && !open ? -110 : 0, opacity: 1 } : { y: -90, opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: ready && !scrolled ? 0.35 : 0 }}
      onMouseLeave={() => setOpen(null)}
    >
      <div className={`relative mx-auto flex max-w-[1360px] items-center justify-between gap-6 rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${mobileOpen ? 'border border-white/10 bg-white/[.04]' : scrolled || open ? 'border border-line/80 bg-white/80 shadow-[0_10px_40px_-18px_rgba(12,21,23,.25)] backdrop-blur-xl' : 'border border-transparent bg-transparent'}`}>
        <Link to="/" className="shrink-0" aria-label="Gyanshu Technologies home"><Logo tone={mobileOpen ? 'light' : 'dark'} className="h-9 w-auto sm:h-10" /></Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {groups.map((g) => <div key={g.to} onMouseEnter={() => setOpen(g.label)} className="relative">
            <NavLink to={g.to} onFocus={() => setOpen(g.label)} className={({ isActive }) => `inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] transition-colors ${isActive || open === g.label ? 'text-ink' : 'text-ink/65 hover:text-ink'}`} aria-expanded={open === g.label}>
              {g.label}<ChevronDown size={13} className={`transition-transform duration-300 ${open === g.label ? 'rotate-180' : ''}`} />
            </NavLink>
          </div>)}
          {pages.map(([label, to]) => <NavLink key={to} to={to} onMouseEnter={() => setOpen(null)} className={({ isActive }) => `rounded-full px-3.5 py-2 text-[13.5px] transition-colors ${isActive ? 'text-ink' : 'text-ink/65 hover:text-ink'}`}>{label}</NavLink>)}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn btn-dark hidden !py-1 sm:inline-flex"><span>Get Started</span><span className="btn-chip h-7 w-7"><ArrowUpRight size={14} strokeWidth={2.2} /></span></Link>
          <button className={`relative z-[60] flex h-10 w-10 items-center justify-center rounded-full xl:hidden ${mobileOpen ? 'bg-brand-400 text-ink' : 'bg-ink text-white'}`} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${mobileOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-current transition-all duration-300 ${mobileOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && <MegaMenu key={open} group={groups.find((g) => g.label === open)} onClose={() => setOpen(null)} />}
        </AnimatePresence>
      </div>
    </motion.header>

    <AnimatePresence>
      {mobileOpen && <motion.div className="fixed inset-0 z-[45] overflow-y-auto bg-ink-950 px-6 pb-10 pt-28 text-white xl:hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} data-lenis-prevent>
        <nav className="mx-auto flex max-w-xl flex-col gap-9">
          {groups.map((g, gi) => <motion.div key={g.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + gi * 0.07, duration: 0.6, ease: EASE }}>
            <Link to={g.to} className="font-display text-4xl font-medium tracking-tight">{g.label}</Link>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">{g.links.map((l) => <Link key={l.to} to={l.to} className="text-sm text-white/50 hover:text-brand-300">{l.label.trim()}</Link>)}</div>
          </motion.div>)}
          <motion.div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE }}>
            {pages.map(([label, to]) => <Link key={to} to={to} className="font-display text-2xl tracking-tight">{label}</Link>)}
          </motion.div>
          <Link to="/contact" className="btn btn-brand justify-between !py-2"><span>Get Started</span><span className="btn-chip"><ArrowUpRight size={15} /></span></Link>
        </nav>
      </motion.div>}
    </AnimatePresence>
  </>
}

function MegaMenu({ group, onClose }) {
  return <motion.div
    className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-[28px] border border-line bg-white/95 p-2 shadow-[0_40px_80px_-30px_rgba(12,21,23,.35)] backdrop-blur-xl"
    initial={{ opacity: 0, y: -8, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.99 }} transition={{ duration: 0.35, ease: EASE }}
  >
    <div className="grid grid-cols-[1fr_2fr] gap-2">
      <Link to={group.to} onClick={onClose} className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[22px] bg-ink p-6 text-white">
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-400/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <span className="eyebrow-dark relative w-fit">{group.label}</span>
        <div className="relative">
          <p className="max-w-xs text-[15px] leading-snug text-white/80">{group.blurb}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm text-brand-300">View all <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </div>
      </Link>
      <div className="grid grid-cols-2 content-start gap-1 p-2">
        {group.links.map((l, i) => <motion.div key={l.to} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.025, duration: 0.4, ease: EASE }}>
          <Link to={l.to} onClick={onClose} className="group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-[14px] text-ink/80 transition-colors hover:bg-paper hover:text-ink">
            <span className="flex items-center gap-3"><span className="font-mono text-[10px] text-muted-soft">{String(i + 1).padStart(2, '0')}</span>{l.label.trim()}</span>
            <ArrowUpRight size={14} className="text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>)}
      </div>
    </div>
  </motion.div>
}
