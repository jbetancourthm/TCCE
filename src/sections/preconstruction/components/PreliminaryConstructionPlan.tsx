export default function PreliminaryConstructionPlan() {
  return (
    <>
      <div className="mt-12 grid items-start gap-8 text-left md:grid-cols-[1.1fr_1fr]">
        <img
          src="/images/our-expertise/preliminary-construction-plan.png"
          alt="Preliminary Construction Plan"
          className="h-full w-full rounded-2xl object-cover"
        />

        <div>
          <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            <span aria-hidden className="h-[2px] w-12 bg-neutral-500/60" />
            Preconstruction
          </p>
          <h4 className="mt-4 text-5xl font-bold leading-tight text-neutral-700">Preliminary Construction Plan</h4>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Our expertise helps you bid and plan with confidence, visual clarity and supporting data-driven decisions that
            protect overall project success. Our team delivers through critical path analysis, lead-time management, and
            scenario-based acceleration strategies that enable contractors and developers to submit competitive, realistic,
            and well-informed bids and contracts.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-neutral-500">
            Through 4D and 5D construction planning, we analyze project scope, schedules, work fronts, and constructability
            to identify risks and opportunities early. By aligning planning with estimating and procurement strategies, we
            help our clients reduce uncertainty, avoid costly assumptions, and strengthen their proposals, project
            milestones, and key deliverables.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
          <img src="/images/our-expertise/pre1.png" alt="Preconstruction gallery 1" className="h-56 w-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
          <img
            src="/images/our-expertise/construction1.png"
            alt="Preconstruction gallery 2"
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
          <img src="/images/our-expertise/pre2.png" alt="Preconstruction gallery 3" className="h-56 w-full object-cover" />
        </div>
      </div>

      <div className="mt-12 grid items-start gap-8 md:grid-cols-[1fr_1.8fr]">
        <div className="text-left">
          <h4 className="text-5xl font-bold leading-tight text-neutral-700">We build your project before breaking ground.</h4>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Using digital twins, we create a precise virtual replica of your project - stress-testing decisions, catching
            conflicts, and locking in scope before a single dollar hits the field.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-neutral-500">
            The result: tighter planning, fewer surprises, and a construction team that moves with clarity from day one.
          </p>
          <button type="button" className="mt-8 inline-flex items-center gap-3 text-base font-semibold text-[#E4611F]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E4611F] text-white">↻</span>
            Contact Us
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
          <img
            src="/images/our-expertise/pre-planning-panel.png"
            alt="Preconstruction planning"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
        <img
          src="/images/preconstruction/every.png"
          alt="Preconstruction final banner"
          className="h-[26rem] w-full object-cover"
        />
      </div>
    </>
  )
}
