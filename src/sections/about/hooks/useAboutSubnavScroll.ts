import { useEffect } from 'react'

const SECTION_IDS = [
  'about-section-0',
  'about-section-1',
  'about-section-2',
  'about-section-3',
  'about-section-4',
] as const

/**
 * Al elegir un ítem del mega menú About, hace scroll al bloque correspondiente
 * (la página About va todo en vertical, sin pestañas).
 */
export function useAboutSubnavScroll() {
  useEffect(() => {
    const onSetTab = (e: Event) => {
      const tab = (e as CustomEvent<{ tab?: unknown }>).detail?.tab
      if (tab !== 0 && tab !== 1 && tab !== 2 && tab !== 3 && tab !== 4) return
      const id = SECTION_IDS[tab]
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 160)
      })
    }
    window.addEventListener('about:set-tab', onSetTab as EventListener)
    return () => window.removeEventListener('about:set-tab', onSetTab as EventListener)
  }, [])
}
