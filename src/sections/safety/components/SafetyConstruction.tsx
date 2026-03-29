import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import NavItemCaret from '../../../utils/icons/header/NavItemCaret'
import { SAFETY_CONSTRUCTION_MAIN_IMAGE, useSafetyConstructionCarousel } from '../hooks/useSafety'

const OPERATIONAL_PRACTICE_ITEMS = [
  'Daily PTP huddles before starting work',
  'Clear definition of work steps, hazards, and mitigation measures',
  'Interactive communication to ensure full team understanding',
  'Ongoing field supervision and real-time risk identification',
  'Mid-day (after lunch) huddies to maintain alignment',
  'Field leadership trained under OSHA 510 standards and aligned with industry best practices',
  'Continuous safety training and certifications',
  'Incident prevention and continuous improvement',
  'Full compliance with OSHA and project-specific requirements',
] as const

function OperationalPracticeLine({ text, caretClass = 'mt-[0.15rem]' }: { text: string; caretClass?: string }) {
  return (
    <p className="mt-[0.4rem] flex items-start gap-1.5">
      <NavItemCaret className={`h-4 w-4 shrink-0 -rotate-90 text-[#E4611F] ${caretClass}`} />
      <span>{text}</span>
    </p>
  )
}

export default function SafetyConstruction() {
  const { pages, pageCount, currentPage, setCurrentPage, goToPreviousPage, goToNextPage } =
    useSafetyConstructionCarousel()

  return (
    <div className="mt-16 text-left">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.05fr] md:items-start">
        <div className="min-w-0">
          <h3 className="text-4xl mb-6 font-bold tracking-tight text-neutral-700">Safety Construction</h3>
          <p className="mt-3 text-[1.85rem] leading-tight text-neutral-600 md:text-[2.2rem]">
            Disciplined Execution In The Field.
          </p>

          <div className="mt-8 text-[1rem] leading-relaxed text-neutral-600">
            <p>Safety is reinforced through disciplined execution and structured communication in the field.</p>
            <div className="h-6" aria-hidden />
            <p>
              Every workday begins with a Pre-Task Planning (PTP) huddle, where teams review the work to be performed,
              identify hazards, define mitigation measures, and ensure full understanding before execution begins.
            </p>
            <div className="h-6" aria-hidden />
            <p>
              Safety is actively managed throughout the day through continuous supervision, communication, and team
              engagement.
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col overflow-hidden rounded-[2.2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <img
            src={SAFETY_CONSTRUCTION_MAIN_IMAGE}
            alt="Safety construction overview"
            className="block h-auto w-full max-w-full shrink-0"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="mx-auto mt-8 w-[90%] text-[1rem] leading-relaxed text-neutral-600">
        <p className="font-semibold text-neutral-700">Operational Practices</p>
        <div className="h-4" aria-hidden />

        <div className="flex flex-col md:hidden">
          {OPERATIONAL_PRACTICE_ITEMS.map((text, idx) => (
            <OperationalPracticeLine
              key={text}
              text={text}
              caretClass={idx === 0 ? 'mt-[0.4rem]' : 'mt-[0.15rem]'}
            />
          ))}
        </div>

        <div className="hidden items-start gap-10 md:grid md:grid-cols-2">
          <div>
            {OPERATIONAL_PRACTICE_ITEMS.slice(0, 4).map((text, idx) => (
              <OperationalPracticeLine
                key={text}
                text={text}
                caretClass={idx === 0 ? 'mt-[0.4rem]' : 'mt-[0.15rem]'}
              />
            ))}
          </div>
          <div>
            {OPERATIONAL_PRACTICE_ITEMS.slice(4).map((text, idx) => (
              <OperationalPracticeLine
                key={text}
                text={text}
                caretClass={idx === 0 ? 'mt-[0.4rem]' : 'mt-[0.15rem]'}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="inline-flex min-h-14 w-full max-w-[60rem] items-center justify-center rounded-xl bg-[#E4611F] px-6 py-6 text-center text-[1.2rem] font-semibold text-white"
        >
          Safe work is the result of clear communication, team alignment, and disciplined execution.
        </button>
      </div>

      <div className="mt-8">
        <div className="relative">
          <button
            type="button"
            aria-label="Slide anterior"
            className="absolute -left-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={goToPreviousPage}
          >
            <CarouselArrowIcon direction="left" />
          </button>

          <button
            type="button"
            aria-label="Slide siguiente"
            className="absolute -right-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={goToNextPage}
          >
            <CarouselArrowIcon direction="right" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((page, idx) => (
                <div key={`safety-construction-page-${idx}`} className="w-full shrink-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-start">
                    {page.map((item) => (
                      <div
                        key={`page-${idx}-img-${item.id}`}
                        className="flex min-w-0 flex-col overflow-hidden rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="block h-auto w-full max-w-full shrink-0"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: pageCount }, (_, idx) => (
            <button
              key={`safety-construction-dot-${idx}`}
              type="button"
              aria-label={`Ir a página ${idx + 1}`}
              onClick={() => setCurrentPage(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                idx === currentPage ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
