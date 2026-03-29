import { useEffect, useRef, useState } from 'react'

/**
 * Oculta el indicador de scroll al desplazarse y lo vuelve a mostrar tras unos segundos de inactividad.
 */
export function useHomeScrollIndicator() {
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

  return { showScrollIndicator }
}
