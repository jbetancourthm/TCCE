import Container from '../../../shared/components/Container'
import { useAboutSubnavScroll } from '../hooks/useAbout'
import CoreValues from './CoreValues'
import OurCulture from './OurCulture'
import OurLeadership from './OurLeadership'
import WhoWeAre from './WhoWeAre'
import WorkforceAndPeople from './WorkforceAndPeople'

export default function AboutSectionContent() {
  useAboutSubnavScroll()

  return (
    <div className="bg-white text-neutral-700">
      <Container className="py-12 md:py-14">
        <div className="mx-auto w-[90%] pb-8 text-left md:pb-12">
          <WhoWeAre />
          <CoreValues />
          <OurCulture />
          <WorkforceAndPeople />
          <OurLeadership />
        </div>
      </Container>
    </div>
  )
}
