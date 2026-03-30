import { useEffect, useState } from 'react'

export type ConstructionTab = 0 | 1 | 2

/**
 * Pestañas principales de Construction Management (Field / VDC / Performance).
 * Escucha `construction-management:set-tab` (mega menú Header).
 */
export function useConstructionManagementTabs(initialTab: ConstructionTab = 0) {
  const [activeTab, setActiveTab] = useState<ConstructionTab>(initialTab)

  useEffect(() => {
    const onSetTab = (e: Event) => {
      const tab = (e as CustomEvent<{ tab?: unknown }>).detail?.tab
      if (tab === 0 || tab === 1 || tab === 2) setActiveTab(tab)
    }
    window.addEventListener('construction-management:set-tab', onSetTab as EventListener)
    return () => window.removeEventListener('construction-management:set-tab', onSetTab as EventListener)
  }, [])

  return { activeTab, setActiveTab }
}
