import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import { ArrowButton, Eyebrow, MaskLines, Reveal } from '../ui/Motion'
import { EASE, photo } from '../../utils/intro'

function ContactModal({ onClose }) {
  const reduce = useReducedMotion()
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.lenis?.start(); document.documentElement.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return <motion.div className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/60 p-5 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }} data-lenis-prevent>
    <motion.div role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" className="relative w-full max-w-lg overflow-hidden rounded-[28px] bg-paper p-7 text-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,.5)] md:p-10" initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE }}>
      <div className="dot-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]" />
      <button type="button" onClick={onClose} aria-label="Close contact dialog" className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-muted transition hover:rotate-90 hover:text-ink"><X size={18} /></button>
      <div className="relative">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-brand-300"><Mail size={24} strokeWidth={1.7} /></span>
        <Eyebrow className="mt-7">Get in touch</Eyebrow>
        <h2 id="contact-modal-title" className="mt-4 font-display text-3xl font-medium tracking-[-.03em] md:text-4xl">We’d love to hear from you.</h2>
        <p className="mt-3 leading-relaxed text-muted">For enquiries about our services, products, or a project, email the Gyanshu team.</p>
        <a href="mailto:Support.gyanshu@gmail.com" className="group mt-7 flex items-center gap-3 rounded-2xl border border-line bg-white p-4 font-medium text-ink shadow-card transition hover:border-brand-400">
          <Mail size={18} className="shrink-0 text-brand-500" /><span className="min-w-0 flex-1 break-all">Support.gyanshu@gmail.com</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={15} /></span>
        </a>
        <p className="mt-4 text-xs text-muted-soft">Select the email address to open your email app.</p>
      </div>
    </motion.div>
  </motion.div>
}

export default function ClosingCTA() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])

  return <section className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
    <div ref={ref} className="relative isolate mx-auto flex min-h-[86svh] max-w-[1600px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-ink-950 py-24 text-center text-white">
      <motion.img src={photo('photo-1446776811953-b23d57bd21aa', 2200)} alt="" loading="lazy" style={{ scale: reduce ? 1 : scale }} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(7,13,15,.35),rgba(7,13,15,.9)_75%)]" />
      <div className="grain absolute inset-0 -z-10" />
      <div className="shell flex flex-col items-center">
        <Reveal><Eyebrow dark>Start a conversation</Eyebrow></Reveal>
        <h2 className="h-poster mt-7 text-[clamp(3.8rem,11vw,11rem)]"><MaskLines lines={['Let’s build what', <span className="text-brand-300">comes next.</span>]} /></h2>
        <Reveal delay={0.2}><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">Bring us your cybersecurity, infrastructure, software, AI, or IoT requirement.</p></Reveal>
        <Reveal delay={0.3} className="mt-9 flex flex-wrap justify-center gap-3">
          <ArrowButton variant="brand" icon={Mail} onClick={() => setOpen(true)}>Send us a message</ArrowButton>
          <a href="mailto:Support.gyanshu@gmail.com" className="btn btn-outline-dark">Support.gyanshu@gmail.com</a>
        </Reveal>
      </div>
    </div>
    <AnimatePresence>{open && <ContactModal onClose={() => setOpen(false)} />}</AnimatePresence>
  </section>
}
