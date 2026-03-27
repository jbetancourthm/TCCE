import { useState } from 'react'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import RelatedProjectsSection from '../components/RelatedProjectsSection'

const cards = [
  {
    key: 'field-operations',
    label: 'Field Operations',
    image: '/images/construction-management/field/field.png',
    description:
      'Execution is where plans become results. Our field teams operate with disciplined production workflows, strict supervision, and the right equipment on the ground. Field leadership and project management work as one, keeping activities coordinated, efficient, and locked to the project plan.',
  },
  {
    key: 'top-edge-surveying',
    label: 'Top edge Surveying',
    image: '/images/construction-management/field/edge.png',
    description:
      'Using drone-based surveying and cutting-edge capture technology, we collect highly accurate data on earthwork volumes, site conditions, and project progress, feeding live insights directly into our digital twin. Teams make faster, smarter decisions backed by numbers, not assumptions.',
  },
  {
    key: 'equipment-capacity',
    label: 'Equipment Capacity',
    image: '/images/construction-management/field/equipment.png',
    description:
      'Our company-owned heavy equipment supports every phase of sitework and utility construction, giving us the ability to mobilize fast, adapt to site conditions, and maintain consistent production without relying on outside resources.',
  },
  {
    key: 'experienced-field-crews',
    label: 'Experienced Field Crews',
    image: '/images/construction-management/field/crews.png',
    description:
      'With deep hands-on expertise in sitework and utility installation, we bring a relentless focus on productivity, safety, and quality - executing with precision from the first pass to final grade.',
  },
  {
    key: 'field-office-integration',
    label: 'Field & Office Integration',
    image: '/images/construction-management/field/office.png',
    description:
      "The field and the office operate as one team. Daily reporting, production tracking, and continuous communication keep both sides in sync - so decisions are driven by real-time conditions, not yesterday's data. Faster responses, fewer surprises, consistent progress.",
  },
] as const

export default function FieldOperations() {
  const [currentPage, setCurrentPage] = useState(0)
  const pages = [
    [cards[0], cards[1], cards[2]],
    [cards[2], cards[3], cards[4]],
  ] as const

  return (
    <div className="mt-10 w-full rounded-3xl bg-neutral-50/60 p-6">
      <div className="w-full">
        <div className="relative mx-auto w-[98%] max-w-[85rem]">
          <button
            type="button"
            aria-label="Slide anterior"
            className="absolute -left-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={() => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)}
          >
            <CarouselArrowIcon direction="left" />
          </button>

          <button
            type="button"
            aria-label="Slide siguiente"
            className="absolute -right-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
          >
            <CarouselArrowIcon direction="right" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {pages.map((page, pageIdx) => (
                <div key={`field-page-${pageIdx}`} className="w-full shrink-0">
                  <div className="flex items-stretch gap-6">
                    {page.map((card) => (
                      <div key={`${pageIdx}-${card.key}`} className="group relative h-[17.5rem] min-w-0 flex-1 cursor-default overflow-hidden rounded-3xl bg-neutral-200 md:h-[20rem]">
                        <img src={card.image} alt={card.label} className="absolute inset-0 h-full w-full object-cover" />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/55"
                          aria-hidden
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
                          aria-hidden
                        />
                        <div className="absolute inset-0 z-10 px-4 text-center md:px-6">
                  <div className="absolute inset-x-0 bottom-7 transition-transform duration-500 ease-out [transition-delay:180ms] group-hover:translate-y-[-11rem] group-hover:[transition-delay:0ms] md:group-hover:translate-y-[-12rem]">
                    <span className="block text-2xl font-semibold text-white drop-shadow">{card.label}</span>
                          </div>
                  <p className="absolute inset-x-8 top-[6.55rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] group-hover:max-h-[13rem] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition-delay:380ms] md:inset-x-12 md:top-[7.35rem] md:group-hover:max-h-[15rem] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {[0, 1].map((idx) => (
            <button
              key={`field-dot-${idx}`}
              type="button"
              aria-label={`Ir a página ${idx + 1}`}
              onClick={() => setCurrentPage(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${idx === currentPage ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
            />
          ))}
        </div>

        <div className="mt-8">
          <RelatedProjectsSection />
        </div>
      </div>
    </div>
  )
}
