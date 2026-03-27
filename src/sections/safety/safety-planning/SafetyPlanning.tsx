import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'

export default function SafetyPlanning() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.05fr]">
      <div className="text-left">
        <h3 className="mb-6 text-4xl font-bold tracking-tight text-neutral-700">Safety Planning</h3>
        <p className="mt-3 text-[2.2rem] leading-tight text-neutral-600">Safety Starts With Planning.</p>

        <div className="mt-8 text-[1rem] leading-relaxed text-neutral-600">
          <p>
            Safety at TCCE begins long before work starts in the field. Our teams analyze project conditions, define
            execution strategies, and identify risks early to ensure safe and controlled operations from the outset.
          </p>
          <div className="h-6" aria-hidden />
          <p>
            We develop structured planning processes that connect engineering, scheduling, and field execution—allowing us
            to anticipate challenges and reduce uncertainties.
          </p>
          <div className="h-6" aria-hidden />
          <p>
            Planning is not a one-time activity. It evolves throughout the project and is reinforced through short-term
            planning and daily alignment in the field.
          </p>
          <div className="h-6" aria-hidden />
          <p>
            Key Practices
            <br />
            Full project scheduling aligned with execution strategy
            <br />
            3-Week Look Ahead (3WLA) planning to anticipate upcoming activities
            <br />
            Early risk identification and mitigation during planning phases
            <br />
            Engineering-driven planning and coordination with field teams
            <br />
            Safety training and preparation for all TCCE employees and subcontractors prior to execution
            <br />
            Pre-task planning (PTP) and Job Hazard Analysis (JHA) as part of daily execution
            <br />
            Clear alignment between planning, safety, and field operations
          </p>
          <div className="h-6" aria-hidden />
          <p className="font-semibold text-neutral-700">
            Safe execution is built through early analysis, structured planning, and continuous alignment.
          </p>
        </div>

        <ContactUsPillButton className="mt-8" />
      </div>

      <div className="min-w-0">
        <div className="h-[25rem] rounded-[2.2rem] border border-neutral-400/70 bg-neutral-100" />
        <div className="mt-5 grid grid-cols-[1fr_1fr_0.18fr] gap-4">
          <div className="h-48 rounded-[2rem] border border-neutral-400/70 bg-neutral-100" />
          <div className="h-48 rounded-[2rem] border border-neutral-400/70 bg-neutral-100" />
          <div className="h-48 rounded-sm border border-neutral-400/70 bg-neutral-100" />
        </div>
      </div>
    </div>
  )
}
