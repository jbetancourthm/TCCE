import { EXPAND_ALL_SECTIONS } from '../../../config/devExpandSections'
import Container from '../../../shared/components/Container'
import ExpertiseCardCircleArrowIcon from '../../../utils/icons/expertise/ExpertiseCardCircleArrowIcon'
import { PreconstructionPage } from '../../preconstruction'
import { ConstructionManagementPage } from '../../construction-management'
import { useExpertiseCards } from '../hooks/useExpertise'

const OPEN_PRECONSTRUCTION_COPY = {
  title: 'Preconstruction',
  body: 'Total Civil Construction redefines preconstruction by combining smart planning, budget alignment, and real-world experience transforming early decisions into high-performance outcomes.',
} as const

const OPEN_CONSTRUCTION_MANAGEMENT_COPY = {
  title: 'Construction Management',
  body: 'At Total Civil, construction management is driven by certainty in execution, technical expertise, and disciplined operational processes. Our approach combines deep field experience with structured project management practices to ensure every project is executed with precision, efficiency, and full alignment with the client\'s objectives.',
} as const

const cards = [
  {
    title: 'Preconstruction',
    imageDefault: '/images/our-expertise/pre1.png',
  },
  {
    title: 'Construction Management',
    imageDefault: '/images/our-expertise/construction1.png',
  },
] as const

const CARD_IMAGES_OPEN = {
  preconstruction: '/images/our-expertise/open-preconstruction.png',
  constructionClosed: '/images/our-expertise/closed-construction.png',
  constructionOpen: '/images/our-expertise/open-construction.png',
  preconstructionClosed: '/images/our-expertise/closed-preconstruction.png',
} as const

function cardImageWhenExpanded(cardIndex: number, active: number) {
  if (active === 0) {
    return cardIndex === 0 ? CARD_IMAGES_OPEN.preconstruction : CARD_IMAGES_OPEN.constructionClosed
  }
  return cardIndex === 0 ? CARD_IMAGES_OPEN.preconstructionClosed : CARD_IMAGES_OPEN.constructionOpen
}

const CARD_H_FULL = 'h-80 md:h-130'
/** Solo móvil: mitad de altura cuando la otra card está abierta; en md+ misma altura que siempre. */
const CARD_H_HALF = 'h-40 md:h-130'

