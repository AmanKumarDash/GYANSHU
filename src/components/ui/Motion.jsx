import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EASE, useIntroReady } from '../../utils/intro'

// Fade + rise when scrolled into view.
export function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const Tag = motion[as]
  return <Tag
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    {...rest}
  >{children}</Tag>
}

// Each line rises out of a mask. `lines` is an array of nodes; `onLoad` waits for the intro loader.
export function MaskLines({ lines, className = '', lineClassName = '', delay = 0, stagger = 0.09, onLoad = false }) {
  const ready = useIntroReady()
  // The wrapper is observed (not the clipped lines) so in-view detection works.
  return <motion.span
    className={`block ${className}`}
    initial="hidden"
    animate={onLoad ? (ready ? 'show' : 'hidden') : undefined}
    whileInView={onLoad ? undefined : 'show'}
    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
  >
    {lines.map((line, i) => <span key={i} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className={`block ${lineClassName}`}
        variants={{ hidden: { y: '108%' }, show: { y: '0%', transition: { duration: 1.05, delay: delay + i * stagger, ease: EASE } } }}
      >{line}</motion.span>
    </span>)}
  </motion.span>
}

// Waypoint-style paragraph that inks in word by word as it scrolls through the viewport.
export function ScrollWords({ text, accent = [], className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return <p ref={ref} className={className}>
    {words.map((word, i) => {
      const start = i / words.length
      const end = start + 1 / words.length
      return <Word key={i} progress={scrollYProgress} range={[start, end]} reduce={reduce} accent={accent.includes(i)}>{word}</Word>
    })}
  </p>
}

function Word({ children, progress, range, reduce, accent }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return <><motion.span style={{ opacity: reduce ? 1 : opacity }} className={accent ? 'text-brand-500' : undefined}>{children}</motion.span>{' '}</>
}

// Literal class names so Tailwind keeps every variant.
const variants = { dark: 'btn-dark', light: 'btn-light', brand: 'btn-brand' }

// Pill button with sliding arrow chip. Renders <Link>, <a> or <button> depending on props.
export function ArrowButton({ to, href, variant = 'dark', icon: Icon = ArrowUpRight, children, className = '', ...rest }) {
  const content = <><span>{children}</span><span className="btn-chip"><Icon size={15} strokeWidth={2.2} /></span></>
  const cls = `btn ${variants[variant] || variants.dark} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>
  return <button type="button" className={cls} {...rest}>{content}</button>
}

export function Eyebrow({ children, dark = false, className = '' }) {
  return <span className={`${dark ? 'eyebrow-dark' : 'eyebrow'} ${className}`}>{children}</span>
}

// Centered (or left) section heading block with eyebrow, title and optional lede.
export function SectionHead({ eyebrow, title, lede, dark = false, align = 'center', className = '' }) {
  const center = align === 'center'
  return <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
    <Reveal><Eyebrow dark={dark}>{eyebrow}</Eyebrow></Reveal>
    <h2 className={`h-section mt-5 ${dark ? 'text-white' : 'text-ink'}`}><MaskLines lines={Array.isArray(title) ? title : [title]} /></h2>
    {lede && <Reveal delay={0.15}><p className={`mt-5 ${center ? 'mx-auto' : ''} max-w-xl text-[15px] leading-relaxed md:text-base ${dark ? 'text-white/55' : 'text-muted'}`}>{lede}</p></Reveal>}
  </div>
}
