import { useEffect, useState } from 'react'
import { useMinWidthMd } from '../../../shared/hooks/useMinWidthMd'

const cards = [
  {
    key: 'field-operations',
    label: 'Field Operations',
    image: '/images/construction-management/field/field.png',
    description:
      'Execution is where plans become results. Our field teams operate with disciplined production workflows, strict supervision, and the right equipment on the ground. Field leadership and project management work as one, keeping activities coordinated, efficient, and locked to the project plan.',
  },
  {
    key: 'top-edge-surveying',
    label: 'Top edge Surveying',
    image: '/images/construction-management/field/edge.png',
    description:
      'Using drone-based surveying and cutting-edge capture technology, we collect highly accurate data on earthwork volumes, site conditions, and project progress, feeding live insights directly into our digital twin. Teams make faster, smarter decisions backed by numbers, not assumptions.',
  },
  {
    key: 'equipment-capacity',
    label: 'Equipment Capacity',
    image: '/images/construction-management/field/equipment.png',
    description:
      'Our company-owned heavy equipment supports every phase of sitework and utility construction, giving us the ability to mobilize fast, adapt to site conditions, and maintain consistent production without relying on outside resources.',
  },
  {
    key: 'experienced-field-crews',
    label: 'Experienced Field Crews',
    image: '/images/construction-management/field/crews.png',
    description:
      'With deep hands-on expertise in sitework and utility installation, we bring a relentless focus on productivity, safety, and quality - executing with precision from the first pass to final grade.',
  },
  {
    key: 'field-office-integration',
    label: 'Field & Office Integration',
    image: '/images/construction-management/field/office.png',
    description:
      "The field and the office operate as one team. Daily reporting, production tracking, and continuous communication keep both sides in sync - so decisions are driven by real-time conditions, not yesterday's data. Faster responses, fewer surprises, consistent progress.",
  },
] as const

const DESKTOP_PAGES = [
  [cards[0], cards[1], cards[2]],
  [cards[2], cards[3], cards[4]],
] as const

export type FieldOperationsCard = (typeof cards)[number]

/**
 * Carrusel de páginas (desktop: grupos de 3 tarjetas; móvil: una por slide) y expansión táctil por tarjeta.
 */
export function useFieldOperationsCarousel() {
  const isDesktop = useMinWidthMd()
  const pages = isDesktop ? DESKTOP_PAGES : cards.map((c) => [c])
  const pageCount = pages.length

  const [currentPage, setCurrentPage] = useState(0)
  const [mobileExpandedKey, setMobileExpandedKey] = useState<string | null>(null)

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, pageCount - 1))
  }, [isDesktop, pageCount])

  useEffect(() => {
    setMobileExpandedKey(null)
  }, [currentPage])

  useEffect(() => {
    if (isDesktop) setMobileExpandedKey(null)
  }, [isDesktop])

  const goPrevious = () => setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount)
  const goNext = () => setCurrentPage((prev) => (prev + 1) % pageCount)
  const goToPage = (idx: number) => setCurrentPage(idx)

  const toggleCard = (key: string) => {
    if (isDesktop) return
    setMobileExpandedKey((k) => (k === key ? null : key))
  }

  return {
    pages,
    pageCount,
    currentPage,
    goPrevious,
    goNext,
    goToPage,
    isDesktop,
    mobileExpandedKey,
    toggleCard,
  }
}
