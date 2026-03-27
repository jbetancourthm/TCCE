import { useMemo, useState } from 'react'
import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'

const PROJECTS_PER_PAGE = 3
const projects = Array.from({ length: 20 }, (_, idx) => ({
  id: idx + 1,
  location: 'United States, Washington D. C.',
  title: `Lorem ipsum ${idx + 1}`,
  image: '/images/construction-management/construction.png',
}))

export default function RelatedProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const MAX_VISIBLE_PAGE_NUMBERS = 4

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

  return (
    <section id="construction-management-projects" className="mx-auto w-[90%] text-left">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-14 bg-neutral-500/70" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">PROJECTS</p>
          </div>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-neutral-700">Related Projects</h3>
        </div>

        <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className="h-9 w-9 transition-transform duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
          >
            <CarouselArrowIcon direction="left" />
          </button>
          <div className="flex items-center gap-2">
            {showLeftEllipsis ? <span className="text-neutral-400">...</span> : null}
            {pageNumbers.map((page) => {
              const isActive = page === currentPage
              return (
                <span key={page} className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`transition-colors duration-200 ${isActive ? 'font-semibold text-[#E4611F]' : 'text-neutral-500 hover:text-[#E4611F]'}`}
                    aria-label={`Go to page ${page}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {page}
                  </button>
                  {page < pageNumbers[pageNumbers.length - 1] ? <span className="text-neutral-400">|</span> : null}
                </span>
              )
            })}
            {showRightEllipsis ? <span className="text-neutral-400">...</span> : null}
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
            className="h-9 w-9 transition-transform duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
          >
            <CarouselArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {visibleProjects.map((project) => (
          <article key={project.id} className="flex flex-col items-start text-left">
            <div className="mb-6 h-72 overflow-hidden rounded-lg bg-neutral-200">
              <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover" />
            </div>

            <p className="mt-0 text-sm font-medium tracking-[0.24em] text-neutral-500">{project.location}</p>

            <h4 className="mt-2 text-[2.05rem] font-bold leading-tight text-[#E4611F]">{project.title}</h4>

            <button
              type="button"
              className="group relative mt-4 inline-flex h-14 select-none items-stretch overflow-hidden rounded-full border-2 border-transparent bg-transparent px-3 text-sm font-semibold text-[#E4611F] transition-[color,border-color] duration-300 ease-out hover:border-[#E4611F] hover:text-white focus-visible:border-[#E4611F] focus-visible:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4611F] focus-visible:ring-offset-2"
            >
              <span
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#E4611F] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                aria-hidden
              />
              <span className="relative z-10 inline-flex items-center gap-2 group-hover:flex-row-reverse group-focus-visible:flex-row-reverse">
                <svg
                  viewBox="0 0 48 48"
                  className="h-11 w-11 shrink-0 transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
                  fill="none"
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="origin-center transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-visible:opacity-0">
                    <rect width="48" height="48" rx="24" fill="#E4611F" />
                    <rect x="11" y="22" width="10" height="4" rx="2" fill="#fff" />
                    <path d="M24 16C24 14.5 25.7 13.6 27 14.5L36.5 21C37.7 21.8 37.7 23.6 36.5 24.4L27 30.9C25.7 31.8 24 30.9 24 29.4V16Z" fill="#fff" />
                  </g>
                  <g className="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" fill="currentColor">
                    <rect x="11" y="22" width="10" height="4" rx="2" />
                    <path d="M24 16C24 14.5 25.7 13.6 27 14.5L36.5 21C37.7 21.8 37.7 23.6 36.5 24.4L27 30.9C25.7 31.8 24 30.9 24 29.4V16Z" />
                  </g>
                </svg>
                <span>Read more</span>
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
