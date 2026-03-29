import { useMemo, useState } from 'react'

const PROJECTS_PER_PAGE = 3
const MAX_VISIBLE_PAGE_NUMBERS = 4

const projects = Array.from({ length: 20 }, (_, idx) => ({
  id: idx + 1,
  location: 'United States, Washington D. C.',
  title: `Lorem ipsum ${idx + 1}`,
  image: '/images/construction-management/construction.png',
}))

/**
 * Paginación de la sección Related Projects (índice de página 1-based, ventana de números visibles).
 */
export function useRelatedProjectsPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)

  const visibleProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE
    return projects.slice(start, start + PROJECTS_PER_PAGE)
  }, [currentPage])

  const pageNumbers = useMemo(() => {
    if (totalPages <= MAX_VISIBLE_PAGE_NUMBERS) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1)
    }

    const start = Math.max(1, Math.min(currentPage - 1, totalPages - MAX_VISIBLE_PAGE_NUMBERS + 1))
    return Array.from({ length: MAX_VISIBLE_PAGE_NUMBERS }, (_, idx) => start + idx)
  }, [currentPage, totalPages])

  const showLeftEllipsis = pageNumbers.length > 0 && pageNumbers[0] > 1
  const showRightEllipsis = pageNumbers.length > 0 && pageNumbers[pageNumbers.length - 1] < totalPages

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(1, prev - 1))
  const goToNextPage = () => setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  const goToPage = (page: number) => setCurrentPage(page)

  return {
    visibleProjects,
    pageNumbers,
    showLeftEllipsis,
    showRightEllipsis,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  }
}
