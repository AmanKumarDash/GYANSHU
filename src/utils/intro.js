import { createContext, useContext } from 'react'

// True once the loader has finished and the page may run its entrance animations.
export const IntroContext = createContext(true)
export const useIntroReady = () => useContext(IntroContext)

export const EASE = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

// Image ids: '/path' is a local file, 'px-<n>' a Pexels photo (free licence, hotlinking allowed), anything else an Unsplash id.
export const photo = (id, w = 1200) => {
  if (id.startsWith('/')) return id
  if (id.startsWith('px-')) { const n = id.slice(3); return `https://images.pexels.com/photos/${n}/pexels-photo-${n}.jpeg?auto=compress&cs=tinysrgb&w=${w}` }
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
}
