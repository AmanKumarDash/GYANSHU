import { useId } from 'react'

// Inline Gyanshu lockup so the wordmark can switch tone on dark surfaces.
export default function Logo({ tone = 'dark', compact = false, className = '' }) {
  const id = useId().replace(/:/g, '')
  const word = tone === 'light' ? '#ffffff' : '#0c1517'
  const sub = tone === 'light' ? 'rgba(255,255,255,.55)' : '#5d696c'
  return <svg viewBox={compact ? '0 0 112 104' : '0 0 470 104'} className={className} role="img" aria-label="Gyanshu Technologies Pvt. Ltd.">
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#26c8b2" /><stop offset="1" stopColor="#005564" /></linearGradient></defs>
    <g fill={`url(#${id})`}>
      <path d="M4 31 43 8v36L15 60v21L4 75z" />
      <path d="M24 66 43 55v19L67 60v27L43 101 24 90z" transform="translate(0 -8)" />
      <path d="M52 40 66 32v32l-14 8zm20-12 12-7v47L72 76zm19-11 11-6v61L91 78z" />
      <path d="m20 63 18-11 39 23-17 10z" fill="#82e3d7" />
      <rect x="73" y="1" width="8" height="8" rx="1" /><rect x="87" y="13" width="8" height="8" rx="1" /><rect x="101" y="1" width="8" height="8" rx="1" />
    </g>
    {!compact && <>
      <text x="126" y="53" fill={word} fontFamily="Roboto,Arial,sans-serif" fontSize="41" fontWeight="800" letterSpacing="-1.4">GYANSHU</text>
      <text x="128" y="78" fill={sub} fontFamily="Roboto,Arial,sans-serif" fontSize="12" fontWeight="700" letterSpacing="4.1">TECHNOLOGIES PVT. LTD.</text>
    </>}
  </svg>
}
