import { brandLogos, socials } from '../../data/socialLinks'

const circle = 'flex h-10 w-10 items-center justify-center rounded-full border border-brand-300 bg-brand-100 shadow-card min-[1440px]:h-11 min-[1440px]:w-11 transition-all duration-300 hover:scale-110 hover:border-brand-400 hover:bg-white hover:shadow-lift'

// Social logos pinned to the left edge on large screens; smaller screens get them in the footer.
export default function SocialRail() {
  return <nav aria-label="Social media" className="fixed left-1 top-[60%] z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex min-[1440px]:left-4">
    {socials.map(([label, href]) => {
      const Logo = brandLogos[label]
      return href
        ? <a key={label} aria-label={`Gyanshu on ${label}`} title={label} href={href} target="_blank" rel="noopener noreferrer" className={circle}><Logo /></a>
        : <span key={label} role="img" aria-label={`${label} (link coming soon)`} title={`${label}: coming soon`} className={circle}><Logo /></span>
    })}
  </nav>
}
