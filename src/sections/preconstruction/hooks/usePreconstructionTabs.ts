import { useEffect, useState } from 'react'

export type PreconstructionTab = 0 | 1

/**
 * Pestañas principales de Preconstruction (Projects Cost Estimating vs Preliminary Construction Plan).
 * El estado vive en la página y se pasa al bloque de título y al contenido condicional.
 * Escucha `preconstruction:set-tab` (mega menú Header).
 */
export function usePreconstructionTabs(initialTab: PreconstructionTab = 0) {
  const [activePreTab, setActivePreTab] = useState<PreconstructionTab>(initialTab)

  useEffect(() => {
    const onSetTab = (e: Event) => {
      const tab = (e as CustomEvent<{ tab?: unknown }>).detail?.tab
      if (tab === 0 || tab === 1) setActivePreTab(tab)
    }
    window.addEventListener('preconstruction:set-tab', onSetTab as EventListener)
    return () => window.removeEventListener('preconstruction:set-tab', onSetTab as EventListener)
  }, [])

  return { activePreTab, setActivePreTab }
}
