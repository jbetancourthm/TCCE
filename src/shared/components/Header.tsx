import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useScrollToSection from '../hooks/useScrollToSection'
import { useContactUsModal } from './contact/ContactUsModalProvider'
import HeaderLogo from '../../utils/icons/header/Logo'
import HeaderPhoneIcon from '../../utils/icons/header/Phone'
import NavItemCaret from '../../utils/icons/header/NavItemCaret'
import HeaderMenuToggleIcon from '../../utils/icons/header/HeaderMenuToggleIcon'

const BRAND_ORANGE = '#E4611F'

/** Orden = pestaña 0, 1, 2 del switch en Safety. */
const SAFETY_SUBNAV_ITEMS = ['Safety Planning', 'Safety Construction', 'Totally Safe'] as const

/** Orden = pestaña 0…4 del switch en About. */
const ABOUT_SUBNAV_ITEMS = [
  'Who we are',
  'Core Values',
  'Our Culture',
  'Workforce & people',
  'Our Leadership',
] as const

const navItems = [
  { label: 'Our Expertise', id: 'expertise', chevron: true },
  { label: 'Projects', id: 'projects', chevron: true },
  { label: 'About', id: 'about', chevron: true },
  { label: 'Safety', id: 'safety', chevron: true },
  { label: 'Careers', id: 'careers', chevron: false },
] as const

const NAV_ITEMS_WITH_DESKTOP_MEGA = new Set(['expertise', 'about', 'safety'])

const EXPERTISE_PRECONSTRUCTION_LINKS = [
  { label: 'Engineering-Led Insight', section: 'engineering' as const },
  { label: 'Projects Cost Estimating', section: 'projects' as const },
  { label: 'Preliminary Construction Plan', section: 'preliminary' as const },
] as const

const EXPERTISE_CM_LINKS = [
  { label: 'Work methodology', section: 'methodology' as const },
  { label: 'Field Operations', section: 'field' as const },
  { label: 'Virtual Design & Construction', section: 'vdc' as const },
  { label: 'Performance Monitoring', section: 'performance' as const },
] as const

const EXPERTISE_PROJECTS_COST_SUBLINKS = [
  { label: 'Digital Earthwork Solutions', anchorId: 'preconstruction-digital-earthwork' as const },
  { label: 'Underground Systems Analysis', anchorId: 'preconstruction-underground-systems' as const },
  { label: 'Aerial Site Intelligence', anchorId: 'preconstruction-aerial-site-intelligence' as const },
] as const

const EXPERTISE_PRELIMINARY_SUBLINKS = [
  { label: 'Build your project before breaking ground', anchorId: 'preliminary-build-before-ground' as const },
  { label: "We don't guess at progress, we engineer it.", anchorId: 'preliminary-engineer-progress' as const },
] as const

const navPanels = {
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
      items: [...SAFETY_SUBNAV_ITEMS],
    },
  ],
} as const

