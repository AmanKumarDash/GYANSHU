import { art, resolveArt } from '../../data/artManifest'
import { heroMotion } from '../../data/heroMotion/index.js'
import { useCanvasLoop } from './useCanvasLoop'
import { drawMotion } from './motionDraw'
import { HERO } from './geometry'

/**
 * The light hero artwork for a topic: the scene painted for that page, with its own motion drawn over the painted lines.
 * Width comes from the parent; height follows the 1672:941 artwork. Until the scene is painted it shows the topic's older image,
 * and an unknown topic gives a blank box of the same size. Decorative.
 */
export default function HeroArt({ name, className = '' }) {
  const src = art(name, 'hero')
  const painted = resolveArt(name, 'hero')?.key === name ? heroMotion[name] : null
  const canvas = useCanvasLoop((ctx, { w, h, t }) => { if (painted) drawMotion(ctx, painted, t, { W: w, H: h, theme: 'light' }) }, [name])
  return <div className={`pointer-events-none relative select-none ${className}`} style={{ aspectRatio: `${HERO.W} / ${HERO.H}` }} aria-hidden="true">
    {src && <img src={src} alt="" width={HERO.W} height={HERO.H} decoding="async" fetchPriority="high" className="block h-full w-full" />}
    {painted && <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" />}
  </div>
}
