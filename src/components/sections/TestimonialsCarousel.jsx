import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

export default function TestimonialsCarousel() {
  const testimonials = [
    { quote: "A single partner for security, infrastructure, and operations gave our transformation program clear accountability.", author: "Enterprise Technology", company: "Integrated Delivery" },
    { quote: "The value is in the evidence: visibility, reporting, controls, and a team that can operate the environment.", author: "Security Leadership", company: "Cybersecurity Capability" },
    { quote: "Their productized platforms turn complex operational data into decisions our teams can act on.", author: "Operations Leadership", company: "Monitoring & Analytics" },
    { quote: "The delivery model connected architecture, implementation, training, and handover without losing momentum.", author: "Transformation Office", company: "Engineering-Led Delivery" },
    { quote: "The right mix of practical products and managed services for long-term operational continuity.", author: "IT Leadership", company: "Managed Operations" }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-ink-950 py-32 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative min-h-[400px] flex flex-col justify-center">
        
        {/* Giant decorative quote */}
        <div className="absolute top-0 left-4 font-display text-[15rem] md:text-[25rem] text-signal/5 leading-none pointer-events-none select-none -translate-y-12">
          "
        </div>

        <div className="relative z-10 w-full md:w-4/5 mx-auto text-center" data-cursor="text">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight mb-12">
                {testimonials[currentIndex].quote}
              </h3>
              
              <div>
                <p className="font-mono text-signal uppercase tracking-widest text-sm mb-1">
                  {testimonials[currentIndex].author}
                </p>
                <p className="font-body text-mist-700">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex gap-4">
            <MagneticButton onClick={prev} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-colors">
              <ChevronLeft size={20} />
            </MagneticButton>
            <MagneticButton onClick={next} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-colors">
              <ChevronRight size={20} />
            </MagneticButton>
          </div>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-signal w-6' : 'bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
