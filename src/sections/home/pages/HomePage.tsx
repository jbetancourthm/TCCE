import { useEffect, useRef, useState } from 'react'
import Hero from '../components/Hero'
import Header from '../../../shared/components/Header'
import ScrollIndicator from '../../../utils/icons/scroll/ScrollIndicator'

export default function HomePage() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const scheduleShow = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      idleTimerRef.current = setTimeout(() => {
        setShowScrollIndicator(true)
      }, 5000)
    }

    const handleScroll = () => {
      setShowScrollIndicator(false)
      scheduleShow()
    }

    scheduleShow()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <Header />
      <Hero />
      <div
        className={`pointer-events-none fixed right-3 top-1/2 z-40 -translate-y-1/2 transition-opacity duration-300 sm:right-5 ${
          showScrollIndicator ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ScrollIndicator className="scroll-indicator-bob h-[5.5rem] w-auto text-[#E4611F]" />
      </div>
    </div>
  )
}

