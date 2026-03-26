import Container from '../../../shared/components/Container'
import ExpertiseCardsSection from './ExpertiseCardsSection'

export default function ExpertiseSectionContent() {
  return (
    <div className="bg-white text-slate-900">
      <Container className="py-16">
        <img
          src="/images/our-expertise/our.png"
          alt="Our Expertise"
          className="h-auto w-full max-w-[16rem] sm:max-w-[18rem] md:max-w-[14rem]"
        />
      </Container>
      <ExpertiseCardsSection />
    </div>
  )
}

