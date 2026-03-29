import { useState } from 'react'

export type ConstructionTab = 0 | 1 | 2

/**
 * Pestañas principales de Construction Management (Field / VDC / Performance).
 */
export function useConstructionManagementTabs(initialTab: ConstructionTab = 0) {
  const [activeTab, setActiveTab] = useState<ConstructionTab>(initialTab)
  return { activeTab, setActiveTab }
}
