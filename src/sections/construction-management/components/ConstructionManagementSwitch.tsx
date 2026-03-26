type ConstructionTab = 0 | 1 | 2

type ConstructionManagementSwitchProps = {
  activeTab: ConstructionTab
  onTabChange: (tab: ConstructionTab) => void
}

export default function ConstructionManagementSwitch({ activeTab, onTabChange }: ConstructionManagementSwitchProps) {
  return (
    <>
      <h3 className="text-3xl font-bold tracking-tight text-neutral-700 md:text-4xl">Turning Vision Into Reality</h3>
      <p className="mt-4 max-w-[58rem] text-sm leading-relaxed text-neutral-500 md:text-base">
        We deliver complex infrastructure and site development projects by combining experienced crews, company-owned
        equipment, and cutting-edge digital technology - all tightly coordinated between field operations and project
        management. The result is faster execution, smarter decisions, and consistent results: on track, on budget, and
        delivered with confidence.
      </p>

      <div className="inline-flex overflow-hidden rounded-xl border border-[#E4611F]/40">
        <button
          type="button"
          onClick={() => onTabChange(0)}
          aria-pressed={activeTab === 0}
          className={
            activeTab === 0
              ? 'bg-[#E4611F] px-8 py-3 text-sm font-semibold text-white'
              : 'bg-white px-8 py-3 text-sm font-medium text-[#b37249]'
          }
        >
          Field Operations
        </button>
        <button
          type="button"
          onClick={() => onTabChange(1)}
          aria-pressed={activeTab === 1}
          className={
            activeTab === 1
              ? 'bg-[#E4611F] px-8 py-3 text-sm font-semibold text-white'
              : 'bg-white px-8 py-3 text-sm font-medium text-[#b37249]'
          }
        >
          Virtual Design & Construction
        </button>
        <button
          type="button"
          onClick={() => onTabChange(2)}
          aria-pressed={activeTab === 2}
          className={
            activeTab === 2
              ? 'bg-[#E4611F] px-8 py-3 text-sm font-semibold text-white'
              : 'bg-white px-8 py-3 text-sm font-medium text-[#b37249]'
          }
        >
          Performance Monitoring
        </button>
      </div>
    </>
  )
}
