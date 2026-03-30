import { ABOUT_OUR_CULTURE_IMAGE } from '../hooks/useAbout'
import AboutImageFrame from './AboutImageFrame'

const COMPLIANCE_LINES = [
  'Zero tolerance for harassment, discrimination, or retaliation',
  'Compliance with all labor, safety, and regulatory requirements',
  'Drug- and alcohol-free workplace standards',
  'Clear policies supporting ethical and professional behavior',
] as const

export default function OurCulture() {
  return (
    <section
      id="about-section-2"
      className="scroll-mt-28 pt-16 md:scroll-mt-32 md:pt-20"
      aria-labelledby="about-our-culture-heading"
    >
      <div className="grid grid-cols-1 gap-10 min-[1061px]:grid-cols-3 min-[1061px]:items-start min-[1061px]:gap-8 lg:gap-12">
        <div className="min-w-0">
          <h2
            id="about-our-culture-heading"
            className="text-3xl font-bold uppercase leading-tight tracking-tight text-neutral-700 md:text-4xl"
          >
            <span className="block">Our</span>
            <span className="block">culture</span>
          </h2>
          <div className="mt-8">
            <AboutImageFrame
              src={ABOUT_OUR_CULTURE_IMAGE}
              alt="Team member at the jobsite"
              roundedClassName="rounded-[1.5rem] md:rounded-[2rem]"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5 text-[1rem] leading-relaxed mt-10 text-neutral-600 md:gap-6 md:text-[1.05rem]">
          <p className="m-0 font-semibold text-neutral-700">
            A culture built on respect, accountability, and integrity.
          </p>
          <p className="m-0">
            At Total Civil Construction &amp; Engineering, our culture is grounded in professionalism, respect, and a
            shared commitment to performance.
          </p>
          <p className="m-0">
            We bring together individuals from diverse backgrounds and perspectives, fostering an environment where
            collaboration, accountability, and mutual respect drive strong results. We believe that diverse teams
            strengthen our ability to deliver better outcomes for our clients.
          </p>
          <p className="m-0">
            We are committed to maintaining a workplace that is inclusive, fair, and free from discrimination, harassment,
            and inappropriate behavior. Every individual is expected to contribute to a professional and respectful
            environment—both in the field and across the organization.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-5 mt-10 text-[1rem] leading-relaxed text-neutral-600 md:gap-6 md:text-[1.05rem]">
          <p className="m-0 text-lg font-semibold text-neutral-700">Compliance &amp; Standards</p>
          <p className="m-0">
            We operate in full compliance with all applicable laws, regulations, and industry standards, ensuring
            consistency, accountability, and ethical conduct in everything we do.
          </p>
          <div className="flex flex-col gap-3">
            {COMPLIANCE_LINES.map((line) => (
              <p key={line} className="m-0">
                {line}
              </p>
            ))}
          </div>
          <p className="m-0 font-semibold text-neutral-700">
            We believe that a strong culture is essential to delivering safe, reliable, and high-quality projects—built on
            trust, discipline, and respect.
          </p>
        </div>
      </div>
    </section>
  )
}
