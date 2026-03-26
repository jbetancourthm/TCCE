import HomeSection from '../sections/home'
import ExpertiseSection from '../sections/expertise'
import Footer from '../shared/components/Footer'

export default function LandingPage() {
  return (
    <main className="scroll-smooth bg-white text-slate-900">
      <section id="home" className="min-h-screen">
        <HomeSection />
      </section>
      <section id="expertise" className="py-8">
        <ExpertiseSection />
      </section>

      <Footer />
    </main>
  )
}

