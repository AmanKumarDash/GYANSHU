import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import * as LucideIcons from 'lucide-react'
import { services } from '../../data/content'
import heroImage from '../../assets/hero.png'
import ScrollReveal from '../ui/ScrollReveal'

const serviceAccents = {
  1: '#c6f13d',
  2: '#4da3ff',
  3: '#a78bfa',
  4: '#2dd4bf',
  5: '#fb923c',
  6: '#f472b6',
  7: '#60a5fa',
  8: '#facc15',
}

export default function ServicesGrid() {
  const [activeService, setActiveService] = useState(null)

  return (
    <section className="bg-ink-900 py-32 relative" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <ScrollReveal delay={0.1}>
          <p className="font-mono text-xs text-signal uppercase tracking-widest mb-4">Our Capabilities</p>
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-16 tracking-tight">Technology capability.<br/>Operationally ready.</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const IconComponent = LucideIcons[service.icon] || LucideIcons.Circle
            const accent = serviceAccents[service.id]
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                onHoverStart={() => setActiveService(service)}
                onHoverEnd={() => setActiveService(null)}
                style={{ '--service-accent': accent }}
                className="min-h-[320px] bg-ink-800 border border-white/5 p-8 relative overflow-hidden group hover:border-[var(--service-accent)] hover:scale-[1.01] transition-all duration-500 hover:bg-ink-800/80 flex flex-col justify-between"
                data-cursor="hover"
              >
                {/* Background glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at top right, ${accent}30, transparent 58%)` }} />
                
                <div className="relative z-10 mb-8">
                  <div className="flex justify-between items-start w-full mb-8">
                    <span className="font-mono text-xs text-mist-900">{service.number}</span>
                    <div className="group-hover:scale-110 transition-all duration-300" style={{ color: accent }}>
                      <IconComponent size={28} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 className="font-display font-medium text-3xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-mist-900 text-sm leading-relaxed max-w-sm">
                    {service.desc}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {service.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] md:text-xs text-mist-700 bg-ink-900 border border-white/10 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover arrow slide-in */}
                <div className="absolute right-8 bottom-8 flex items-center gap-2 text-signal font-mono text-sm translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="hidden sm:inline">Explore</span> &rarr;
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
                className="fixed inset-0 z-40 hidden lg:flex items-center justify-center bg-black/70 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 36 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="w-full max-w-5xl min-h-[460px] mx-8 p-12 rounded-sm bg-[#0b0b0d] shadow-[0_32px_100px_rgba(0,0,0,0.55)] relative overflow-hidden flex flex-col justify-between"
              style={{ borderColor: serviceAccents[activeService.id] }}
            >
              <img src={heroImage} alt="" className="absolute right-0 top-0 h-full w-[42%] object-cover opacity-35" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, #0b0b0d 36%, rgba(11,11,13,0.72) 64%, ${serviceAccents[activeService.id]}30 100%)` }} />
              <div className="relative z-10 flex items-start justify-between gap-8">
                <span className="font-mono text-sm" style={{ color: serviceAccents[activeService.id] }}>{activeService.number}</span>
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#a3a3a3' }}>Capability spotlight</span>
              </div>

              <div className="relative z-10 max-w-3xl">
                <h3 className="font-display text-5xl xl:text-7xl font-medium tracking-tight mb-6" style={{ color: '#ffffff' }}>{activeService.title}</h3>
                <p className="text-xl xl:text-2xl leading-relaxed max-w-2xl" style={{ color: '#dedede' }}>{activeService.desc}</p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-3">
                {activeService.tags.map((tag) => (
                  <span key={tag} className="font-mono text-sm border px-4 py-2 rounded-full" style={{ color: '#ffffff', borderColor: `${serviceAccents[activeService.id]}80`, backgroundColor: `${serviceAccents[activeService.id]}18` }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
