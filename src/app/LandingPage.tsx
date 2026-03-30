import { useEffect, useState } from 'react'
import HomeSection from '../sections/home'
import ExpertiseSection from '../sections/expertise'
import AboutSection from '../sections/about'
import SafetySection from '../sections/safety'
import Footer from '../shared/components/Footer'
import { ContactUsModalProvider } from '../shared/components/contact/ContactUsModalProvider'

type LandingModule = 'expertise' | 'safety' | 'about'

export default function LandingPage() {
  const [activeModule, setActiveModule] = useState<LandingModule>('expertise')

  useEffect(() => {
    const handleSetModule = (event: Event) => {
      const customEvent = event as CustomEvent<{ module?: LandingModule }>
      const m = customEvent.detail?.module
      if (m === 'safety' || m === 'expertise' || m === 'about') {
        setActiveModule(m)
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
        <section id="expertise" className="scroll-mt-24 py-8">
          {activeModule === 'safety' ? (
            <SafetySection />
          ) : activeModule === 'about' ? (
            <AboutSection />
          ) : (
            <ExpertiseSection />
          )}
        </section>

        <Footer />
      </main>
    </ContactUsModalProvider>
  )
}
