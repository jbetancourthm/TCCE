import { useEffect, useState } from 'react'
import useScrollToSection from '../hooks/useScrollToSection'
import HeaderLogo from '../../utils/icons/header/Logo'
import HeaderPhoneIcon from '../../utils/icons/header/Phone'
import NavItemCaret from '../../utils/icons/header/NavItemCaret'

const BRAND_ORANGE = '#E4611F'

const navItems = [
  { label: 'Our Expertise', id: 'expertise', chevron: true },
  { label: 'Projects', id: 'projects', chevron: true },
  { label: 'About', id: 'about', chevron: true },
  { label: 'Safety', id: 'safety', chevron: true },
  { label: 'Careers', id: 'careers' },
] as const

const navPanels = {
  expertise: [
    {
      title: 'Preconstruction',
      items: ['Construction\nManagement'],
    },
    {
      title: 'What We Do',
      items: ['Site Development & Earthwork', 'Utilities & Underground Infrastructure', 'Roadwork, Concrete & Asphalt Paving', 'Drainage Solutions'],
    },
  ],
  projects: [
    {
      title: 'Featured',
      items: ['Commercial', 'Public Infrastructure', 'Residential Communities'],
    },
    {
      title: 'Capabilities',
      items: ['Design-Build', 'General Contracting', 'Self-Perform Trades'],
    },
  ],
  about: [
    {
      title: '',
      items: ['Who we are', 'Core Values', 'Our Culture', 'Workforce & people', 'Our Leadership'],
    },
  ],
  safety: [
    {
      title: '',
      items: ['Safety Planing', 'Safety Construction', 'Totally Safe'],
    },
  ],
  careers: [
    {
      title: 'Join the Team',
      items: ['Open Positions', 'Internships', 'Field Operations'],
    },
    {
      title: 'Why TCCE',
      items: ['Growth Opportunities', 'Great Benefits', 'Collaborative Culture'],
    },
  ],
} as const

const panelPositionClass = {
  expertise: 'col-start-2 col-span-4',
  projects: 'col-start-2 col-span-4',
  about: 'col-start-3 col-span-3',
  safety: 'col-start-4 col-span-2',
  careers: 'col-start-5 col-span-1',
} as const

