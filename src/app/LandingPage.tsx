import { useEffect, useState } from 'react'
import HomeSection from '../sections/home'
import ExpertiseSection from '../sections/expertise'
import SafetySection from '../sections/safety'
import Footer from '../shared/components/Footer'
import { ContactUsModalProvider } from '../shared/components/contact/ContactUsModalProvider'

export default function LandingPage() {
  const [activeModule, setActiveModule] = useState<'expertise' | 'safety'>('expertise')

  useEffect(() => {
    const handleSetModule = (event: Event) => {
      const customEvent = event as CustomEvent<{ module?: 'expertise' | 'safety' }>
      if (customEvent.detail?.module === 'safety') {
        setActiveModule('safety')
      } else if (customEvent.detail?.module === 'expertise') {
        setActiveModule('expertise')
      }
    }

    window.addEventListener('landing:set-module', handleSetModule as EventListener)
    return () => window.removeEventListener('landing:set-module', handleSetModule as EventListener)
  }, [])

  return (
    <ContactUsModalProvider>
      <main className="scroll-smooth bg-white text-slate-900">
        <section id="home" className="min-h-screen">
          <HomeSection />
        </section>
        <section id="expertise" className="py-8">
          {activeModule === 'safety' ? <SafetySection /> : <ExpertiseSection />}
        </section>

        <Footer />
      </main>
    </ContactUsModalProvider>
  )
}