export default function ExpertiseCardsSection() {
  const { activeCard, setActiveCard, showExpandedCardImages, activeForImages, useSplitHeights } = useExpertiseCards()

  return (
    <div className="bg-white">
      <Container className="pt-1 pb-0">
        <div
          className={`mx-auto grid w-full max-w-[22rem] items-start gap-6 transition-all duration-300 sm:max-w-md md:max-w-none ${
            EXPAND_ALL_SECTIONS || activeCard === null
              ? 'md:grid-cols-2'
              : activeCard === 0
                ? 'md:grid-cols-[4fr_1fr]'
                : 'md:grid-cols-[1fr_4fr]'
          }`}
        >
          {cards.map((card, index) => {
            const isActive = activeCard === index
            const heightClass = useSplitHeights && !isActive ? CARD_H_HALF : CARD_H_FULL

            return (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveCard(index)}
              aria-labelledby={`expertise-card-title-${index}`}
              className={`group relative w-full overflow-hidden rounded-3xl border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-[height] duration-300 ease-out motion-reduce:transition-none ${heightClass}`}
              aria-pressed={activeCard === index}
            >
              {showExpandedCardImages ? (
                <>
                  <img
                    src={cardImageWhenExpanded(index, activeForImages)}
                    alt=""
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300"
                  />
                  {activeForImages === 0 && index === 0 ? (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/25 to-transparent"
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end gap-4 p-6 pb-5 text-left md:gap-5 md:p-8 md:pb-6 lg:gap-6 lg:pb-7 lg:pl-10 lg:pr-16 xl:pl-12 xl:pb-8">
                        <div className="flex shrink-0 flex-col gap-1.5 md:gap-2">
                          <h2
                            id={`expertise-card-title-${index}`}
                            className="m-0 text-2xl font-bold leading-none text-white md:text-3xl lg:text-4xl"
                          >
                            {OPEN_PRECONSTRUCTION_COPY.title}
                          </h2>
                          <span className="block h-1 w-32 shrink-0 rounded-full bg-white md:w-40" aria-hidden />
                        </div>
                        <p className="max-w-xl shrink-0 text-sm font-normal leading-relaxed text-white/95 md:text-base lg:max-w-lg">
                          {OPEN_PRECONSTRUCTION_COPY.body}
                        </p>
                      </div>
                    </>
                  ) : null}
                  {activeForImages === 0 && index === 1 ? (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-black/30 to-black/25"
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-end px-3 pb-6 text-center md:px-4 md:pb-8 lg:pb-10">
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                          <h2
                            id={`expertise-card-title-${index}`}
                            className="m-0 flex flex-col items-center gap-3 text-base font-bold leading-none text-white sm:gap-3.5 sm:text-lg md:gap-4 md:text-2xl lg:text-3xl"
                          >
                            <span className="block">Construction</span>
                            <span className="block">Management</span>
                          </h2>
                          <span className="block h-1 w-24 shrink-0 rounded-full bg-white md:w-36 lg:w-40" aria-hidden />
                        </div>
                      </div>
                    </>
                  ) : null}
                  {activeForImages === 1 && index === 0 ? (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-black/30 to-black/25"
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-start justify-end px-4 pb-6 text-left md:px-5 md:pb-8 lg:px-6 lg:pb-10">
                        <div className="flex max-w-full flex-col items-start gap-3 md:gap-4">
                          <h2
                            id={`expertise-card-title-${index}`}
                            className="m-0 text-base font-bold leading-none text-white sm:text-lg md:text-2xl lg:text-3xl"
                          >
                            {OPEN_PRECONSTRUCTION_COPY.title}
                          </h2>
                          <span className="block h-1 w-24 shrink-0 self-start rounded-full bg-white md:w-36 lg:w-40" aria-hidden />
                        </div>
                      </div>
                    </>
                  ) : null}
                  {activeForImages === 1 && index === 1 ? (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/60 to-black/25"
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute inset-0 z-[2] flex items-end justify-start p-6 pb-5 text-left md:p-8 md:pb-6 lg:p-10 lg:pb-8">
                        <div className="w-full max-w-[98%] shrink-0 md:max-w-[94%] lg:max-w-[88%] xl:max-w-[82%]">
                          <div className="flex flex-col items-start gap-2 md:gap-2">
                            <h2
                              id={`expertise-card-title-${index}`}
                              className="m-0 text-2xl font-bold leading-none text-white md:text-3xl lg:text-4xl"
                            >
                              {OPEN_CONSTRUCTION_MANAGEMENT_COPY.title}
                            </h2>
                            <span className="block h-1 w-32 shrink-0 rounded-full bg-white md:w-40" aria-hidden />
                          </div>
                          <div className="h-6 md:h-8 lg:h-10" aria-hidden />
                          <p className="mt-0 max-w-none text-sm font-normal leading-relaxed text-white/95 md:text-base">
                            {OPEN_CONSTRUCTION_MANAGEMENT_COPY.body}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <h2 id={`expertise-card-title-${index}`} className="sr-only">
                    {card.title}
                  </h2>
                  <img
                    src={card.imageDefault}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-in-out motion-reduce:duration-0 group-hover:scale-[1.1] motion-reduce:group-hover:scale-100"
                  />
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-black/44" aria-hidden />
                  <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    {/* Esquina: visible; al hover solo desvanece (sin movimiento) */}
                    <div
                      aria-hidden
                      className="absolute bottom-6 left-6 z-10 w-max max-w-[calc(100%-3rem)] text-left md:bottom-8 md:left-8"
                    >
                      <div className="opacity-100 transition-opacity duration-500 ease-in-out motion-reduce:duration-200 group-hover:opacity-0">
                        <div className="flex flex-col items-start gap-3">
                          <p className="m-0 max-w-[18rem] text-2xl font-bold leading-tight text-white sm:max-w-[min(100%,22rem)] sm:text-3xl md:text-[1.85rem] lg:text-4xl">
                            {card.title}
                          </p>
                          <span className="h-1 w-20 shrink-0 self-start rounded-full bg-white sm:w-24 md:w-28" />
                        </div>
                      </div>
                    </div>
                    {/* Centro: oculto; al hover aparece en fundido (sin movimiento) */}
                    <div
                      aria-hidden
                      className="absolute inset-0 z-10 flex items-center justify-center px-4 text-left md:px-6"
                    >
                      <div className="w-max max-w-[calc(100%-2rem)] opacity-0 transition-opacity duration-500 ease-in-out motion-reduce:duration-200 group-hover:opacity-100">
                        <div className="flex flex-col items-start gap-3">
                          <p className="m-0 max-w-[18rem] text-3xl font-bold leading-tight text-white sm:max-w-[min(100%,22rem)] sm:text-4xl md:text-[2.2rem] lg:text-5xl">
                            {card.title}
                          </p>
                          <span className="h-1 w-24 shrink-0 self-start rounded-full bg-white sm:w-28 md:w-32 lg:w-36" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute bottom-5 right-5 z-[3] text-white opacity-100 transition-opacity duration-500 ease-in-out motion-reduce:duration-200 group-hover:opacity-[0.55] md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
                    <ExpertiseCardCircleArrowIcon className="h-8 w-8 shrink-0" />
                  </div>
                </>
              )}
            </button>
            )
          })}
        </div>

        {EXPAND_ALL_SECTIONS ? (
          <>
            <PreconstructionPage />
            <div className="mt-20 w-full">
              <ConstructionManagementPage />
            </div>
          </>
        ) : (
          <>
            {activeCard === 0 ? <PreconstructionPage /> : null}
            {activeCard === 1 ? <ConstructionManagementPage /> : null}
          </>
        )}
      </Container>
    </div>
  )
}
