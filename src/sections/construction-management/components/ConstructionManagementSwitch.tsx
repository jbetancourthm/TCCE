type ConstructionTab = 0 | 1 | 2

type ConstructionManagementSwitchProps = {
  activeTab: ConstructionTab
  onTabChange: (tab: ConstructionTab) => void
}

export default function ConstructionManagementSwitch({ activeTab, onTabChange }: ConstructionManagementSwitchProps) {
  const pillTransform =
    activeTab === 0 ? 'translate-x-0' : activeTab === 1 ? 'translate-x-full' : 'translate-x-[200%]'

  return (
    <>
      <h3 className="mb-10 text-3xl font-bold tracking-tight text-neutral-700 md:text-4xl">Turning Vision Into Reality</h3>
      <p className="mt-4 max-w-full text-base leading-relaxed text-neutral-500 md:max-w-[80%]">
        We deliver complex infrastructure and site development projects by combining experienced crews, company-owned
        equipment, and cutting-edge digital technology - all tightly coordinated between field operations and project
        management. The result is faster execution, smarter decisions, and consistent results: on track, on budget, and
        delivered with confidence.
      </p>

      <div className="relative mx-auto mt-8 flex w-full max-w-full overflow-hidden rounded-xl bg-white ring-1 ring-[#E4611F]/40 md:inline-flex md:w-full md:max-w-[min(100%_52rem)]">
        <div
          aria-hidden
          className={`absolute top-0 bottom-0 left-0 w-1/3 rounded-xl bg-[#E4611F] transition-transform duration-500 ease-in-out ${pillTransform}`}
        />

        <button
          type="button"
          onClick={() => onTabChange(0)}
          aria-pressed={activeTab === 0}
          className={
            'relative z-10 w-1/3 rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold leading-snug transition-colors duration-300 max-md:text-balance md:whitespace-nowrap md:px-14 md:py-4 md:text-sm ' +
            (activeTab === 0 ? 'text-white' : 'text-[#b37249]')
          }
        >
          Field Operations
        </button>
        <button
          type="button"
          onClick={() => onTabChange(1)}
          aria-pressed={activeTab === 1}
          className={
            'relative z-10 w-1/3 rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold leading-snug transition-colors duration-300 max-md:text-balance md:whitespace-nowrap md:px-14 md:py-4 md:text-sm ' +
            (activeTab === 1 ? 'text-white' : 'text-[#b37249]')
          }
        >
          Virtual Design & Construction
        </button>
        <button
          type="button"
          onClick={() => onTabChange(2)}
          aria-pressed={activeTab === 2}
          className={
            'relative z-10 w-1/3 rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold leading-snug transition-colors duration-300 max-md:text-balance md:whitespace-nowrap md:px-14 md:py-4 md:text-sm ' +
            (activeTab === 2 ? 'text-white' : 'text-[#b37249]')
          }
        >
          Performance Monitoring
        </button>
      </div>
    </>
  )
}