export default function Header() {
  const scrollTo = useScrollToSection()
  const [activeItem, setActiveItem] = useState<(typeof navItems)[number]['id'] | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY

      // Prevent flicker on tiny scroll movements.
      if (Math.abs(delta) < 4) return

      if (currentY <= 12) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(delta < 0)
      }

      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`pointer-events-none fixed left-0 right-0 top-0 z-50 pt-2 transition-transform duration-300 sm:pt-2 md:pt-2.5 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className="pointer-events-auto w-full border-2 bg-black/70 backdrop-blur-md px-3 py-2.5 shadow-lg transition-[padding] duration-200 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8"
        style={{ borderColor: BRAND_ORANGE }}
        onMouseLeave={() => {
          setActiveItem(null)
        }}
      >
        <div className="flex min-h-[3.75rem] items-center gap-3 sm:min-h-[4.15rem] sm:gap-4 md:min-h-[4.5rem] lg:min-h-[4.75rem]">
          <div className="ml-5 flex min-w-0 shrink-0 items-center gap-2.5 sm:ml-6 sm:gap-3 md:ml-10">
            <HeaderLogo className="h-9 w-auto text-white sm:h-10 md:h-11" aria-label="TOTAL Civil Construction" role="img" />
          </div>

          <nav className="hidden min-w-0 flex-1 md:flex md:justify-center">
            <div className="grid w-[min(42rem,100%)] grid-cols-5 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`relative mx-auto inline-flex items-center gap-1.5 pb-2 text-sm font-sans transition ${activeItem === item.id ? 'text-[#E4611F]' : 'text-white/90 hover:text-white'}`}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => {
                  setActiveItem(item.id)
                }}
              >
                {item.label}
                {'chevron' in item && item.chevron ? <NavItemCaret className="h-4 w-4 opacity-90" /> : null}
                <span
                  className={`absolute -bottom-[3px] left-0 h-[3px] w-full rounded-full bg-[#E4611F] transition-opacity ${activeItem === item.id ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden
                />
              </button>
            ))}
            </div>
          </nav>

          <div className="ml-auto mr-3 flex shrink-0 items-center gap-3 sm:mr-5 sm:gap-4 md:mr-10 md:gap-10">
            <a href="tel:+13014597484" className="hidden items-center gap-2 text-sm font-sans text-white/90 transition hover:text-white sm:inline-flex" aria-label="Llamar (301) 459 7484">
              <HeaderPhoneIcon className="shrink-0 text-white" />
              <span className="whitespace-nowrap">(301) 459 7484</span>
            </a>
            <button
              type="button"
              className="-ml-3 min-w-[8.5rem] origin-center rounded-lg border border-white bg-transparent px-5 py-1.5 text-xs font-sans font-medium text-white transition-all duration-200 ease-out hover:scale-[1.04] hover:border-[#E4611F] hover:text-[#E4611F] sm:-ml-4 sm:min-w-[9.75rem] sm:px-5 sm:py-2 sm:text-sm md:min-w-[10.5rem] md:px-8"
              onClick={() => scrollTo('contact')}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div
          className={`hidden transition-all duration-200 md:block ${
            activeItem && activeItem !== 'careers' && activeItem !== 'projects'
              ? 'max-h-64 opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div className="grid w-full grid-cols-5 py-5">
            {activeItem && activeItem !== 'careers' && activeItem !== 'projects' ? (
              <div
                className={`${panelPositionClass[activeItem]} text-white ${
                  activeItem === 'expertise'
                    ? 'pl-10 sm:pl-12 md:pl-16 lg:pl-20'
                    : activeItem === 'about'
                      ? 'pl-6 sm:pl-8 md:pl-10 lg:pl-12'
                      : activeItem === 'safety'
                        ? '-ml-26 sm:-ml-28 md:-ml-32 lg:-ml-36'
                      : ''
                }`}
              >
                <div
                  className={`grid gap-8 ${activeItem === 'expertise' ? 'grid-cols-[minmax(10rem,12rem)_minmax(0,1fr)]' : 'grid-cols-1'}`}
                >
                  {navPanels[activeItem].map((column, columnIndex) => (
                    <div
                      key={column.title}
                      className={`text-white ${
                        columnIndex > 0 && activeItem === 'expertise'
                          ? 'relative pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-full before:bg-white/85'
                          : ''
                      }`}
                    >
                      {activeItem === 'expertise' ? (
                        <button
                          type="button"
                          className={`origin-left transform-gpu inline-flex items-center gap-1.5 text-left text-sm font-medium text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2 ${
                            columnIndex === 0 ? 'group' : ''
                          }`}
                        >
                          {column.title}
                          {columnIndex === 0 ? (
                            <NavItemCaret className="h-3.5 w-3.5 -rotate-90 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                          ) : null}
                        </button>
                      ) : column.title ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75">{column.title}</p>
                      ) : null}
                      <ul className={`${column.title ? 'mt-3' : 'mt-0'} space-y-2.5`}>
                        {column.items.map((entry) => (
                          <li key={entry}>
                            <button
                              type="button"
                              className={`origin-left transform-gpu whitespace-pre-line text-left text-sm font-medium text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white ${
                                activeItem === 'expertise' && columnIndex === 0
                                  ? 'group inline-flex items-center gap-1.5 hover:underline hover:decoration-1 hover:underline-offset-2'
                                  : 'hover:underline hover:decoration-1 hover:underline-offset-2'
                              }`}
                            >
                              {entry}
                              {activeItem === 'expertise' && columnIndex === 0 ? (
                                <NavItemCaret className="h-3.5 w-3.5 -rotate-90 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                              ) : null}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
