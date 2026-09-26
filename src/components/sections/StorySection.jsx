import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function StorySection() {
  const chapters = [
    {
      num: '01',
      title: 'Critical technology deserves more than disconnected tools.',
      p1: 'Enterprise environments become difficult to secure and operate when infrastructure, cybersecurity, software, data, and field systems work in isolation.',
      p2: 'The result is limited visibility, slow response, compliance pressure, and operational risk. We bring the right capabilities together around measurable business outcomes.',
      align: 'left'
    },
    {
      num: '02',
      title: 'We make technology measurable, secure, and supportable.',
      p1: 'We map technology investments to availability, compliance, security posture, operational visibility, automation, and service quality.',
      p2: 'Our engineering-led delivery combines architecture, implementation, integration, testing, documentation, training, and handover with clear accountability.',
      align: 'right'
    },
    {
      num: '03',
      title: 'One partner from advisory to operations.',
      p1: 'Our productized capability converts domain experience into repeatable solutions for monitoring, visibility, vulnerability assessment, IPDR analytics, and water quality intelligence.',
      p2: 'We help teams assess, design, implement, integrate, operate, and improve the environments their business depends on.',
      align: 'center'
    }
  ]

  const Art01 = () => {
    const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
    const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })

    const handleMouseMove = (event) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      rotateX.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -14)
      rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14)
    }

    return (
      <div
        className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center cursor-crosshair"
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }}
      >
        <div className="absolute inset-0 border border-white/10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
        <div className="absolute w-64 h-64 bg-signal rounded-full blur-3xl opacity-20 animate-pulse-slow" />

        <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative w-[290px] h-[240px] md:w-[350px] md:h-[290px]">
          <motion.div
            animate={{ rotateZ: [0, 2, 0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-2 border border-signal/50 bg-signal/[0.04]"
            style={{ transform: 'translateZ(-55px) rotateX(58deg)' }}
          />
          <div className="absolute inset-6 border border-white/15 bg-ink-950/90 shadow-[0_20px_70px_rgba(0,0,0,0.6)]" style={{ transform: 'translateZ(10px)' }}>
            <div className="absolute inset-4 border border-white/10" />
            <div className="absolute left-1/2 top-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-signal text-ink-950 flex items-center justify-center font-display font-bold text-3xl shadow-[0_0_40px_rgba(232,255,71,0.45)]" style={{ transform: 'translate(-50%, -50%) translateZ(45px)' }}>G</div>
            <div className="absolute top-7 left-7 font-mono text-[10px] tracking-[0.24em] text-mist-700" style={{ transform: 'translateZ(30px)' }}>SYSTEM CORE</div>
            <div className="absolute bottom-7 left-7 flex gap-2" style={{ transform: 'translateZ(30px)' }}>
              {[0, 1, 2].map((node) => <span key={node} className="w-2 h-2 rounded-full bg-signal animate-pulse-slow" style={{ animationDelay: `${node * 0.35}s` }} />)}
            </div>
          </div>

          {[
            ['-left-10 -top-4', 'SECURE'],
            ['-right-12 top-10', 'OBSERVE'],
            ['left-5 -bottom-6', 'OPERATE'],
          ].map(([position, label], index) => (
            <motion.div
              key={label}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
              className={`absolute ${position} px-3 py-2 border border-white/20 bg-ink-950/95 font-mono text-[9px] tracking-wider text-mist-100 shadow-xl`}
              style={{ transform: `translateZ(${70 + index * 14}px)` }}
            >
              <span className="inline-block w-1.5 h-1.5 bg-signal rounded-full mr-2" />{label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  const Art02 = () => (
    <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center pointer-events-none group">
      <div className="w-1 h-3/4 bg-white/20 mx-4"></div>
      <div className="w-16 h-1/2 bg-signal/80 mx-4 transition-transform group-hover:scale-y-110"></div>
      <div className="w-1 h-2/3 bg-white/20 mx-4"></div>
      <div className="w-1 h-1/4 bg-white/10 mx-4"></div>
      <div className="w-8 h-8 bg-ember rounded-full mx-4 absolute right-1/4 top-1/4 animate-bounce"></div>
    </div>
  )

  return (
    <section className="bg-ink-950 py-32 md:py-48 relative overflow-hidden text-mist-100" id="about">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col pt-12">
        {chapters.map((chapter, i) => (
          <div key={i} className="mb-24 md:mb-48 relative last:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center ${chapter.align === 'right' ? 'md:flex-row-reverse' : ''} ${chapter.align === 'center' ? 'md:grid-cols-1 md:w-3/4 mx-auto text-center' : ''}`}
            >
              
              {/* Text Side */}
              <div className={`relative z-10 ${chapter.align === 'right' ? 'md:col-start-2 md:row-start-1' : ''}`}>
                <div className="absolute -top-16 md:-top-32 -left-8 md:-left-16 font-display text-[15rem] md:text-[20rem] text-white/[0.02] leading-none select-none pointer-events-none font-bold">
                  {chapter.num}
                </div>
                
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight mb-8">
                  {chapter.title}
                </h2>
                
                <div className={`flex flex-col gap-6 text-mist-900 text-lg leading-relaxed ${chapter.align === 'center' ? 'items-center' : ''}`}>
                  <p>{chapter.p1}</p>
                  <p>{chapter.p2}</p>
                </div>

                {chapter.align === 'center' && (
                  <div className="mt-12">
                    <a href="#team" className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-signal hover:text-white transition-colors" data-cursor="hover">
                      Explore our capability areas →
                    </a>
                  </div>
                )}
              </div>

              {/* Visual Side */}
              {chapter.align !== 'center' && (
                <div className={`relative z-0 ${chapter.align === 'right' ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  {i === 0 ? <Art01 /> : <Art02 />}
                </div>
              )}

            </motion.div>

            {/* Chapter dividers */}
            {i < chapters.length - 1 && (
              <div className="my-24 md:my-48 relative flex justify-center items-center">
                <hr className="w-full border-white/5 absolute" />
                <span className="bg-ink-950 px-4 font-mono text-xs text-white/20 relative">Chapter {chapters[i+1].num}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
