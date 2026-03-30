import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import { useProjectsCostEstimatingCarousels } from '../hooks/useProjectsCostEstimatingCarousels'

const AERIAL_SITE_VIDEO_SRC = '/videos/preconstruction/TCC_Drone_v3.mp4'

export default function ProjectsCostEstimating() {
  const { earthwork: ew, underground: ug, aerial: ar } = useProjectsCostEstimatingCarousels()

  return (
    <div id="preconstruction-projects-cost-estimating" className="w-full">
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

      <section id="preconstruction-digital-earthwork" className="mt-14 scroll-mt-28">
        <div className="mx-auto grid max-w-[95rem] items-center gap-10 md:grid-cols-[1fr_1fr]">
          <div className="text-center">
            <div className="w-full overflow-hidden rounded-3xl border border-transparent bg-neutral-100">
              <div
                className="w-full"
                style={
                  ew.firstSlideNatural
                    ? { aspectRatio: `${ew.firstSlideNatural.w} / ${ew.firstSlideNatural.h}` }
                    : { minHeight: '12rem' }
                }
              >
                <img
                  src={ew.images[0]}
                  alt="Digital earthwork"
                  className="h-full w-full object-contain"
                  onLoad={ew.onFirstSlideLoad}
                />
              </div>
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

      <section id="preconstruction-underground-systems" className="mt-14 scroll-mt-28">
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
                ug.firstSlideNatural
                  ? { aspectRatio: `${ug.firstSlideNatural.w} / ${ug.firstSlideNatural.h}` }
                  : { minHeight: '12rem' }
              }
            >
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{
                  width: `${ug.images.length * 100}%`,
                  transform: `translateX(-${ug.index * ug.slideBasisPct}%)`,
                }}
              >
                {ug.images.map((src, i) => (
                  <div
                    key={src}
                    className="relative flex h-full min-h-0 flex-shrink-0 items-center justify-center overflow-hidden"
                    style={{ flex: `0 0 ${ug.slideBasisPct}%` }}
                  >
                    <img
                      src={src}
                      alt={`Underground systems slide ${i + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onLoad={i === 0 ? ug.onFirstSlideLoad : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Slide anterior"
              className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={ug.goPrevious}
            >
              <CarouselArrowIcon direction="left" />
            </button>

            <button
              type="button"
              aria-label="Slide siguiente"
              className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={ug.goNext}
            >
              <CarouselArrowIcon direction="right" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-3">
              {ug.images.map((src, i) => (
                <span
                  key={src}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === ug.index ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="preconstruction-aerial-site-intelligence" className="mt-14 w-full scroll-mt-28 self-stretch">
        <div className="mx-auto flex w-full max-w-[95rem] flex-col items-stretch gap-6 max-xl:items-center xl:flex-row xl:items-stretch xl:gap-5">
          {/* Móvil / tablet (hasta xl): columna; desde xl: vídeo a la izquierda + carrusel a la derecha. */}
          <div
            className="relative w-full max-w-full min-w-0 flex-shrink-0 overflow-hidden rounded-3xl bg-white max-xl:mx-auto xl:self-start xl:w-[50vw] xl:max-w-none xl:-ml-6 2xl:-ml-10"
          >
            <video
              className="relative z-0 block h-auto w-full max-w-full object-cover object-center"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Aerial site view, drone footage"
            >
              <source src={AERIAL_SITE_VIDEO_SRC} type="video/mp4" />
            </video>
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-black/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[min(72%,24rem)] min-h-[15rem] rounded-t-xl bg-gradient-to-t from-black/28 via-black/8 to-transparent [mask-image:linear-gradient(to_right,transparent_0%,black_2.5rem)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_2.5rem)] xl:h-[min(52%,22rem)] xl:rounded-t-[2.5rem] xl:[mask-image:linear-gradient(to_right,transparent_0%,black_3rem)] xl:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_3rem)]"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 z-[3] max-w-full bg-transparent px-4 pb-5 pt-2 text-left sm:px-6 sm:pb-6 xl:p-10">
              <h3 className="text-lg font-bold leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.65),0_2px_16px_rgba(0,0,0,0.35)] sm:text-xl xl:text-3xl xl:leading-tight">
                Aerial Site Intelligence
              </h3>
              <div className="mt-3 flex max-w-full flex-col gap-3 sm:mt-4 sm:gap-4 xl:mt-5 xl:gap-7">
                <p className="max-w-full text-xs leading-snug text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] sm:text-sm sm:leading-relaxed xl:text-[15px]">
                  Drone-based site capture provides accurate verification of existing conditions and project assumptions.
                </p>
                <p className="max-w-full text-xs leading-snug text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)] sm:text-sm sm:leading-relaxed xl:text-[15px]">
                  By analyzing post-processed digital information captured from the field, we transform raw data into actionable
                  insights. Leveraging this real-time data allows us to refine quantities, adjust scope, and improve bid
                  accuracy—drastically reducing uncertainty and risk before construction even begins.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 w-full flex-1 text-center xl:flex xl:flex-col xl:justify-center">
            <div className="relative w-full overflow-visible">
              <div
                className="w-full overflow-hidden rounded-3xl border border-transparent bg-white"
                style={
                  ar.firstSlideNatural
                    ? { aspectRatio: `${ar.firstSlideNatural.w} / ${ar.firstSlideNatural.h}` }
                    : { minHeight: '12rem' }
                }
              >
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${ar.images.length * 100}%`,
                    transform: `translateX(-${ar.index * ar.slideBasisPct}%)`,
                  }}
                >
                  {ar.images.map((src, i) => (
                    <div
                      key={src}
                      className="relative flex h-full flex-shrink-0 items-center justify-center"
                      style={{ flex: `0 0 ${ar.slideBasisPct}%` }}
                    >
                      <img
                        src={src}
                        alt={`Project cost gallery ${i + 1}`}
                        className="max-h-full max-w-full object-contain"
                        onLoad={i === 0 ? ar.onFirstSlideLoad : undefined}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                aria-label="Slide anterior"
                className="absolute left-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={ar.goPrevious}
              >
                <CarouselArrowIcon direction="left" />
              </button>

              <button
                type="button"
                aria-label="Slide siguiente"
                className="absolute right-[-1.5rem] top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center transition-transform duration-200 hover:scale-110"
                onClick={ar.goNext}
              >
                <CarouselArrowIcon direction="right" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              {ar.images.map((src, i) => (
                <span
                  key={src}
                  className={`h-2.5 w-2.5 rounded-full ${i === ar.index ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
