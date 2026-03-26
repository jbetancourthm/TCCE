import { useState } from 'react'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'

export default function ProjectsCostEstimating() {
  const [earthworkIndex, setEarthworkIndex] = useState(0)
  const [undergroundIndex, setUndergroundIndex] = useState(0)

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
        <div className="relative">
          <div className="flex items-stretch justify-center gap-6">
            <div className="relative hidden h-[22rem] w-full max-w-[34rem] overflow-hidden rounded-3xl bg-neutral-200 md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/65 via-neutral-700/40 to-neutral-300/40" />
              <div className="absolute left-10 top-10 text-xs font-semibold text-white/70">Estas van aca</div>
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Aerial Site Intelligence</p>
                <h4 className="mt-3 text-3xl font-bold text-white">Aerial Site Intelligence</h4>
                <p className="mt-5 text-sm leading-relaxed text-white/80">
                  Drone-based site capture provides accurate verification of existing conditions and project assumptions. By
                  analyzing post-processed digital information captured from the field, we transform raw data into actionable
                  insights.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  Leveraging this real-time data allows us to refine quantities, adjust scope, and improve bid accuracy,
                  dramatically reducing uncertainty and risk before construction even begins.
                </p>
              </div>
            </div>

            <div className="relative h-[22rem] w-full max-w-[26rem] overflow-hidden rounded-3xl bg-neutral-200 md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/40 via-neutral-300/60 to-neutral-100/70" />
              <div className="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#E4611F] bg-white/10" />
              <div className="absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#E4611F] bg-white/10" />
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-[18%] top-10 h-36 w-5 rounded-md bg-[#0B2B6E]" />
                <div className="absolute left-[18%] top-10 h-36 w-1 bg-[#E4611F]" />
                <div className="absolute right-[18%] top-10 h-36 w-5 rounded-md bg-[#0B2B6E]" />
                <div className="absolute right-[18%] top-10 h-36 w-1 bg-[#E4611F]" />
              </div>
            </div>

            <div className="relative hidden h-[22rem] w-24 overflow-hidden rounded-3xl bg-neutral-200/70 md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-300/60 to-neutral-50/80" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-start gap-3 px-2 text-[#E4611F]">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E4611F] text-white">↻</span>
            <span className="text-sm font-semibold">Contact Us</span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#E4611F]" />
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
            <span className="h-2 w-2 rounded-full bg-neutral-300" />
          </div>
        </div>
      </section>
    </>
  )
}
