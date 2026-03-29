import { useState } from 'react'

/**
 * Estado de la galería ampliable en Preliminary Construction Plan (modal al pulsar expandir en cada miniatura).
 */
export function usePreliminaryPlanGallery() {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGalleryAt = (index: number) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => setGalleryOpen(false)

  return { galleryOpen, galleryIndex, openGalleryAt, closeGallery }
}
