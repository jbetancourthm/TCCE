import NavItemCaret from '../../../utils/icons/header/NavItemCaret'
import { ABOUT_LEADERSHIP_IMAGE } from '../hooks/useAbout'
import AboutImageFrame from './AboutImageFrame'

const PRINCIPLES = [
  'Lead by example in safety, planning, and execution',
  'Drive accountability and ownership at all levels',
  'Communicate clearly and make timely decisions',
  'Develop and support high-performing teams',
  'Anticipate challenges and act proactively',
  'Stay closely connected to field operations',
] as const

function PrincipleLine({ text }: { text: string }) {
  return (
    <p className="mt-[0.35rem] flex items-start gap-1.5 text-[1rem] leading-relaxed text-neutral-600 md:text-[1.05rem]">
      <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
      <span>{text}</span>
    </p>
  )
}

export default function OurLeadership() {
  return (
    <section
      id="about-section-4"
      className="scroll-mt-28 pt-16 md:scroll-mt-32 md:pt-20"
      aria-labelledby="about-leadership-heading"
    >
      <header className="max-w-4xl">
        <p className="text-lg font-bold text-neutral-700">Our Leadership</p>
        <h2
          id="about-leadership-heading"
          className="mt-3 text-2xl font-semibold leading-tight text-neutral-600 md:text-3xl lg:text-[2.15rem]"
        >
          Leadership That Drives Planning, Execution, And Results.
        </h2>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14">
        <div className="min-w-0">
          <AboutImageFrame
            src={ABOUT_LEADERSHIP_IMAGE}
            alt="Leadership and crew in front of equipment"
            roundedClassName="rounded-[1.5rem] md:rounded-[2rem]"
          />
        </div>

        <div className="min-w-0 text-[1rem] leading-relaxed text-neutral-600 md:text-[1.05rem]">
          <p>
            At Total Civil Construction &amp; Engineering, leadership is defined by the ability to deliver results through
            people, planning, and disciplined execution.
          </p>
          <div className="h-5" aria-hidden />
          <p>
            Our leaders are actively involved across all stages of a project—from early analysis and planning to field
            execution—ensuring alignment, clarity, and performance. Our field leaders are trained under industry-recognized
            safety standards, enabling strong decision-making and disciplined execution on every project.
          </p>
          <div className="h-5" aria-hidden />
          <p>We believe strong leadership builds strong teams—and strong teams deliver reliable results.</p>
          <div className="h-8" aria-hidden />
          <p className="font-semibold text-neutral-700">Leadership Principles</p>
          <div className="mt-4">
            {PRINCIPLES.map((p) => (
              <PrincipleLine key={p} text={p} />
            ))}
          </div>
          <div className="h-8" aria-hidden />
          <p className="font-semibold text-neutral-700">
            We don&apos;t just manage projects—we lead teams that plan, execute, and deliver them successfully.
          </p>
        </div>
      </div>
    </section>
  )
}
