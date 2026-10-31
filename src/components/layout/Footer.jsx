import { Link } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import Logo from '../ui/Logo'
import { productLinks } from '../../data/sitePages'

const footerGroups = [
  { title: 'Products', links: [...productLinks.map((l) => [l.label.trim(), l.to]), ['All products', '/products']] },
  { title: 'Services', links: [['Cybersecurity', '/services/cybersecurity'], ['Network Infrastructure', '/services/network'], ['IoT Solutions', '/services/iot'], ['Application Development', '/services/application'], ['Regulatory Compliance', '/services/regulatory'], ['Training', '/training']] },
  { title: 'Company', links: [['About Gyanshu', '/about'], ['Why Choose Us', '/why-choose-us'], ['Our Mission', '/mission'], ['Core Values', '/core-values'], ['Careers', '/careers'], ['Contact', '/contact']] },
  { title: 'Explore', links: [['Industries', '/industries'], ['Our Work', '/our-work'], ['Blog & Updates', '/blog'], ['Support', '/support'], ['Help & FAQ', '/help']] },
]
// Simple brand glyphs (the icon library ships no brand logos).
const glyph = (d) => function Glyph() { return <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d={d} /></svg> }
const Linkedin = glyph('M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4z')
const Facebook = glyph('M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.45c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98v2.2H7.8v3h2.6V21z')
const XLogo = glyph('M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.17h1.7L7.4 4.74H5.58z')
const Youtube = glyph('M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z')
const Instagram = glyph('M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1zM17 5.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 2c-2.7 0-3.05.01-4.1.06-1.07.05-1.8.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.36-.47 2.43C2.01 8.95 2 9.3 2 12s.01 3.05.06 4.12c.05 1.06.22 1.79.47 2.42.26.66.6 1.22 1.15 1.77.55.56 1.11.9 1.77 1.16.64.24 1.36.41 2.43.46 1.06.05 1.4.07 4.12.07s3.06-.02 4.12-.07c1.06-.05 1.79-.22 2.42-.46a4.9 4.9 0 0 0 1.77-1.16c.56-.55.9-1.11 1.16-1.77.24-.63.41-1.36.46-2.42.05-1.07.07-1.4.07-4.12s-.02-3.05-.07-4.12c-.05-1.07-.22-1.79-.46-2.43a4.9 4.9 0 0 0-1.16-1.77A4.9 4.9 0 0 0 18.54 2.53c-.63-.25-1.36-.42-2.42-.47C15.05 2.01 14.7 2 12 2zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.2 1.86.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.35.3.88.34 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.2 1.5-.34 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.35.14-.88.3-1.86.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.2-1.86-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.35-.3-.88-.34-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.2-1.5.34-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.35-.14.88-.3 1.86-.34C9.01 3.81 9.33 3.8 12 3.8z')
// Add the company's profile URLs here (e.g. https://www.linkedin.com/company/<handle>).
// Icons without a URL still show, but are not clickable until one is added.
const socials = [['LinkedIn', '', Linkedin], ['Facebook', '', Facebook], ['X', '', XLogo], ['YouTube', '', Youtube], ['Instagram', '', Instagram]]

export default function Footer() {
  return <footer className="relative overflow-hidden bg-ink-950 text-white">
    <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
    <div className="shell relative pt-14 sm:pt-16 lg:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
        <div>
          <Link to="/" aria-label="Gyanshu Technologies home"><Logo tone="light" full className="h-20 w-auto sm:h-24" /></Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">Secure, automate, monitor, and operate critical technology environments with confidence.</p>
          <div className="mt-6 flex flex-col gap-2">
            <a href="mailto:Support.gyanshu@gmail.com" className="group inline-flex w-fit items-center gap-2 font-display text-xl tracking-tight text-white transition-colors hover:text-brand-300 md:text-2xl">Support.gyanshu@gmail.com<ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            <a href="tel:+919040961361" className="w-fit text-white/55 transition-colors hover:text-white">+91 90409 61361</a>
            <p className="text-white/50">India</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-[15px] text-white/70">Connect with us</span>
            {socials.map(([label, href, Icon]) => href
              ? <a key={label} aria-label={`Gyanshu on ${label}`} href={href} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-brand-400 hover:bg-brand-400 hover:text-ink"><Icon /></a>
              : <span key={label} role="img" aria-label={`${label} (link coming soon)`} title={`${label}: coming soon`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60"><Icon /></span>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
          {footerGroups.map((group) => <div key={group.title}>
            <h2 className="font-mono text-[10.5px] uppercase tracking-[.2em] text-white/50">{group.title}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {group.links.map(([label, to]) => <li key={to}><Link to={to} className="group relative inline-block text-[14.5px] text-white/70 transition-colors hover:text-white">{label}<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-500 ease-expo group-hover:scale-x-100" /></Link></li>)}
            </ul>
          </div>)}
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 py-6 text-xs text-white/55 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Gyanshu Technologies. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Compliance', '/compliance'], ['Cookies', '/cookies']].map(([l, to]) => <Link key={to} to={to} className="transition-colors hover:text-white">{l}</Link>)}
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/40 hover:text-white" aria-label="Back to top"><ArrowUp size={15} /></button>
        </div>
      </div>
    </div>
  </footer>
}
