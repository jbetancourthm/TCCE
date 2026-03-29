import { useEffect, useMemo, useState } from 'react'

export type SafetySectionTab = 0 | 1 | 2

/**
 * Estado de las tres pestañas del switch (Safety Planning, Safety Construction, Totally Safe).
 *
 * - Mantiene `activeTab` y expone `setActiveTab` para los botones del switch.
 * - Escucha el evento de ventana `safety:set-tab` (lo dispara el Header al elegir un subenlace
 *   del mega menú “Safety”) para activar la pestaña correcta tras el scroll a la sección.
 */
export function useSafetySectionTabs() {
  const [activeTab, setActiveTab] = useState<SafetySectionTab>(0)

  useEffect(() => {
    const onSetTab = (e: Event) => {
      const tab = (e as CustomEvent<{ tab?: unknown }>).detail?.tab
      if (tab === 0 || tab === 1 || tab === 2) setActiveTab(tab)
    }
    window.addEventListener('safety:set-tab', onSetTab as EventListener)
    return () => window.removeEventListener('safety:set-tab', onSetTab as EventListener)
  }, [])

  const pillTransform = useMemo(() => {
    if (activeTab === 0) return 'translate-x-0'
    if (activeTab === 1) return 'translate-x-full'
    return 'translate-x-[200%]'
  }, [activeTab])

  return { activeTab, setActiveTab, pillTransform }
}
