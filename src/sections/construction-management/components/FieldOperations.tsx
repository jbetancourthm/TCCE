import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import TapToReadHintIcon from '../../../utils/icons/hints/TapToReadHintIcon'
import { useFieldOperationsCarousel } from '../hooks/useFieldOperationsCarousel'
import RelatedProjectsSection from './RelatedProjectsSection'

export default function FieldOperations() {
  const {
    pages,
    pageCount,
    currentPage,
    goPrevious,
    goNext,
    goToPage,
    isDesktop,
    mobileExpandedKey,
    toggleCard,
  } = useFieldOperationsCarousel()

  return (
    <div id="construction-management-field-operations" className="mt-10 w-full rounded-3xl bg-neutral-50/60 p-6">
      <div className="w-full">
        <div className="relative mx-auto w-[98%] max-w-[85rem]">
          <button
            type="button"
            aria-label="Slide anterior"
            className="absolute -left-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={goPrevious}
          >
            <CarouselArrowIcon direction="left" />
          </button>

          <button
            type="button"
            aria-label="Slide siguiente"
            className="absolute -right-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={goNext}
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
                    {page.map((card) => {
                      const expandedTouch = !isDesktop && mobileExpandedKey === card.key
                      return (
                        <div
                          key={`${pageIdx}-${card.key}`}
                          role={isDesktop ? undefined : 'button'}
                          tabIndex={isDesktop ? undefined : 0}
                          aria-expanded={isDesktop ? undefined : expandedTouch}
                          aria-label={isDesktop ? undefined : `${expandedTouch ? 'Contraer' : 'Ampliar'}: ${card.label}`}
                          data-expanded={expandedTouch ? 'true' : undefined}
                          className="group relative h-[17.5rem] min-w-0 w-full cursor-default overflow-hidden rounded-3xl bg-neutral-200 max-md:cursor-pointer md:h-[20rem] md:flex-1"
                          onClick={isDesktop ? undefined : () => toggleCard(card.key)}
                          onKeyDown={
                            isDesktop
                              ? undefined
                              : (e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault()
                                    toggleCard(card.key)
                                  }
                                }
                          }
                        >
                          <img src={card.image} alt={card.label} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 max-md:group-data-[expanded=true]:from-black/85 max-md:group-data-[expanded=true]:via-black/55 md:group-hover:from-black/85 md:group-hover:via-black/55"
                            aria-hidden
                          />
                          <div
                            className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 max-md:group-data-[expanded=true]:bg-black/40 md:group-hover:bg-black/40"
                            aria-hidden
                          />
                          {!isDesktop && !expandedTouch ? (
                            <div
                              className="pointer-events-none absolute top-2 right-2 z-20 flex max-w-[46%] flex-col items-end gap-0.5 motion-safe:animate-pulse"
                              aria-hidden
                            >
                              <TapToReadHintIcon className="h-10 w-10 shrink-0 drop-shadow-md sm:h-11 sm:w-11" />
                              <span className="text-right text-[0.625rem] font-semibold leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                                Toca para leer
                              </span>
                            </div>
                          ) : null}
                          <div className="pointer-events-none absolute inset-0 z-10 px-4 text-center md:px-6">
                            <div className="absolute inset-x-0 bottom-7 transition-transform duration-500 ease-out [transition-delay:180ms] max-md:group-data-[expanded=true]:translate-y-[-11rem] max-md:group-data-[expanded=true]:[transition-delay:0ms] md:group-hover:translate-y-[-12rem] md:group-hover:[transition-delay:0ms]">
                              <span className="block text-2xl font-semibold text-white drop-shadow">{card.label}</span>
                            </div>
                            <p className="absolute inset-x-8 top-[6.55rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] max-md:group-data-[expanded=true]:max-h-[13rem] max-md:group-data-[expanded=true]:translate-y-0 max-md:group-data-[expanded=true]:opacity-100 max-md:group-data-[expanded=true]:[transition-delay:380ms] md:inset-x-12 md:top-[7.35rem] md:group-hover:max-h-[15rem] md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:[transition-delay:380ms] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {Array.from({ length: pageCount }, (_, idx) => (
            <button
              key={`field-dot-${idx}`}
              type="button"
              aria-label={`Ir a página ${idx + 1}`}
              onClick={() => goToPage(idx)}
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
