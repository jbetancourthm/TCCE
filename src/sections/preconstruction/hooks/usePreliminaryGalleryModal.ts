import { useCallback, useEffect, useId, useRef, useState } from 'react'

type UsePreliminaryGalleryModalArgs = {
  images: readonly string[]
  isOpen: boolean
  initialIndex: number
  onClose: () => void
}

/**
 * Comportamiento del modal de galería Preliminary: índice activo, scroll al slide, bloqueo de body,
 * Escape para cerrar y navegación circular entre imágenes.
 */
export function usePreliminaryGalleryModal({
  images,
  isOpen,
  initialIndex,
  onClose,
}: UsePreliminaryGalleryModalArgs) {
  const [index, setIndex] = useState(initialIndex)
  const titleId = useId()
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (isOpen) setIndex(initialIndex)
  }, [isOpen, initialIndex])

  useEffect(() => {
    if (!isOpen) return
    const t = requestAnimationFrame(() => {
      slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    })
    return () => cancelAnimationFrame(t)
  }, [isOpen, index])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + images.length) % images.length)
    },
    [images.length],
  )

  const scrollToIndex = (i: number) => {
    setIndex(i)
    slideRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return { index, setIndex, titleId, slideRefs, go, scrollToIndex }
}
