type PreconstructionTitleBlockProps = {
  activePreTab: 0 | 1
  onTabChange: (tab: 0 | 1) => void
}

export default function PreconstructionTitleBlock({
  activePreTab,
  onTabChange,
}: PreconstructionTitleBlockProps) {
  return (
    <>
      <h3 className="mb-10 text-4xl font-bold tracking-tight text-neutral-700">
        Engineering-Led Insight
      </h3>
      <p className="mt-6 mx-auto max-w-[90rem] px-4 text-center text-lg leading-relaxed text-neutral-500">
        Preconstruction is where experience and insight shape successful projects. We are passionate about serving as a
        strategic partner to our clients, assisting them in navigating their most complex project challenges. By
        reviewing requirements, evaluating site conditions, and defining practical approaches for heavy civil and site
        development, we offer more than just a service - we offer clarity. Our early technical insight and field-driven
        perspective help project teams anticipate obstacles, improve coordination, and establish a clear, reliable path
        from planning to construction.
      </p>
      <div className="mx-auto mt-8 relative inline-flex min-w-[34rem] overflow-hidden rounded-xl bg-white ring-1 ring-[#E4611F]/40">
        <div
          aria-hidden
          className={`absolute top-0 bottom-0 left-0 w-1/2 rounded-xl bg-[#E4611F] transition-transform duration-500 ease-in-out ${
            activePreTab === 1 ? 'translate-x-full' : 'translate-x-0'
          }`}
        />

        <button
          type="button"
          onClick={() => onTabChange(0)}
          aria-pressed={activePreTab === 0}
          className={
            'relative z-10 w-1/2 rounded-xl px-12 py-4 text-sm font-semibold transition-colors duration-300 whitespace-nowrap md:px-14 ' +
            (activePreTab === 0 ? 'text-white' : 'text-[#b37249]')
          }
        >
          Projects Cost Estimating
        </button>
        <button
          type="button"
          onClick={() => onTabChange(1)}
          aria-pressed={activePreTab === 1}
          className={
            'relative z-10 w-1/2 rounded-xl px-12 py-4 text-sm font-semibold transition-colors duration-300 whitespace-nowrap md:px-14 ' +
            (activePreTab === 1 ? 'text-white' : 'text-[#b37249]')
          }
        >
          Preliminary Construction Plan
        </button>
      </div>
    </>
  )
}
