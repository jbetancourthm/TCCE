import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import PreliminaryConstructionPlanWatermark from '../../../utils/graphics/PreliminaryConstructionPlanWatermark'
import GalleryExpandIcon from '../../../utils/icons/gallery/GalleryExpandIcon'
import { usePreliminaryPlanGallery } from '../hooks/usePreliminaryPlanGallery'
import PreliminaryGalleryModal from './PreliminaryGalleryModal'

const PRELIMINARY_GALLERY_IMAGES = [
  '/images/preconstruction/preliminary/second1.png',
  '/images/preconstruction/preliminary/second2.png',
  '/images/preconstruction/preliminary/second3.png',
] as const

export default function PreliminaryConstructionPlan() {
  const { galleryOpen, galleryIndex, openGalleryAt, closeGallery } = usePreliminaryPlanGallery()

  return (
    <>
      <div className="mt-12 mx-auto grid max-w-[90rem] items-start gap-1 text-left md:grid-cols-[1.15fr_1fr]">
        <div className="h-[14rem] w-full max-w-2xl overflow-hidden rounded-2xl border border-transparent bg-neutral-100 md:h-[30rem]">
          <img
            src="/images/preconstruction/preliminary/pre.png"
            alt="Preliminary Construction Plan"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div>
          <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-700">
            <span aria-hidden className="h-[3px] w-18 bg-neutral-500" />
            Preconstruction
          </p>
          <h4 className="mt-4 text-4xl font-bold leading-tight text-neutral-600 mb-8">Preliminary Construction Plan</h4>

          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Our expertise helps you bid and plan with confidence, visual clarity and supporting data-driven decisions that
            protect overall project success. Our team delivers through critical path analysis, lead-time management, and
            scenario-based acceleration strategies that enable contractors and developers to submit competitive, realistic,
            and well-informed bids and contracts.
          </p>

          <div className="h-4" aria-hidden />

          <p className="mt-0 text-lg leading-relaxed text-neutral-500">
            Through 4D and 5D construction planning, we analyze project scope, schedules, work fronts, and constructability
            to identify risks and opportunities early. By aligning planning with estimating and procurement strategies, we
            help our clients reduce uncertainty, avoid costly assumptions, and strengthen their proposals, project
            milestones, and key deliverables.
          </p>
        </div>
      </div>

      {/* Sangrado al ancho del viewport (mismo padding que Container: px-4 sm:px-6 lg:px-8 xl:px-10) */}
      <div
        className="mt-12 max-w-none self-stretch w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3rem)] sm:-mx-6 lg:w-[calc(100%+4rem)] lg:-mx-8 xl:w-[calc(100%+5rem)] xl:-mx-10"
      >
        <div className="grid grid-cols-1 gap-px md:grid-cols-3 md:gap-6">
          {PRELIMINARY_GALLERY_IMAGES.map((src, i) => (
            <div key={src} className="relative overflow-hidden bg-neutral-100">
              <img
                src={src}
                alt={`Preliminary construction planning ${i + 1}`}
                className="h-72 w-full object-cover md:h-80"
              />
            <button
              type="button"
              className="group absolute right-2 top-2 z-10 flex items-center justify-center rounded-lg bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4611F] focus-visible:ring-offset-2"
              aria-label={`Ampliar imagen ${i + 1}`}
              onClick={() => openGalleryAt(i)}
            >
              <GalleryExpandIcon className="h-11 w-11 origin-center transform-gpu drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-125 group-active:scale-110 sm:h-12 sm:w-12" />
            </button>
          </div>
        ))}
        </div>
      </div>

      <PreliminaryGalleryModal
        images={PRELIMINARY_GALLERY_IMAGES}
        isOpen={galleryOpen}
        initialIndex={galleryIndex}
        onClose={closeGallery}
      />

      {/* Capa decorativa: ancho viewport, altura intrínseca del SVG (sin recorte) */}
      <div className="relative h-0 w-full overflow-visible">
        <div
          className="pointer-events-none absolute left-1/2 top-5 z-[1] w-screen max-w-[100vw] -translate-x-1/2 -translate-y-1/2 select-none sm:top-6"
          aria-hidden
        >
          <PreliminaryConstructionPlanWatermark className="block h-auto w-full max-w-none" />
        </div>
      </div>

      <div className="relative z-[2] mx-auto mt-16 w-[85%] max-w-[95rem]">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_1.8fr]">
          <div className="text-left">
            <h4 className="mt-10 text-3xl font-bold leading-tight text-neutral-600 mb-8">
              We build your project before breaking ground.
            </h4>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Using digital twins, we create a precise virtual replica of your project - stress-testing decisions, catching
              conflicts, and locking in scope before a single dollar hits the field.
            </p>
            <div className="h-4" aria-hidden />
            <p className="mt-0 text-lg leading-relaxed text-neutral-500">
              The result: tighter planning, fewer surprises, and a construction team that moves with clarity from day one.
            </p>
            <ContactUsPillButton className="mt-8" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-transparent bg-neutral-100">
            <img
              src="/images/preconstruction/preliminary/third1.png"
              alt="Preconstruction planning"
              className="h-full w-full min-h-[22rem] rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 w-[95%] max-w-[95rem]">
        <section
          className="relative w-full overflow-hidden rounded-3xl border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
          aria-labelledby="preliminary-every-milestone-heading"
        >
          <img
            src="/images/preconstruction/every.png"
            alt=""
            className="absolute inset-0 h-full w-full origin-center object-cover scale-[1.06]"
            decoding="async"
          />
          <div className="relative z-10 flex min-h-[34rem] flex-col items-center justify-center px-5 py-24 text-center sm:px-8 md:min-h-[40rem] md:py-28 lg:min-h-[44rem] lg:py-36">
            <h2
              id="preliminary-every-milestone-heading"
              className="max-w-4xl text-3xl font-bold mb-8 leading-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-snug"
            >
              Every milestone, delivered with precision
            </h2>
            <p className="mt-8 max-w-4xl text-base font-normal leading-relaxed text-white md:text-lg">
              We don&apos;t guess at progress — we engineer it. Detailed, logic-driven schedules are built and coordinated
              directly within our digital twin environment, linking every activity to the live 3D model. This means scope,
              sequence, and timing are validated together — not in silos. Our clients get real-time visibility into project
              status, honest timelines, and the confidence that every milestone was planned to be hit — not hoped for.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
