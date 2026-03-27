import { useEffect, useState } from 'react'
import { EXPAND_ALL_SECTIONS } from '../../../config/devExpandSections'
import Container from '../../../shared/components/Container'
import { PreconstructionPage } from '../../preconstruction'
import { ConstructionManagementPage } from '../../construction-management'

const OPEN_PRECONSTRUCTION_COPY = {
  title: 'Preconstruction',
  body: 'Total Civil Construction redefines preconstruction by combining smart planning, budget alignment, and real-world experience transforming early decisions into high-performance outcomes.',
} as const

const cards = [
  {
    title: 'Preconstruction',
    imageDefault: '/images/our-expertise/pre1.png',
    imageHover: '/images/our-expertise/pre2.png',
    imageZoom: 'scale-100 origin-center',
  },
  {
    title: 'Construction Management',
    imageDefault: '/images/our-expertise/construction1.png',
    imageHover: '/images/our-expertise/construction2.png',
    imageZoom: 'scale-110 origin-center',
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
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const showExpandedCardImages = EXPAND_ALL_SECTIONS || activeCard !== null
  const activeForImages = (activeCard ?? 0) as 0 | 1
  const useSplitHeights = !EXPAND_ALL_SECTIONS && activeCard !== null

  useEffect(() => {
    const handleOpenCard = (event: Event) => {
      const customEvent = event as CustomEvent<{ card?: number }>
      const targetCard = customEvent.detail?.card
      if (targetCard === 0 || targetCard === 1) {
        setActiveCard(targetCard)
      }
    }

    window.addEventListener('expertise:open-card', handleOpenCard as EventListener)
    return () => window.removeEventListener('expertise:open-card', handleOpenCard as EventListener)
  }, [])

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
              className={`group relative w-full overflow-hidden rounded-3xl border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-[height] duration-300 ease-out motion-reduce:transition-none ${heightClass}`}
              aria-pressed={activeCard === index}
            >
              {showExpandedCardImages ? (
                <>
                  <img
                    src={cardImageWhenExpanded(index, activeForImages)}
                    alt=""
                    className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ${card.imageZoom}`}
                  />
                  {activeForImages === 0 && index === 0 ? (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/25 to-transparent"
                        aria-hidden
                      />
                      <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col justify-end gap-4 p-6 pb-5 text-left md:gap-5 md:p-8 md:pb-6 lg:gap-6 lg:pb-7 lg:pl-10 lg:pr-16 xl:pl-12 xl:pb-8">
                        <div className="flex shrink-0 flex-col gap-1.5 md:gap-2">
                          <h2 className="m-0 text-2xl font-bold leading-none text-white md:text-3xl lg:text-4xl">
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
                          <h2 className="m-0 flex flex-col items-center gap-3 text-base font-bold leading-none text-white sm:gap-3.5 sm:text-lg md:gap-4 md:text-2xl lg:text-3xl">
                            <span className="block">Construction</span>
                            <span className="block">Management</span>
                          </h2>
                          <span className="block h-1 w-24 shrink-0 rounded-full bg-white md:w-36 lg:w-40" aria-hidden />
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <img
                    src={card.imageDefault}
                    alt={card.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0 ${card.imageZoom}`}
                  />
                  <img
                    src={card.imageHover}
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${card.imageZoom}`}
                  />
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