export default function Header() {
  const scrollTo = useScrollToSection()
  const { open: openContactModal } = useContactUsModal()
  const [activeItem, setActiveItem] = useState<(typeof navItems)[number]['id'] | null>(null)
  const [expertiseMenuHover, setExpertiseMenuHover] = useState<null | 'precon' | 'cm'>(null)
  const [expertisePreconSubHover, setExpertisePreconSubHover] = useState<null | 'projects' | 'preliminary'>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileExpandedParent, setMobileExpandedParent] = useState<null | 'expertise' | 'about' | 'safety'>(null)
  const [desktopMegaPadPx, setDesktopMegaPadPx] = useState(0)
  const desktopNavRowRef = useRef<HTMLDivElement>(null)
  const desktopMegaTrackRef = useRef<HTMLDivElement>(null)
  const navDesktopBtnRefs = useRef<(HTMLButtonElement | null)[]>([])

  const setLandingModule = (module: 'expertise' | 'safety' | 'about') => {
    window.dispatchEvent(new CustomEvent('landing:set-module', { detail: { module } }))
  }

  const openExpertiseCard = (card: 0 | 1) => {
    setLandingModule('expertise')
    scrollTo('expertise')
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('expertise:open-card', { detail: { card } }))
    }, 80)
    setActiveItem(null)
    setExpertiseMenuHover(null)
    setExpertisePreconSubHover(null)
  }

  const goToPreconstructionSubAnchor = (anchorId: string, tab: 0 | 1) => {
    setLandingModule('expertise')
    scrollTo('expertise')
    setActiveItem(null)
    setExpertiseMenuHover(null)
    setExpertisePreconSubHover(null)
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('expertise:open-card', { detail: { card: 0 } }))
      window.dispatchEvent(new CustomEvent('preconstruction:set-tab', { detail: { tab } }))
    }, 80)
    window.setTimeout(() => scrollTo(anchorId), 280)
  }

  const goToPreconstructionSection = (key: (typeof EXPERTISE_PRECONSTRUCTION_LINKS)[number]['section']) => {
    setLandingModule('expertise')
    scrollTo('expertise')
    setActiveItem(null)
    setExpertiseMenuHover(null)
    setExpertisePreconSubHover(null)
    const preTab: 0 | 1 = key === 'preliminary' ? 1 : 0
    const anchorId =
      key === 'engineering'
        ? 'preconstruction-engineering-led'
        : key === 'projects'
          ? 'preconstruction-projects-cost-estimating'
          : 'preconstruction-preliminary-plan'
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('expertise:open-card', { detail: { card: 0 } }))
      window.dispatchEvent(new CustomEvent('preconstruction:set-tab', { detail: { tab: preTab } }))
    }, 80)
    window.setTimeout(() => scrollTo(anchorId), 240)
  }

  const goToConstructionManagementSection = (key: (typeof EXPERTISE_CM_LINKS)[number]['section']) => {
    setLandingModule('expertise')
    scrollTo('expertise')
    setActiveItem(null)
    setExpertiseMenuHover(null)
    setExpertisePreconSubHover(null)
    const tabByKey: Record<(typeof EXPERTISE_CM_LINKS)[number]['section'], 0 | 1 | 2 | null> = {
      methodology: null,
      field: 0,
      vdc: 1,
      performance: 2,
    }
    const anchorId =
      key === 'methodology'
        ? 'construction-management-methodology'
        : key === 'field'
          ? 'construction-management-field-operations'
          : key === 'vdc'
            ? 'construction-management-virtual-design'
            : 'construction-management-performance-monitoring'
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('expertise:open-card', { detail: { card: 1 } }))
      const t = tabByKey[key]
      if (t !== null) {
        window.dispatchEvent(new CustomEvent('construction-management:set-tab', { detail: { tab: t } }))
      }
    }, 80)
    window.setTimeout(() => scrollTo(anchorId), 300)
  }

  const goToConstructionProjects = () => {
    openExpertiseCard(1)

    // Wait for the expertise card to mount expanded content before scrolling.
    window.setTimeout(() => {
      scrollTo('construction-management-projects')
    }, 380)
  }

  const goToSafetyTab = (tab: 0 | 1 | 2) => {
    setLandingModule('safety')
    scrollTo('expertise')
    // Dar tiempo a que monte SafetySection antes del evento (p. ej. viniendo desde Expertise).
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('safety:set-tab', { detail: { tab } }))
    }, 120)
    setActiveItem(null)
  }

  const goToAboutTab = (tab: 0 | 1 | 2 | 3 | 4) => {
    setLandingModule('about')
    scrollTo('expertise')
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('about:set-tab', { detail: { tab } }))
    }, 160)
    setActiveItem(null)
  }

  const runNavItemAction = (itemId: (typeof navItems)[number]['id']) => {
    if (itemId === 'expertise') {
      setLandingModule('expertise')
      scrollTo('expertise')
      return
    }
    if (itemId === 'projects') {
      goToConstructionProjects()
      return
    }
    if (itemId === 'safety') {
      setLandingModule('safety')
      scrollTo('expertise')
      return
    }
    if (itemId === 'about') {
      setLandingModule('about')
      scrollTo('expertise')
      return
    }
    if (itemId === 'careers') {
      setActiveItem(null)
      setExpertiseMenuHover(null)
      setExpertisePreconSubHover(null)
      scrollTo('careers')
      return
    }
  }

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onMq = () => {
      if (mq.matches) {
        setIsMobileMenuOpen(false)
        setMobileExpandedParent(null)
      }
    }
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  useEffect(() => {
    if (activeItem !== 'expertise') {
      setExpertiseMenuHover(null)
      setExpertisePreconSubHover(null)
    }
  }, [activeItem])

  useEffect(() => {
    if (expertiseMenuHover !== 'precon') setExpertisePreconSubHover(null)
  }, [expertiseMenuHover])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMobileMenuOpen])

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

  useLayoutEffect(() => {
    if (!activeItem || !NAV_ITEMS_WITH_DESKTOP_MEGA.has(activeItem)) {
      setDesktopMegaPadPx(0)
      return
    }
    const measure = () => {
      const idx = navItems.findIndex((i) => i.id === activeItem)
      const btn = navDesktopBtnRefs.current[idx]
      const track = desktopMegaTrackRef.current
      if (!btn || !track) return
      const pl = btn.getBoundingClientRect().left - track.getBoundingClientRect().left
      setDesktopMegaPadPx(Math.max(0, Math.round(pl)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    const track = desktopMegaTrackRef.current
    const navRow = desktopNavRowRef.current
    if (track) ro.observe(track)
    if (navRow) ro.observe(navRow)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [activeItem])

  return (
    <header
      className={`pointer-events-none fixed left-0 right-0 top-0 z-50 pt-2 transition-transform duration-300 sm:pt-2 md:pt-2.5 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className="pointer-events-auto box-border w-full max-w-[100vw] border-2 bg-black/70 backdrop-blur-md pl-3 pr-4 py-2.5 shadow-lg transition-[padding] duration-200 sm:pl-5 sm:pr-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8"
        style={{ borderColor: BRAND_ORANGE }}
        onMouseLeave={() => {
          setActiveItem(null)
          setExpertiseMenuHover(null)
          setExpertisePreconSubHover(null)
        }}
      >
        <div className="flex min-h-[3.75rem] flex-col sm:min-h-[4.15rem] xl:grid xl:min-h-[4.5rem] xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-stretch xl:gap-x-3 xl:min-h-[4.75rem] xl:gap-x-6">
          <div className="flex min-h-[inherit] w-full flex-1 items-center gap-3 sm:gap-4 xl:contents xl:min-h-0">
          <div className="ml-3 flex min-w-0 shrink-0 items-center gap-2.5 sm:ml-6 sm:gap-3 xl:ml-10 xl:row-start-1 xl:col-start-1 md:min-h-[4.5rem] xl:min-h-[4.75rem]">
            <button
              type="button"
              onClick={() => scrollTo('home')}
              aria-label="Ir al inicio"
              className="transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
            >
              <HeaderLogo className="h-9 w-auto text-white sm:h-10 md:h-11" aria-label="TOTAL Civil Construction" role="img" />
            </button>
          </div>

          <nav
            aria-label="Navegación escritorio"
            className="hidden min-w-0 xl:row-start-1 xl:col-start-2 xl:flex xl:min-h-0 xl:min-w-0 xl:h-full xl:items-center"
          >
            <div
              ref={desktopNavRowRef}
              className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 xl:gap-x-14"
            >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => {
                  navDesktopBtnRefs.current[index] = el
                }}
                type="button"
                className={`relative shrink-0 inline-flex items-center gap-1.5 pb-1 text-sm font-sans transition ${activeItem === item.id ? 'text-[#E4611F]' : 'text-white/90 hover:text-white'}`}
                onClick={() => runNavItemAction(item.id)}
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

          <div className="ml-auto flex min-w-0 shrink-0 items-center gap-2 sm:gap-4 xl:row-start-1 xl:col-start-3 xl:mr-10 xl:ml-0 xl:min-h-[4.5rem] xl:justify-end xl:min-h-[4.75rem] xl:gap-10">
            <a
              href="tel:+13014597484"
              className="hidden min-w-0 max-w-[min(11rem,42vw)] items-center gap-2 text-sm font-sans text-white/90 transition hover:text-white xl:inline-flex xl:max-w-none"
              aria-label="Llamar (301) 459 7484"
            >
              <HeaderPhoneIcon className="shrink-0 text-white" />
              <span className="truncate">(301) 459 7484</span>
            </a>
            <button
              type="button"
              className="hidden xl:inline-block -ml-3 min-w-[8.5rem] origin-center rounded-lg border border-white bg-transparent px-5 py-1.5 text-xs font-sans font-medium text-white transition-all duration-200 ease-out hover:scale-[1.04] hover:border-[#E4611F] hover:text-[#E4611F] sm:-ml-4 sm:min-w-[9.75rem] sm:px-5 sm:py-2 sm:text-sm xl:min-w-[10.5rem] xl:px-8"
              onClick={() => openContactModal()}
            >
              Contact Us
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white p-1.5 text-white transition hover:border-[#E4611F] hover:text-[#E4611F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4611F] xl:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-header-nav"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => {
                setIsMobileMenuOpen((open) => {
                  const next = !open
                  if (next) setActiveItem(null)
                  if (!next) setMobileExpandedParent(null)
                  return next
                })
              }}
            >
              <HeaderMenuToggleIcon open={isMobileMenuOpen} className="h-[1.15rem] w-[1.15rem] shrink-0" />
            </button>
          </div>
          </div>

        <div
          className={`hidden transition-all duration-200 xl:row-start-2 xl:col-start-2 xl:col-end-3 xl:block xl:min-w-0 ${
            activeItem && NAV_ITEMS_WITH_DESKTOP_MEGA.has(activeItem) ? 'max-h-[min(34rem,90vh)] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <div ref={desktopMegaTrackRef} className="w-full py-5">
            {activeItem && NAV_ITEMS_WITH_DESKTOP_MEGA.has(activeItem) ? (
              <div className="text-white" style={{ paddingLeft: desktopMegaPadPx }}>
                <div
                  className={`grid justify-items-start gap-6 ${
                    activeItem === 'expertise'
                      ? !expertiseMenuHover
                        ? 'grid-cols-1'
                        : expertiseMenuHover === 'cm'
                          ? 'grid-cols-[max-content_minmax(0,1fr)]'
                          : expertisePreconSubHover
                            ? 'grid-cols-[max-content_max-content_minmax(0,1fr)]'
                            : 'grid-cols-[max-content_minmax(0,1fr)]'
                      : 'grid-cols-1'
                  }`}
                >
                  {activeItem === 'expertise' ? (
                    <>
                      <div className="flex w-max max-w-none shrink-0 flex-col gap-1 text-white">
                        <button
                          type="button"
                          onMouseEnter={() => setExpertiseMenuHover('precon')}
                          onFocus={() => setExpertiseMenuHover('precon')}
                          onClick={() => openExpertiseCard(0)}
                          className="group origin-left transform-gpu inline-flex w-max max-w-none items-center gap-1.5 whitespace-nowrap py-1 text-left text-sm font-medium text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                        >
                          Preconstruction
                          <NavItemCaret className="h-3.5 w-3.5 -rotate-90 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                        <button
                          type="button"
                          onMouseEnter={() => setExpertiseMenuHover('cm')}
                          onFocus={() => setExpertiseMenuHover('cm')}
                          onClick={() => openExpertiseCard(1)}
                          className="group origin-left transform-gpu inline-flex w-max max-w-none items-center gap-1.5 whitespace-nowrap py-1 text-left text-sm font-medium text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                        >
                          Construction Management
                          <NavItemCaret className="h-3.5 w-3.5 -rotate-90 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      </div>
                      {expertiseMenuHover ? (
                        <div className="relative max-w-[26rem] pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-full before:bg-white/85">
                          <ul className="space-y-2.5">
                            {expertiseMenuHover === 'precon'
                              ? EXPERTISE_PRECONSTRUCTION_LINKS.map((link) => (
                                  <li key={link.label}>
                                    <button
                                      type="button"
                                      onMouseEnter={() => {
                                        if (link.section === 'projects') setExpertisePreconSubHover('projects')
                                        else if (link.section === 'preliminary') setExpertisePreconSubHover('preliminary')
                                        else setExpertisePreconSubHover(null)
                                      }}
                                      onFocus={() => {
                                        if (link.section === 'projects') setExpertisePreconSubHover('projects')
                                        else if (link.section === 'preliminary') setExpertisePreconSubHover('preliminary')
                                        else setExpertisePreconSubHover(null)
                                      }}
                                      onClick={() => goToPreconstructionSection(link.section)}
                                      className="origin-left transform-gpu w-full text-left text-sm font-medium leading-snug text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                                    >
                                      {link.label}
                                    </button>
                                  </li>
                                ))
                              : EXPERTISE_CM_LINKS.map((link) => (
                                  <li key={link.label}>
                                    <button
                                      type="button"
                                      onClick={() => goToConstructionManagementSection(link.section)}
                                      className="origin-left transform-gpu w-full text-left text-sm font-medium leading-snug text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                                    >
                                      {link.label}
                                    </button>
                                  </li>
                                ))}
                          </ul>
                        </div>
                      ) : null}
                      {expertiseMenuHover === 'precon' && expertisePreconSubHover === 'projects' ? (
                        <div
                          onMouseEnter={() => setExpertisePreconSubHover('projects')}
                          className="relative min-w-[11rem] w-full max-w-2xl pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-full before:bg-white/85"
                        >
                          <ul className="space-y-2.5">
                            {EXPERTISE_PROJECTS_COST_SUBLINKS.map((sub) => (
                              <li key={sub.anchorId}>
                                <button
                                  type="button"
                                  onClick={() => goToPreconstructionSubAnchor(sub.anchorId, 0)}
                                  className="origin-left transform-gpu w-full text-left text-sm font-medium leading-snug text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                                >
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {expertiseMenuHover === 'precon' && expertisePreconSubHover === 'preliminary' ? (
                        <div
                          onMouseEnter={() => setExpertisePreconSubHover('preliminary')}
                          className="relative min-w-[11rem] w-full max-w-2xl pl-5 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-full before:bg-white/85"
                        >
                          <ul className="space-y-2.5">
                            {EXPERTISE_PRELIMINARY_SUBLINKS.map((sub) => (
                              <li key={sub.anchorId}>
                                <button
                                  type="button"
                                  onClick={() => goToPreconstructionSubAnchor(sub.anchorId, 1)}
                                  className="origin-left transform-gpu w-full text-left text-sm font-medium leading-snug text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                                >
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    navPanels[activeItem].map((column, columnIndex) => (
                      <div key={column.title || `col-${columnIndex}`} className="text-white">
                        {column.title ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75">{column.title}</p>
                        ) : null}
                        <ul className={`${column.title ? 'mt-3' : 'mt-0'} space-y-2.5`}>
                          {column.items.map((entry, itemIndex) => (
                            <li key={entry}>
                              <button
                                type="button"
                                onClick={() => {
                                  if (activeItem === 'safety' && itemIndex >= 0 && itemIndex <= 2) {
                                    goToSafetyTab(itemIndex as 0 | 1 | 2)
                                    return
                                  }
                                  if (activeItem === 'about' && itemIndex >= 0 && itemIndex <= 4) {
                                    goToAboutTab(itemIndex as 0 | 1 | 2 | 3 | 4)
                                  }
                                }}
                                className="origin-left transform-gpu whitespace-pre-line text-left text-sm font-medium text-white/90 transition duration-150 ease-out hover:scale-[1.03] hover:text-white hover:underline hover:decoration-1 hover:underline-offset-2"
                              >
                                {entry}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        </div>

        <nav
          id="mobile-header-nav"
          aria-label="Navegación principal"
          aria-hidden={!isMobileMenuOpen}
          className={`xl:hidden border-t transition-all duration-200 motion-reduce:transition-none ${
            isMobileMenuOpen
              ? 'max-h-[min(32rem,85vh)] overflow-y-auto border-white/20 pt-1 opacity-100'
              : 'pointer-events-none max-h-0 overflow-hidden border-transparent py-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col pb-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <div className="flex w-full items-center justify-between gap-2">
                  <button
                    type="button"
                    className="flex-1 py-3.5 text-left text-sm font-sans text-white/90 transition hover:text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setMobileExpandedParent(null)
                      runNavItemAction(item.id)
                    }}
                  >
                    {item.label}
                  </button>
                  {item.id === 'about' || item.id === 'safety' || item.id === 'expertise' ? (
                    <button
                      type="button"
                      aria-expanded={mobileExpandedParent === item.id}
                      aria-label={`Mostrar submenú de ${item.label}`}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-white/80 transition hover:text-white"
                      onClick={() => {
                        setMobileExpandedParent((current) => (current === item.id ? null : item.id))
                      }}
                    >
                      <NavItemCaret
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          mobileExpandedParent === item.id ? 'rotate-180 opacity-100' : 'opacity-70'
                        }`}
                      />
                    </button>
                  ) : null}
                </div>
                {item.id === 'about' && mobileExpandedParent === 'about' ? (
                  <ul className="mb-2 space-y-1 border-l border-white/20 pl-3">
                    {ABOUT_SUBNAV_ITEMS.map((label, idx) => (
                      <li key={label}>
                        <button
                          type="button"
                          className="w-full py-2 text-left text-xs font-medium text-white/80 transition hover:text-white"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            goToAboutTab(idx as 0 | 1 | 2 | 3 | 4)
                          }}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.id === 'safety' && mobileExpandedParent === 'safety' ? (
                  <ul className="mb-2 space-y-1 border-l border-white/20 pl-3">
                    {SAFETY_SUBNAV_ITEMS.map((label, idx) => (
                      <li key={label}>
                        <button
                          type="button"
                          className="w-full py-2 text-left text-xs font-medium text-white/80 transition hover:text-white"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            goToSafetyTab(idx as 0 | 1 | 2)
                          }}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.id === 'expertise' && mobileExpandedParent === 'expertise' ? (
                  <ul className="mb-2 space-y-3 border-l border-white/20 pl-3">
                    <li>
                      <p className="py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/55">
                        Preconstruction
                      </p>
                      <ul className="space-y-1 pl-1">
                        {EXPERTISE_PRECONSTRUCTION_LINKS.map((link) => (
                          <li key={link.label}>
                            <button
                              type="button"
                              className="w-full py-2 text-left text-xs font-medium text-white/80 transition hover:text-white"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                goToPreconstructionSection(link.section)
                              }}
                            >
                              {link.label}
                            </button>
                            {link.section === 'projects' ? (
                              <ul className="mt-1 space-y-1 border-l border-white/15 pl-2">
                                {EXPERTISE_PROJECTS_COST_SUBLINKS.map((sub) => (
                                  <li key={sub.anchorId}>
                                    <button
                                      type="button"
                                      className="w-full py-1.5 text-left text-[0.7rem] font-medium text-white/70 transition hover:text-white"
                                      onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        goToPreconstructionSubAnchor(sub.anchorId, 0)
                                      }}
                                    >
                                      {sub.label}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                            {link.section === 'preliminary' ? (
                              <ul className="mt-1 space-y-1 border-l border-white/15 pl-2">
                                {EXPERTISE_PRELIMINARY_SUBLINKS.map((sub) => (
                                  <li key={sub.anchorId}>
                                    <button
                                      type="button"
                                      className="w-full py-1.5 text-left text-[0.7rem] font-medium text-white/70 transition hover:text-white"
                                      onClick={() => {
                                        setIsMobileMenuOpen(false)
                                        goToPreconstructionSubAnchor(sub.anchorId, 1)
                                      }}
                                    >
                                      {sub.label}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <p className="py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/55">
                        Construction Management
                      </p>
                      <ul className="space-y-1 pl-1">
                        {EXPERTISE_CM_LINKS.map((link) => (
                          <li key={link.label}>
                            <button
                              type="button"
                              className="w-full py-2 text-left text-xs font-medium text-white/80 transition hover:text-white"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                goToConstructionManagementSection(link.section)
                              }}
                            >
                              {link.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="border-t border-white/15 pt-2">
              <button
                type="button"
                className="w-full rounded-lg border border-white py-3 text-center text-sm font-sans font-medium text-white transition hover:border-[#E4611F] hover:text-[#E4611F]"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openContactModal()
                }}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
