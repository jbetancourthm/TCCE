import { useState } from 'react'
import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'

const AERIAL_CAROUSEL_IMAGES = [
  '/images/preconstruction/project-cost/last1.png',
  '/images/preconstruction/project-cost/last2.png',
  '/images/preconstruction/project-cost/last3.png',
] as const

const aerialSlideBasisPct = 100 / AERIAL_CAROUSEL_IMAGES.length

const EARTHWORK_CAROUSEL_IMAGES = [
  '/images/preconstruction/project-cost/first1.png',
  '/images/preconstruction/project-cost/first1.png',
  '/images/preconstruction/project-cost/first1.png',
] as const

const earthworkSlideBasisPct = 100 / EARTHWORK_CAROUSEL_IMAGES.length

const UNDERGROUND_CAROUSEL_IMAGES = [
  '/images/preconstruction/project-cost/second1.png',
  '/images/preconstruction/project-cost/second2.png',
] as const

const undergroundSlideBasisPct = 100 / UNDERGROUND_CAROUSEL_IMAGES.length

export default function ProjectsCostEstimating() {
  const [earthworkIndex, setEarthworkIndex] = useState(0)
  const [undergroundIndex, setUndergroundIndex] = useState(0)
  const [aerialIndex, setAerialIndex] = useState(0)
  /** Proporción natural de la primera imagen del carrusel (visor). */
  const [earthworkFirstSlideNatural, setEarthworkFirstSlideNatural] = useState<{ w: number; h: number } | null>(null)
  const [undergroundFirstSlideNatural, setUndergroundFirstSlideNatural] = useState<{ w: number; h: number } | null>(null)
  /** Tamaño del visor del carrusel = proporción natural de last1 (no la altura máx. de las 3). */
  const [aerialFirstSlideNatural, setAerialFirstSlideNatural] = useState<{ w: number; h: number } | null>(null)

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
            <div className="relative w-full overflow-visible">
              <div
                className="w-full overflow-hidden rounded-3xl border border-transparent bg-neutral-100"
                style={
                  earthworkFirstSlideNatural
                    ? { aspectRatio: `${earthworkFirstSlideNatural.w} / ${earthworkFirstSlideNatural.h}` }
                    : { minHeight: '12rem' }
                }
              >
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${EARTHWORK_CAROUSEL_IMAGES.length * 100}%`,
                    transform: `translateX(-${earthworkIndex * earthworkSlideBasisPct}%)`,
                  }}
                >
                  {EARTHWORK_CAROUSEL_IMAGES.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className="relative flex h-full min-h-0 flex-shrink-0 items-center justify-center overflow-hidden"
                      style={{ flex: `0 0 ${earthworkSlideBasisPct}%` }}
                    >
                      <img
                        src={src}
                        alt={`Digital earthwork slide ${i + 1}`}
                        className="max-h-full max-w-full object-contain"
                        onLoad={
                          i === 0
                            ? (e) => {
                                const img = e.currentTarget
                                if (img.naturalWidth > 0) {
                                  setEarthworkFirstSlideNatural({ w: img.naturalWidth, h: img.naturalHeight })
                                }
                              }
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Slide anterior"
                className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() =>
                  setEarthworkIndex((prev) => (prev + EARTHWORK_CAROUSEL_IMAGES.length - 1) % EARTHWORK_CAROUSEL_IMAGES.length)
                }
              >
                <CarouselArrowIcon direction="left" />
              </button>

              <button
                type="button"
                aria-label="Slide siguiente"
                className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setEarthworkIndex((prev) => (prev + 1) % EARTHWORK_CAROUSEL_IMAGES.length)}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {EARTHWORK_CAROUSEL_IMAGES.map((src, i) => (
                <span
                  key={`dot-${src}-${i}`}
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
            <ContactUsPillButton className="mt-8" />
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="mx-auto grid max-w-[95rem] items-center gap-10 md:grid-cols-[1fr_1.2fr]">
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

          <div className="relative w-full overflow-visible">
            <div
              className="w-full overflow-hidden rounded-3xl border border-transparent bg-neutral-100"
              style={
                undergroundFirstSlideNatural
                  ? { aspectRatio: `${undergroundFirstSlideNatural.w} / ${undergroundFirstSlideNatural.h}` }
                  : { minHeight: '12rem' }
              }
            >
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{
                  width: `${UNDERGROUND_CAROUSEL_IMAGES.length * 100}%`,
                  transform: `translateX(-${undergroundIndex * undergroundSlideBasisPct}%)`,
                }}
              >
                {UNDERGROUND_CAROUSEL_IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className="relative flex h-full min-h-0 flex-shrink-0 items-center justify-center overflow-hidden"
                    style={{ flex: `0 0 ${undergroundSlideBasisPct}%` }}
                  >
                    <img
                      src={src}
                      alt={`Underground systems slide ${i + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onLoad={
                        i === 0
                          ? (e) => {
                              const img = e.currentTarget
                              if (img.naturalWidth > 0) {
                                setUndergroundFirstSlideNatural({ w: img.naturalWidth, h: img.naturalHeight })
                              }
                            }
                          : undefined
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Slide anterior"
              className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={() =>
                setUndergroundIndex(
                  (prev) => (prev + UNDERGROUND_CAROUSEL_IMAGES.length - 1) % UNDERGROUND_CAROUSEL_IMAGES.length,
                )
              }
            >
              <CarouselArrowIcon direction="left" />
            </button>

            <button
              type="button"
              aria-label="Slide siguiente"
              className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={() => setUndergroundIndex((prev) => (prev + 1) % UNDERGROUND_CAROUSEL_IMAGES.length)}
            >
              <CarouselArrowIcon direction="right" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-3">
              {UNDERGROUND_CAROUSEL_IMAGES.map((src, i) => (
                <span
                  key={src}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === undergroundIndex ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 w-full self-stretch">
        <div className="mx-auto flex w-full max-w-[95rem] flex-col items-stretch gap-6 md:flex-row md:items-stretch md:gap-4 lg:gap-5">
          {/* Sangrado al borde izquierdo del viewport: compensar el padding del Container (px-4 sm:px-6 lg:px-8 xl:px-10) */}
          <div
            className="relative flex-shrink-0 overflow-hidden rounded-3xl
              max-sm:w-[calc(100%+1rem)] max-sm:-ml-4
              sm:max-md:w-[calc(100%+1.5rem)] sm:max-md:-ml-6
              md:w-[50vw] md:max-w-none md:rounded-l-none md:rounded-r-3xl
              md:-ml-6 lg:-ml-8 xl:-ml-10"
          >
            <img
              src="/images/preconstruction/project-cost/aerial.png"
              alt="Aerial site view"
              className="block h-auto w-full max-w-full"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(58%,20rem)] rounded-t-[2rem] bg-gradient-to-t from-black/28 via-black/8 to-transparent md:h-[min(52%,22rem)] md:rounded-t-[2.5rem]"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-8 text-left md:p-10">
              <h3 className="text-2xl font-bold leading-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.65),0_2px_16px_rgba(0,0,0,0.35)] md:text-3xl">
                Aerial Site Intelligence
              </h3>
              <div className="mt-5 flex flex-col gap-6 md:gap-7">
                <p className="text-sm leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] md:text-[15px]">
                  Drone-based site capture provides accurate verification of existing conditions and project assumptions.
                </p>
                <p className="text-sm leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] md:text-[15px]">
                  By analyzing post-processed digital information captured from the field, we transform raw data into actionable
                  insights. Leveraging this real-time data allows us to refine quantities, adjust scope, and improve bid
                  accuracy—drastically reducing uncertainty and risk before construction even begins.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1 text-center md:flex md:flex-col md:justify-center">
            <div className="relative w-full overflow-visible">
              <div
                className="w-full overflow-hidden rounded-3xl border border-transparent bg-white"
                style={
                  aerialFirstSlideNatural
                    ? { aspectRatio: `${aerialFirstSlideNatural.w} / ${aerialFirstSlideNatural.h}` }
                    : { minHeight: '12rem' }
                }
              >
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${AERIAL_CAROUSEL_IMAGES.length * 100}%`,
                    transform: `translateX(-${aerialIndex * aerialSlideBasisPct}%)`,
                  }}
                >
                  {AERIAL_CAROUSEL_IMAGES.map((src, i) => (
                    <div
                      key={src}
                      className="relative flex h-full flex-shrink-0 items-center justify-center"
                      style={{ flex: `0 0 ${aerialSlideBasisPct}%` }}
                    >
                      <img
                        src={src}
                        alt={`Project cost gallery ${i + 1}`}
                        className="max-h-full max-w-full object-contain"
                        onLoad={
                          i === 0
                            ? (e) => {
                                const img = e.currentTarget
                                if (img.naturalWidth > 0) {
                                  setAerialFirstSlideNatural({ w: img.naturalWidth, h: img.naturalHeight })
                                }
                              }
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Slide anterior"
                className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setAerialIndex((prev) => (prev + AERIAL_CAROUSEL_IMAGES.length - 1) % AERIAL_CAROUSEL_IMAGES.length)}
              >
                <CarouselArrowIcon direction="left" />
              </button>

              <button
                type="button"
                aria-label="Slide siguiente"
                className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={() => setAerialIndex((prev) => (prev + 1) % AERIAL_CAROUSEL_IMAGES.length)}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {AERIAL_CAROUSEL_IMAGES.map((src, i) => (
                <span
                  key={src}
                  className={`h-2.5 w-2.5 rounded-full ${i === aerialIndex ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
