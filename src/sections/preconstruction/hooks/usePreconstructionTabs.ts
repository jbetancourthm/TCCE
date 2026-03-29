import { useState } from 'react'

export type PreconstructionTab = 0 | 1

/**
 * Pestañas principales de Preconstruction (Projects Cost Estimating vs Preliminary Construction Plan).
 * El estado vive en la página y se pasa al bloque de título y al contenido condicional.
 */
export function usePreconstructionTabs(initialTab: PreconstructionTab = 0) {
  const [activePreTab, setActivePreTab] = useState<PreconstructionTab>(initialTab)
  return { activePreTab, setActivePreTab }
}
