import { ABOUT_WHO_WE_ARE_IMAGE } from '../hooks/useAbout'
import AboutBlockKicker from './AboutBlockKicker'
import AboutImageFrame from './AboutImageFrame'

export default function WhoWeAre() {
  return (
    <section
      id="about-section-0"
      className="scroll-mt-28 pt-0 md:scroll-mt-32"
      aria-labelledby="about-who-we-are-heading"
    >
      <div className="grid grid-cols-1 items-start gap-10 min-[1061px]:grid-cols-2 min-[1061px]:gap-12 lg:gap-14">
        <div className="order-2 min-w-0 min-[1061px]:order-1">
          <AboutImageFrame src={ABOUT_WHO_WE_ARE_IMAGE} alt="TCCE team and equipment at a civil construction site" />
        </div>

        <div className="order-1 min-w-0 min-[1061px]:order-2">
          <AboutBlockKicker />
          <h2
            id="about-who-we-are-heading"
            className="mt-6 text-3xl font-bold uppercase tracking-tight text-neutral-700 md:text-4xl"
          >
            Who we are
          </h2>
          <div className="mt-8 flex flex-col gap-6 text-[1rem] leading-relaxed text-neutral-600 md:mt-10 md:gap-7 md:text-[1.05rem]">
            <p className="m-0">
              TCCE delivers smart, modern civil construction powered by advanced technology and real engineering expertise.
              We specialize in earthwork, utilities, roads, and bridge-related infrastructure—planned with precision and
              built for performance.
            </p>
            <p className="m-0">
              Our clients trust us because we combine cutting-edge tools, disciplined execution, and a skilled, diverse
              workforce to anticipate challenges, optimize solutions, and deliver results that stand out.
            </p>
            <p className="m-0 font-semibold text-neutral-700">
              TCCE isn&apos;t just a contractor. We&apos;re a strategic partner committed to building better, faster, and
              smarter.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
