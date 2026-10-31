import { MaskLines, Reveal } from '../ui/Motion'

// Customer names shown as wordmark tiles. To show real logos, add files to public/images/customers/
// and set `logo` (e.g. { name: 'Accel', logo: '/images/customers/accel.png' }).
const customers = [
  { name: 'Accel' }, { name: 'CIPET' }, { name: 'Cozentus' }, { name: 'CSM' }, { name: 'ESSPL' }, { name: 'Mayfair' },
  { name: 'Netovate' }, { name: 'OMC' }, { name: 'Univate' }, { name: 'Utkal University' }, { name: 'VL Access' },
]

function Tile({ c }) {
  return <div className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-5 shadow-card sm:h-24 sm:w-52">
    {c.logo
      ? <img src={c.logo} alt={c.name} className="max-h-12 w-auto max-w-full object-contain grayscale transition duration-500 hover:grayscale-0" />
      : <span className="text-center font-display text-lg font-semibold tracking-[-.02em] text-ink/70">{c.name}</span>}
  </div>
}

export default function Customers() {
  const row = [...customers, ...customers]
  return <section className="overflow-hidden bg-white py-8 md:py-10 lg:py-12">
    <div className="shell">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal><p className="font-mono text-[11px] uppercase tracking-[.18em] text-brand-600">Trusted by</p></Reveal>
        <h2 className="h-section mt-4"><MaskLines lines={[<>Our <span className="text-brand-500">Customers</span></>]} /></h2>
        <Reveal delay={0.15}><p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">Leading enterprises, government agencies, and critical infrastructure providers trust Gyanshu for their security and technology needs.</p></Reveal>
      </div>
    </div>
    <div className="mask-fade-x mt-8">
      <div className="flex w-max animate-marquee gap-3 [animation-duration:45s] hover:[animation-play-state:paused]" aria-hidden="true">
        {row.map((c, i) => <Tile key={i} c={c} />)}
      </div>
    </div>
    <ul className="sr-only">{customers.map((c) => <li key={c.name}>{c.name}</li>)}</ul>
  </section>
}
