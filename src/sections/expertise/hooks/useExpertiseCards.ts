import { useEffect, useState } from 'react'
import { EXPAND_ALL_SECTIONS } from '../../../config/devExpandSections'

/**
 * Tarjetas Preconstruction / Construction Management: selección, imágenes expandidas,
 * alturas partidas en móvil y apertura vía evento global `expertise:open-card`.
 */
export function useExpertiseCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const showExpandedCardImages = EXPAND_ALL_SECTIONS || activeCard !== null
  const activeForImages = (activeCard ?? 0) as 0 | 1
  const useSplitHeights = !EXPAND_ALL_SECTIONS && activeCard !== null

  useEffect(() => {
    const handleOpenCard = (event: Event) => {
      const customEvent = event as CustomEvent<{ card?: number }>
      const targetCard = customEvent.detail?.card
      if (targetCard === 0 || targetCard === 1) {
        setActiveCard(targetCard)
      }
    }

    window.addEventListener('expertise:open-card', handleOpenCard as EventListener)
    return () => window.removeEventListener('expertise:open-card', handleOpenCard as EventListener)
  }, [])

  return {
    activeCard,
    setActiveCard,
    showExpandedCardImages,
    activeForImages,
    useSplitHeights,
  }
}
