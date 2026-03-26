export default function RelatedProjectsSection() {
  return (
    <section className="mt-14">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">PROJECTS</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-neutral-700">Related Projects</h3>
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">1</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500">2</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500">3</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500">4</span>
          </div>
          <span className="h-2 w-2 rounded-full bg-[#E4611F]" />
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {['Project Card 1', 'Project Card 2', 'Project Card 3'].map((label, idx) => (
          <article
            // eslint-disable-next-line react/no-array-index-key
            key={label + idx}
            className="flex flex-col"
          >
            <div className="h-56 overflow-hidden rounded-3xl bg-neutral-200" />

            <p className="mt-5 text-xs tracking-tight text-neutral-500">United States, Washington D. C.</p>

            <h4 className="mt-2 text-2xl font-semibold text-[#E4611F]">Lorem ipsum</h4>

            <button type="button" className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E4611F] text-white">›</span>
              Read more
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
