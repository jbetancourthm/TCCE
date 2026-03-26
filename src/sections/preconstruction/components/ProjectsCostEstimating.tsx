import { useState } from 'react'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'

export default function ProjectsCostEstimating() {
  const [earthworkIndex, setEarthworkIndex] = useState(0)
  const [undergroundIndex, setUndergroundIndex] = useState(0)
  const [aerialIndex, setAerialIndex] = useState(0)

  return (
    <>
      <div className="mt-12 mx-auto grid max-w-[95rem] items-start gap-8 text-left md:grid-cols-[2fr_3fr]">
        <div>
          <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-700">
            <span aria-hidden className="h-[3px] w-18 bg-neutral-500" />
            Preconstruction
          </p>
          <h4 className="mt-4 text-4xl font-bold leading-tight text-neutral-600 mb-8">Projects Cost Estimating</h4>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Our Estimating Department provides accurate and competitive pricing to support successful civil and site
            development projects. Our team carefully analyzes construction documents, specifications, and site conditions to
            develop detailed quantity takeoffs and cost evaluations for earthwork, utilities and site preparation.
          </p>

          <div className="h-4" aria-hidden />

          <p className="mt-0 text-lg leading-relaxed text-neutral-500">
            By engaging early in the project lifecycle, we help identify potential challenges, evaluate construction
            alternatives, and develop cost-effective solutions before construction begins. Our team combines extensive field
            experience with advanced estimating technology to analyze drawings, specifications, and site conditions,
            ensuring every project is planned efficiently and aligned with schedule and budget expectations.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-transparent bg-neutral-100">
          <img
            src="/images/preconstruction/project-cost/estimating.png"
            alt="Project cost estimating"
            className="h-full w-full min-h-[22rem] rounded-2xl object-cover"
          />
        </div>
      </div>

      <section className="mt-14">
        <div className="mx-auto grid max-w-[95rem] items-center gap-10 md:grid-cols-[1fr_1fr]">
          <div className="text-center">
            <div className="relative h-90 w-full overflow-visible">
              <div className="h-full w-full overflow-hidden rounded-3xl border border-black/10 bg-neutral-100">
                <div
                  className="flex h-full w-[300%] transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${(earthworkIndex * 100) / 3}%)` }}
                >
                  {[0, 1, 2].map((i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i} className="relative h-full w-full flex-shrink-0">
                      <img
                        src="/images/preconstruction/project-cost/estimating.png"
                        alt="Project cost estimating"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Slide anterior"
                className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setEarthworkIndex((prev) => (prev + 2) % 3)}
              >
                <CarouselArrowIcon direction="left" />
              </button>

              <button
                type="button"
                aria-label="Slide siguiente"
                className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setEarthworkIndex((prev) => (prev + 1) % 3)}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i === earthworkIndex ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
                />
              ))}
            </div>
          </div>

          <div className="text-left">
            <h3 className="text-3xl font-bold tracking-tight mb-10 text-neutral-700 md:text-4xl">Digital Earthwork Solutions</h3>
            <p className="mt-6 text-lg leading-relaxed text-neutral-500">
              Our high-precision 3D models enable detailed grading analysis, construction scenario simulations, and optimized
              site balance for accurate cut-and-fill assessments.
            </p>
            <div className="h-4" aria-hidden />
            <p className="mt-0 text-lg leading-relaxed text-neutral-500">
              Integrated with GPS-guided equipment, they ensure precise field execution aligned with design, reducing rework
              and improving operational efficiency.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="text-left">
            <h3 className="text-3xl font-bold mb-10 tracking-tight text-neutral-700 md:text-4xl">Underground Systems Analysis</h3>
            <p className="mt-6 text-lg leading-relaxed text-neutral-500">
              Underground systems are brought to life through detailed 3D visualization, enabling layout validation, trench
              alignment analysis, and construction scenario simulation before work begins.
            </p>

            <div className="h-4" aria-hidden />

            <p className="mt-0 text-lg leading-relaxed text-neutral-500">
              Advanced clash detection and clearly defined clearance parameters allow conflicts to be identified and resolved
              early, reducing costly field issues and rework. Integrated data flows seamlessly to the field, delivering
              clear, actionable information that improves coordination and execution.
            </p>
          </div>

          <div className="relative h-90 w-full overflow-visible">
            <div className="h-full w-full overflow-hidden rounded-3xl border border-black/10 bg-neutral-100">
              <div
                className="flex h-full w-[300%] transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${(undergroundIndex * 100) / 3}%)` }}
              >
                {[0, 1, 2].map((i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i} className="relative h-full w-full flex-shrink-0">
                    <img
                      src="/images/preconstruction/project-cost/estimating.png"
                      alt="Underground systems slide"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Slide anterior"
              className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={() => setUndergroundIndex((prev) => (prev + 2) % 3)}
            >
              <CarouselArrowIcon direction="left" />
            </button>

            <button
              type="button"
              aria-label="Slide siguiente"
              className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={() => setUndergroundIndex((prev) => (prev + 1) % 3)}
            >
              <CarouselArrowIcon direction="right" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === undergroundIndex ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mx-auto grid max-w-[95rem] items-start gap-10 md:grid-cols-[1fr_1fr]">
          <div className="relative h-90 w-full overflow-hidden rounded-3xl">
            <img
              src="/images/preconstruction/project-cost/aerial.png"
              alt="Aerial site view"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-left md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Aerial Site Intelligence</p>
              <h3 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">Aerial Site Intelligence</h3>
              <p className="mt-5 text-sm leading-relaxed text-white/90 md:text-[15px]">
                Drone-based site capture provides accurate verification of existing conditions and project assumptions. By
                analyzing post-processed digital information captured from the field, we transform raw data into actionable
                insights. Leveraging this real-time data allows us to refine quantities, adjust scope, and improve bid
                accuracy—drastically reducing uncertainty and risk before construction even begins.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="relative h-90 w-full overflow-visible">
              <div className="h-full w-full overflow-hidden rounded-3xl border border-[#E4611F]/35 bg-neutral-100 shadow-[0_0_0_1px_rgba(228,97,31,0.12),0_12px_40px_rgba(0,0,0,0.12)]">
                <div
                  className="flex h-full w-[300%] transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${(aerialIndex * 100) / 3}%)` }}
                >
                  {[0, 1, 2].map((i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i} className="relative h-full w-full flex-shrink-0">
                      <img
                        src="/images/preconstruction/project-cost/aerial.png"
                        alt="Aerial site carousel"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Slide anterior"
                className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setAerialIndex((prev) => (prev + 2) % 3)}
              >
                <CarouselArrowIcon direction="left" />
              </button>

              <button
                type="button"
                aria-label="Slide siguiente"
                className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setAerialIndex((prev) => (prev + 1) % 3)}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i === aerialIndex ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[95rem] items-center justify-start gap-3 text-[#E4611F]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E4611F] text-white">↻</span>
          <span className="text-sm font-semibold">Contact Us</span>
        </div>
      </section>
    </>
  )
}
