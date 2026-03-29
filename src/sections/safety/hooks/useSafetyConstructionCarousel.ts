import { useEffect, useMemo, useState } from 'react'
import { useMinWidthMd } from '../../../shared/hooks/useMinWidthMd'
import { SAFETY_CONSTRUCTION_CAROUSEL_ITEMS } from './useSafetyConstructionMedia'

const SAFETY_CONSTRUCTION_DESKTOP_PAGES = [
  [
    SAFETY_CONSTRUCTION_CAROUSEL_ITEMS[0],
    SAFETY_CONSTRUCTION_CAROUSEL_ITEMS[1],
    SAFETY_CONSTRUCTION_CAROUSEL_ITEMS[2],
  ],
  [
    SAFETY_CONSTRUCTION_CAROUSEL_ITEMS[2],
    SAFETY_CONSTRUCTION_CAROUSEL_ITEMS[3],
    SAFETY_CONSTRUCTION_CAROUSEL_ITEMS[4],
  ],
] as const

/**
 * Carrusel de la sección Safety Construction.
 *
 * - En escritorio (`md+`): dos “páginas” de tres tarjetas cada una (solapamiento intencional en la tarjeta central).
 * - En móvil: un slide por imagen (cinco páginas).
 * - Si cambia el breakpoint y el índice actual queda fuera de rango, lo recorta al último slide válido.
 */
export function useSafetyConstructionCarousel() {
  const isDesktop = useMinWidthMd()

  const pages = useMemo(
    () => (isDesktop ? SAFETY_CONSTRUCTION_DESKTOP_PAGES : SAFETY_CONSTRUCTION_CAROUSEL_ITEMS.map((c) => [c])),
    [isDesktop],
  )

  const pageCount = pages.length
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, pageCount - 1))
  }, [isDesktop, pageCount])

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount)
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount)
  }

  return {
    pages,
    pageCount,
    currentPage,
    setCurrentPage,
    goToPreviousPage,
    goToNextPage,
    isDesktop,
  }
}
