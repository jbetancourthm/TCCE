import { useState } from 'react'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import RelatedProjectsSection from '../components/RelatedProjectsSection'

const slides = [
  {
    key: 0,
    label: 'Field Operations',
    gradient: 'from-[#0B2B6E]/10 via-neutral-100 to-[#E4611F]/15',
  },
  {
    key: 1,
    label: 'Top edge Surveying',
    gradient: 'from-neutral-100 via-neutral-200 to-[#0B2B6E]/10',
  },
  {
    key: 2,
    label: 'Equipment Capacity',
    gradient: 'from-[#E4611F]/15 via-neutral-100 to-neutral-200',
  },
] as const

export default function FieldOperations() {
  const [fieldOpsIndex, setFieldOpsIndex] = useState(0)

  const left = slides[(fieldOpsIndex + 2) % 3]
  const center = slides[fieldOpsIndex]
  const right = slides[(fieldOpsIndex + 1) % 3]

  const box = (slide: (typeof slides)[number], size: 'left' | 'center' | 'right') => {
    const isCenter = size === 'center'
    return (
      <div
        className={
          isCenter
            ? 'relative h-[18rem] w-[18rem] overflow-hidden rounded-3xl bg-neutral-200'
            : 'relative h-[18rem] flex-1 overflow-hidden rounded-3xl bg-neutral-200'
        }
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
        {isCenter ? (
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="bg-neutral-300/70" />
            <div className="bg-neutral-100/60" />
          </div>
        ) : null}
        <div className="absolute inset-x-0 bottom-8 text-center">
          <span className="text-lg font-semibold text-white/90 drop-shadow">{slide.label}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 w-full">
      <div className="relative mx-auto w-full max-w-none">
        <button
          type="button"
          aria-label="Slide anterior"
          className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center"
          onClick={() => setFieldOpsIndex((prev) => (prev + 2) % 3)}
        >
          <CarouselArrowIcon direction="left" />
        </button>

        <button
          type="button"
          aria-label="Slide siguiente"
          className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center"
          onClick={() => setFieldOpsIndex((prev) => (prev + 1) % 3)}
        >
          <CarouselArrowIcon direction="right" />
        </button>

        <div className="flex items-stretch gap-6">
          {box(left, 'left')}
          {box(center, 'center')}
          {box(right, 'right')}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${i === fieldOpsIndex ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
            />
          ))}
        </div>
      </div>

      <RelatedProjectsSection />
    </div>
  )
}
