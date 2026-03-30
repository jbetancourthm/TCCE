import CmListArrowIcon from '../../../utils/icons/construction/CmListArrowIcon'

const METHODOLOGY_ITEMS = [
  'Engineering-based decision making',
  'Continuous coordination with project stakeholders',
  'Strong operational oversight',
  'Proactive risk identification and mitigation',
] as const

const CM_INTRO_IMG = {
  src: '/images/construction-management/construction.png',
  alt: 'Construction management',
} as const

export default function ConstructionManagementIntro() {
  return (
    <div
      id="construction-management-methodology"
      className="col-span-full mx-auto grid w-[90%] min-w-0 mt-10 max-w-[95rem] grid-cols-1 gap-1 lg:grid-cols-[1.1fr_1fr] lg:gap-x-6 xl:gap-x-8"
    >
      <div className="hidden h-[12rem] w-full max-w-2xl overflow-hidden rounded-2xl border border-transparent bg-neutral-100 md:block md:h-[28rem]">
        <img
          src={CM_INTRO_IMG.src}
          alt={CM_INTRO_IMG.alt}
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-10 text-left max-lg:mt-0 lg:mt-10 lg:gap-12">
        <div>
          <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-700">
            <span aria-hidden className="h-[3px] w-18 bg-neutral-500" />
            Construction Management
          </p>
          <h4 className="mt-4 mb-6 text-4xl font-bold leading-tight text-neutral-600">Our work methodology is based on:</h4>

          <ul className="list-none space-y-1 text-lg leading-relaxed text-neutral-600">
            {METHODOLOGY_ITEMS.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CmListArrowIcon className="mt-2 h-[11px] w-[9px] shrink-0 text-[#E4611F]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-[12rem] w-full max-w-2xl overflow-hidden rounded-2xl border border-transparent bg-neutral-100 lg:hidden">
          <img
            src={CM_INTRO_IMG.src}
            alt=""
            className="h-full w-full rounded-2xl object-cover"
            aria-hidden
          />
        </div>

        <p className="text-lg leading-relaxed text-neutral-500">
          Through this structured approach, we ensure that every phase of the project is carefully planned, monitored, and
          executed to maintain schedule, budget, and quality objectives.
        </p>
      </div>
    </div>
  )
}
