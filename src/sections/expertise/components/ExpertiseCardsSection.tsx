import { useState } from 'react'
import Container from '../../../shared/components/Container'
import { PreconstructionPage } from '../../preconstruction'
import { ConstructionManagementPage } from '../../construction-management'

const cards = [
  {
    title: 'Preconstruction',
    imageDefault: '/images/our-expertise/pre1.png',
    imageHover: '/images/our-expertise/pre2.png',
  },
  {
    title: 'Construction Management',
    imageDefault: '/images/our-expertise/construction1.png',
    imageHover: '/images/our-expertise/construction2.png',
  },
] as const

export default function ExpertiseCardsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <div className="bg-white">
      <Container className={`pt-1 ${activeCard === null ? 'pb-8' : 'pb-16'}`}>
        <div
          className={`grid gap-6 transition-all duration-300 ${
            activeCard === null ? 'md:grid-cols-2' : activeCard === 0 ? 'md:grid-cols-[4fr_1fr]' : 'md:grid-cols-[1fr_4fr]'
          }`}
        >
          {cards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => setActiveCard(index)}
              className="group relative h-80 w-full overflow-hidden rounded-3xl border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.22)] md:h-130"
              aria-pressed={activeCard === index}
            >
              <img
                src={card.imageDefault}
                alt={card.title}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0 ${
                  card.title === 'Construction Management' ? 'scale-110' : ''
                }`}
              />
              <img
                src={card.imageHover}
                alt={card.title}
                className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  card.title === 'Construction Management' ? 'scale-110' : ''
                }`}
              />
            </button>
          ))}
        </div>

        {activeCard === 0 ? <PreconstructionPage /> : null}

        {activeCard === 1 ? <ConstructionManagementPage /> : null}
      </Container>
    </div>
  )
}
