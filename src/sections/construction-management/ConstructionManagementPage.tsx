import { useState } from 'react'
import { EXPAND_ALL_SECTIONS } from '../../config/devExpandSections'
import ConstructionManagementIntro from './components/ConstructionManagementIntro'
import ConstructionManagementSwitch from './components/ConstructionManagementSwitch'
import FieldOperations from './field-operations/FieldOperations'
import VirtualDesign from './virtual-design/VirtualDesign'
import PerformanceMonitoring from './performance-monitoring/PerformanceMonitoring'

type ConstructionTab = 0 | 1 | 2

export default function ConstructionManagementPage() {
  const [activeTab, setActiveTab] = useState<ConstructionTab>(0)

  return (
    <section className="mt-12 grid items-start gap-8 md:grid-cols-[1.1fr_1fr]">
      <ConstructionManagementIntro />

      <div className="col-span-2 mt-10 flex flex-col items-center text-center">
        {EXPAND_ALL_SECTIONS ? null : (
          <ConstructionManagementSwitch activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {EXPAND_ALL_SECTIONS ? (
          <>
            <FieldOperations />
            <div className="mt-20 w-full">
              <VirtualDesign />
            </div>
            <div className="mt-20 w-full">
              <PerformanceMonitoring />
            </div>
          </>
        ) : (
          <>
            {activeTab === 0 ? <FieldOperations /> : null}
            {activeTab === 1 ? <VirtualDesign /> : null}
            {activeTab === 2 ? <PerformanceMonitoring /> : null}
          </>
        )}
      </div>
    </section>
  )
}
