import CarouselArrowIcon from '../../../utils/icons/carousel/CarouselArrowIcon'
import { useRelatedProjectsPagination } from '../hooks/useRelatedProjectsPagination'

export default function RelatedProjectsSection() {
  const {
    visibleProjects,
    pageNumbers,
    showLeftEllipsis,
    showRightEllipsis,
    currentPage,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  } = useRelatedProjectsPagination()

  const renderPaginationBar = () => (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-500 lg:mt-4 lg:justify-end">
      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        className="h-9 w-9 transition-transform duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
      >
        <CarouselArrowIcon direction="left" />
      </button>
      <div className="flex flex-wrap items-center justify-center gap-2 lg:flex-nowrap">
        {showLeftEllipsis ? <span className="text-neutral-400">...</span> : null}
        {pageNumbers.map((page) => {
          const isActive = page === currentPage
          return (
            <span key={page} className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(page)}
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
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        className="h-9 w-9 transition-transform duration-200 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
      >
        <CarouselArrowIcon direction="right" />
      </button>
    </div>
  )

  return (
    <section id="construction-management-projects" className="mx-auto w-[90%] text-left">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-14 bg-neutral-500/70" aria-hidden />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">PROJECTS</p>
          </div>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-neutral-700">Related Projects</h3>
        </div>

        <div className="hidden lg:block">{renderPaginationBar()}</div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <article key={project.id} className="flex flex-col items-start text-left">
            <div className="mb-6 h-72 overflow-hidden rounded-lg bg-neutral-200">
              <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover" />
            </div>

            <p className="m-0 text-sm font-medium tracking-[0.24em] text-neutral-500">{project.location}</p>

            <div className="h-4 w-full shrink-0 lg:h-5" aria-hidden />

            <span className="inline-flex rounded bg-neutral-700 px-3 py-1.5 text-xs font-semibold leading-snug text-white">
              {project.category}
            </span>

            <h4 className="mt-3 text-[2.05rem] font-bold leading-tight text-[#E4611F]">{project.title}</h4>
          </article>
        ))}
      </div>

      <div className="mt-10 lg:hidden">{renderPaginationBar()}</div>
    </section>
  )
}
