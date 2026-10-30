// Gyanshu brand lockups, built from the brand kit (public/brand). `tone="light"` is for dark surfaces;
// `full` adds the PVT. LTD. rule and the "Secure. Intelligent. Connected." tagline; `compact` shows the mark alone.
export default function Logo({ tone = 'dark', compact = false, full = false, className = '' }) {
  const src = compact
    ? `/brand/gyanshu-mark${tone === 'light' ? '-light' : ''}.svg`
    : `/brand/gyanshu-lockup-${full ? 'full' : 'short'}-${tone}.svg`
  return <img src={src} alt="Gyanshu Technologies Pvt. Ltd." className={className} draggable="false" />
}
