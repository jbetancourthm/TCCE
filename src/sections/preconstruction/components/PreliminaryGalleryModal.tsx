import { createPortal } from 'react-dom'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import { usePreliminaryGalleryModal } from '../hooks/usePreliminaryGalleryModal'

type PreliminaryGalleryModalProps = {
  images: readonly string[]
  isOpen: boolean
  initialIndex: number
  onClose: () => void
}

export default function PreliminaryGalleryModal({
  images,
  isOpen,
  initialIndex,
  onClose,
}: PreliminaryGalleryModalProps) {
  const { index, titleId, slideRefs, go, scrollToIndex } = usePreliminaryGalleryModal({
    images,
    isOpen,
    initialIndex,
    onClose,
  })

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Cerrar galería"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[min(94vh,920px)] w-full max-w-[min(96vw,1200px)] flex-col rounded-3xl bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-6 md:p-8">
        <h2 id={titleId} className="sr-only">
          Galería de imágenes
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-6 w-6 origin-center transform-gpu items-center justify-center rounded bg-[#E4611F] text-white shadow-md transition duration-200 ease-out hover:scale-110 hover:bg-[#c9551a] active:scale-95 sm:right-4 sm:top-4"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
          </svg>
        </button>

        <div className="relative mt-10 min-h-0 w-full flex-1 sm:mt-8">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden rounded-2xl bg-neutral-100 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                ref={(el) => {
                  slideRefs.current[i] = el
                }}
                className="w-[min(85%,calc(100%-2rem))] shrink-0 snap-center snap-always pl-2 first:pl-4 last:pr-4 sm:w-[82%]"
              >
                <img
                  src={src}
                  alt={`Imagen ${i + 1} de ${images.length}`}
                  className="max-h-[min(70vh,680px)] w-full rounded-xl object-contain"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Imagen anterior"
            className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-14 sm:w-14 sm:-translate-x-2"
            onClick={() => go(-1)}
          >
            <CarouselArrowIcon direction="left" />
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center sm:h-14 sm:w-14 sm:translate-x-2"
            onClick={() => go(1)}
          >
            <CarouselArrowIcon direction="right" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5">
          {images.map((src, i) => (
            <button
              key={`dot-${src}-${i}`}
              type="button"
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-[#E4611F]' : 'border border-[#E4611F] bg-white'}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}
