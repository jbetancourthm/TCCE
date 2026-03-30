import type { ConstructionTab } from '../hooks/useConstructionManagementTabs'

type ConstructionManagementSwitchProps = {
  activeTab: ConstructionTab
  onTabChange: (tab: ConstructionTab) => void
}

export default function ConstructionManagementSwitch({ activeTab, onTabChange }: ConstructionManagementSwitchProps) {
  const pillTransform =
    activeTab === 0 ? 'translate-x-0' : activeTab === 1 ? 'translate-x-full' : 'translate-x-[200%]'

  return (
    <>
      <h3 className="mb-10 text-3xl font-bold tracking-tight text-neutral-700 lg:text-4xl">Turning Vision Into Reality</h3>
      <p className="mt-4 max-w-full text-base leading-relaxed text-neutral-500 lg:max-w-[80%]">
        We deliver complex infrastructure and site development projects by combining experienced crews, company-owned
        equipment, and cutting-edge digital technology - all tightly coordinated between field operations and project
        management. The result is faster execution, smarter decisions, and consistent results: on track, on budget, and
        delivered with confidence.
      </p>

      <div className="relative mx-auto mt-8 flex w-full max-w-full overflow-hidden rounded-xl bg-white ring-1 ring-[#E4611F]/40 lg:inline-flex lg:w-auto lg:max-w-none">
        <div
          aria-hidden
          className={`absolute top-0 bottom-0 left-0 w-[calc(100%/3)] rounded-xl bg-[#E4611F] transition-transform duration-500 ease-in-out ${pillTransform}`}
        />

        <button
          type="button"
          onClick={() => onTabChange(0)}
          aria-pressed={activeTab === 0}
          className={
            'relative z-10 flex min-h-[2.75rem] min-w-0 flex-1 basis-0 items-center justify-center rounded-xl px-1.5 py-2 text-center text-[0.625rem] font-semibold leading-tight transition-colors duration-300 max-lg:text-balance sm:px-2 sm:text-[0.6875rem] lg:min-h-0 lg:whitespace-nowrap lg:px-14 lg:py-4 lg:text-sm lg:leading-snug ' +
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
            'relative z-10 flex min-h-[2.75rem] min-w-0 flex-1 basis-0 items-center justify-center rounded-xl px-1.5 py-2 text-center text-[0.625rem] font-semibold leading-tight transition-colors duration-300 max-lg:text-balance sm:px-2 sm:text-[0.6875rem] lg:min-h-0 lg:whitespace-nowrap lg:px-14 lg:py-4 lg:text-sm lg:leading-snug ' +
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
            'relative z-10 flex min-h-[2.75rem] min-w-0 flex-1 basis-0 items-center justify-center rounded-xl px-1.5 py-2 text-center text-[0.625rem] font-semibold leading-tight transition-colors duration-300 max-lg:text-balance sm:px-2 sm:text-[0.6875rem] lg:min-h-0 lg:whitespace-nowrap lg:px-14 lg:py-4 lg:text-sm lg:leading-snug ' +
            (activeTab === 2 ? 'text-white' : 'text-[#b37249]')
          }
        >
          Performance Monitoring
        </button>
      </div>
    </>
  )
}
