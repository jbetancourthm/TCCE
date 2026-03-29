import { useCallback, useEffect, useState } from 'react'
import { useMinWidthMd } from '../../../shared/hooks/useMinWidthMd'

/**
 * Tarjetas con texto expandible en móvil (tap) y hover en desktop (Virtual Design, Performance Monitoring).
 */
export function useTouchExpandableCards() {
  const isDesktop = useMinWidthMd()
  const [mobileExpandedKey, setMobileExpandedKey] = useState<string | null>(null)

  useEffect(() => {
    if (isDesktop) setMobileExpandedKey(null)
  }, [isDesktop])

  const toggleCard = useCallback(
    (key: string) => {
      if (isDesktop) return
      setMobileExpandedKey((k) => (k === key ? null : key))
    },
    [isDesktop],
  )

  const isExpandedTouch = useCallback(
    (key: string) => !isDesktop && mobileExpandedKey === key,
    [isDesktop, mobileExpandedKey],
  )

  return { isDesktop, toggleCard, isExpandedTouch }
}
