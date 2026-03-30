import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import {
  SAFETY_PLANNING_BIG_IMAGE,
  SAFETY_PLANNING_MARQUEE_ITEMS,
  SAFETY_PLANNING_MARQUEE_LOOP,
} from '../hooks/useSafety'

function PlanningMarqueeStrip() {
  return (
    <>
      {SAFETY_PLANNING_MARQUEE_LOOP.map((item, index) => (
        <div
          key={`${item.src}-${index}`}
          className="box-border w-[min(72vw,17.5rem)] shrink-0 px-2 sm:w-[18.5rem] sm:px-2.5 md:w-[19.5rem]"
        >
          <img
            src={item.src}
            alt={item.alt}
            className="h-44 w-full rounded-[1.35rem] border border-neutral-200/80 object-cover shadow-sm sm:h-48 md:rounded-[2rem]"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </>
  )
}

function PlanningMarqueeBlock() {
  return (
    <div>
      <p className="sr-only">
        A continuación, una cinta de imágenes en movimiento continuo con escenas de planificación de seguridad.
      </p>

      <div className="hidden grid-cols-1 gap-4 motion-reduce:grid sm:grid-cols-3">
        {SAFETY_PLANNING_MARQUEE_ITEMS.map((item) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            className="h-44 w-full rounded-[1.35rem] border border-neutral-200/80 object-cover shadow-sm sm:h-48 md:rounded-[2rem]"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div
        className="relative -mx-1 motion-reduce:hidden sm:-mx-0"
        aria-hidden
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-12"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-12"
          aria-hidden
        />
        <div className="overflow-hidden rounded-[1.25rem] py-1">
          <div className="safety-planning-marquee-track items-stretch">
            <PlanningMarqueeStrip />
          </div>
        </div>
      </div>
    </div>
  )
}

function SafetyPlanningHeading() {
  return (
    <>
      <h3 className="mb-6 text-4xl font-bold tracking-tight text-neutral-700">Safety Planning</h3>
      <p className="mt-3 text-[1.85rem] leading-tight text-neutral-600 md:text-[2.2rem]">
        Safety Starts With Planning.
      </p>
    </>
  )
}

function SafetyPlanningIntro() {
  return (
    <div className="mt-8 text-[1rem] leading-relaxed text-neutral-600">
      <p>
        Safety at TCCE begins long before work starts in the field. Our teams analyze project conditions, define execution
        strategies, and identify risks early to ensure safe and controlled operations from the outset.
      </p>
      <div className="h-6" aria-hidden />
      <p>
        We develop structured planning processes that connect engineering, scheduling, and field execution—allowing us to
        anticipate challenges and reduce uncertainties.
      </p>
      <div className="h-6" aria-hidden />
      <p>
        Planning is not a one-time activity. It evolves throughout the project and is reinforced through short-term planning
        and daily alignment in the field.
      </p>
    </div>
  )
}

function SafetyPlanningRest() {
  return (
    <div className="text-[1rem] leading-relaxed text-neutral-600">
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
  )
}

function SafetyPlanningHero() {
  return (
    <div className="overflow-hidden rounded-[2.2rem] border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <img
        src={SAFETY_PLANNING_BIG_IMAGE}
        alt="Safety planning overview"
        className="block h-auto w-full max-w-full"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export default function SafetyPlanning() {
  return (
    <div className="mt-16">
      {/* Móvil: orden imagen entre intro y resto; sin grid que iguale filas a la altura de la foto */}
      <div className="flex flex-col gap-8 min-[951px]:hidden">
        <div className="text-left">
          <SafetyPlanningHeading />
          <SafetyPlanningIntro />
        </div>
        <SafetyPlanningHero />
        <div className="text-left">
          <SafetyPlanningRest />
        </div>
        <PlanningMarqueeBlock />
        <div className="flex justify-center">
          <ContactUsPillButton />
        </div>
      </div>

      {/* Escritorio: dos columnas flex; el texto fluye seguido en la izquierda (sin hueco gigante) */}
      <div className="hidden gap-8 min-[951px]:flex min-[951px]:flex-row min-[951px]:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-8 text-left">
          <div>
            <SafetyPlanningHeading />
            <SafetyPlanningIntro />
          </div>
          <SafetyPlanningRest />
          <ContactUsPillButton className="self-start" />
        </div>
        <div className="flex min-w-0 flex-[1.05] flex-col gap-8">
          <SafetyPlanningHero />
          <PlanningMarqueeBlock />
        </div>
      </div>
    </div>
  )
}
