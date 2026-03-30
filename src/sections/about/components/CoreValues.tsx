import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import NavItemCaret from '../../../utils/icons/header/NavItemCaret'
import { ABOUT_CORE_VALUES_IMAGES } from '../hooks/useAbout'
import AboutBlockKicker from './AboutBlockKicker'
import AboutImageFrame from './AboutImageFrame'

const VALUES = [
  'Safety First',
  'Trust & Transparency',
  'Clear Communication',
  'Innovation & Continuous Improvement',
  'Multicultural Teamwork',
  'Operational Excellence',
] as const

function ValueLine({ text }: { text: string }) {
  return (
    <p className="mt-[0.35rem] flex items-start gap-1.5 text-[1rem] leading-relaxed text-neutral-600 md:text-[1.05rem]">
      <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
      <span>{text}</span>
    </p>
  )
}

export default function CoreValues() {
  return (
    <section
      id="about-section-1"
      className="scroll-mt-28 pt-16 md:scroll-mt-32 md:pt-20"
      aria-labelledby="about-core-values-heading"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[45fr_55fr] md:items-start md:gap-12 lg:gap-14">
        <div className="min-w-0">
          <AboutBlockKicker />
          <h2
            id="about-core-values-heading"
            className="mt-6 text-3xl font-bold uppercase tracking-tight text-neutral-700 md:text-4xl"
          >
            Our core values
          </h2>
          <div className="mt-4 pb-4 md:pb-5">
            {VALUES.map((v) => (
              <ValueLine key={v} text={v} />
            ))}
          </div>
          <p className="text-[1rem] leading-relaxed text-neutral-600 md:text-[1.05rem]">
            These values shape how we work, how we collaborate, and the results we deliver.
          </p>
          <div className="mt-2 flex justify-center md:justify-start">
            <ContactUsPillButton />
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          <AboutImageFrame
            src={ABOUT_CORE_VALUES_IMAGES.left}
            alt="Construction site with TCCE field presence"
            roundedClassName="rounded-[1.35rem] md:rounded-[2rem]"
          />
          <AboutImageFrame
            src={ABOUT_CORE_VALUES_IMAGES.right}
            alt="Heavy equipment and team on site"
            roundedClassName="rounded-[1.35rem] md:rounded-[2rem]"
          />
        </div>
      </div>
    </section>
  )
}
