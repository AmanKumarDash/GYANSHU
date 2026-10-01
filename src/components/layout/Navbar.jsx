import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { productLinks, serviceLinks, industryLinks } from '../../data/sitePages'

const groups = [
  { label: 'Products', to: '/products', links: productLinks },
  { label: 'Services', to: '/solutions', links: serviceLinks },
  { label: 'Industries', to: '/industries', links: industryLinks },
]
const pages = [['About', '/about'], ['Our Work', '/our-work'], ['Training', '/training'], ['Careers', '/careers']]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 80))
  const close = () => setMobileMenuOpen(false)

  return <>
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-ink-950/90 border-b border-white/10 py-4' : 'bg-ink-950/70 backdrop-blur-sm py-5'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center gap-6">
        <Link to="/" onClick={close} className="flex items-center shrink-0" aria-label="Gyanshu Technologies home"><img src="/gyanshu-logo.svg" alt="Gyanshu Technologies Pvt. Ltd." className="w-[190px] md:w-[220px] h-auto" /></Link>
        <nav className="hidden xl:flex items-center gap-6">
          {groups.map((group) => <div key={group.to} className="relative group"><Link to={group.to} className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white py-3">{group.label}<ChevronDown size={14} /></Link><div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute top-full left-0 w-72 max-h-[70vh] overflow-auto rounded-xl border border-white/10 bg-ink-950 p-2 shadow-2xl">{group.links.map((link) => <Link key={link.to} to={link.to} className="block rounded-lg px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5">{link.label}</Link>)}</div></div>)}
          {pages.map(([label, to]) => <Link key={to} to={to} className="text-sm text-white/75 hover:text-white transition-colors">{label}</Link>)}
        </nav>
        <div className="hidden xl:block"><Link to="/contact" className="brand-dark-button rounded-full border border-ember text-ember px-5 py-2.5 text-sm hover:bg-ember hover:text-ink-950 transition-colors">Get Started</Link></div>
        <button className="xl:hidden z-50 text-white p-2" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
    </header>
    <AnimatePresence>{mobileMenuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-ink-950 z-40 overflow-y-auto px-6 pt-24 pb-10"><nav className="max-w-xl mx-auto flex flex-col gap-8">{groups.map((group) => <div key={group.to}><Link to={group.to} onClick={close} className="font-display text-3xl text-white">{group.label}</Link><div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">{group.links.map((link) => <Link key={link.to} to={link.to} onClick={close} className="text-sm text-white/55 hover:text-signal">{link.label}</Link>)}</div></div>)}<div className="grid grid-cols-2 gap-4">{pages.map(([label, to]) => <Link key={to} to={to} onClick={close} className="font-display text-2xl text-white">{label}</Link>)}</div><Link to="/contact" onClick={close} className="brand-contrast rounded-full bg-signal text-ink-950 px-6 py-4 text-center font-semibold">Get Started</Link></nav></motion.div>}</AnimatePresence>
  </>
}
