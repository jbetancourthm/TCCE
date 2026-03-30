import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import NavItemCaret from '../../../utils/icons/header/NavItemCaret'
import { ABOUT_WORKFORCE_IMAGE } from '../hooks/useAbout'

const CAPABILITIES = [
  'Workforce planning aligned with project scope and requirements',
  'Recruitment and onboarding of qualified field personnel',
  'Training programs focused on safety, performance, and execution',
  'Employee engagement and retention',
  'Performance management and continuous improvement',
  'Compliance with labor regulations and industry standards',
] as const

function CapabilityLine({ text }: { text: string }) {
  return (
    <p className="mt-[0.35rem] flex items-start gap-1.5 text-[1rem] leading-relaxed text-neutral-600 md:text-[1.05rem]">
      <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
      <span>{text}</span>
    </p>
  )
}

export default function WorkforceAndPeople() {
  return (
    <section
      id="about-section-3"
      className="scroll-mt-28 pt-16 md:scroll-mt-32 md:pt-20"
      aria-labelledby="about-workforce-heading"
    >
      <div className="grid grid-cols-1 gap-10 min-[1061px]:grid-cols-[45fr_55fr] min-[1061px]:items-start min-[1061px]:gap-12 lg:gap-14">
        <div className="min-w-0 text-left">
          <p className="text-xl font-bold uppercase text-neutral-800 md:text-2xl lg:text-3xl">
            Workforce &amp; people
          </p>
          <h2
            id="about-workforce-heading"
            className="mt-5 text-2xl font-bold leading-tight ml-1 text-neutral-800 md:mt-6 md:text-3xl lg:text-[2rem]"
          >
            Building strong teams to deliver strong projects.
          </h2>
          <div className="mt-8 flex flex-col gap-5 text-[1rem] leading-relaxed text-neutral-600 md:gap-6 md:text-[1.05rem]">
            <p className="m-0">
              At Total Civil Construction &amp; Engineering, our people are at the core of every successful project. We
              build and support a highly skilled workforce aligned with the technical and operational demands of each
              project.
            </p>
            <p className="m-0">
              We ensure that every project is backed by the right talent—properly trained, aligned with project objectives,
              and ready to execute according to plan. Our teams contribute not only to execution, but to the analysis,
              planning, and successful delivery of each project.
            </p>
            <p className="m-0">
              Our approach integrates workforce planning, training, and continuous development to support projects from
              early stages through execution—ensuring consistency, reliability, and performance in the field.
            </p>
          </div>
          <div className="mt-8 flex justify-center min-[1061px]:justify-start">
            <ContactUsPillButton />
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-lg font-semibold text-neutral-700">Key Capabilities</p>
          <div className="mt-4 pb-4 md:pb-5">
            {CAPABILITIES.map((c) => (
              <CapabilityLine key={c} text={c} />
            ))}
          </div>
          <p className="mt-0 font-semibold text-neutral-700">
            We ensure that our teams are ready to perform—skilled, aligned, and committed from day one.
          </p>
          <div className="mt-8 min-w-0 overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
            <div className="h-56 overflow-hidden sm:h-60 md:h-64 lg:h-72">
              <img
                src={ABOUT_WORKFORCE_IMAGE}
                alt="Paving crew and equipment on a TCCE jobsite"
                className="h-full w-full scale-[1.08] object-cover object-[center_76%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
