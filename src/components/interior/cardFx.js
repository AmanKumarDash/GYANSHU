// Helpers shared by the interior blocks and the pages built from them.

const ART_PATH = /\/images\/art\/([a-z0-9]+)-(hero|panel|detail|flow|hub|card)\.webp/
// '/images/art/network-card.webp' → { name: 'network', kind: 'card' }; anything else (product screens, photos) → null.
export const parseArt = (src) => { const m = typeof src === 'string' ? ART_PATH.exec(src) : null; return m ? { name: m[1], kind: m[2] } : null }

// Pointer position for the card spotlight; set it as `onMouseMove` on an element with the `group relative overflow-hidden` classes
// and put <CardFx /> first inside it.
export const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
