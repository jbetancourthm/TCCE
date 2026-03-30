import HeaderLogo from '../../utils/icons/header/Logo'
import FooterLocationIcon from '../../utils/icons/footer/FooterLocationIcon'
import FooterPhoneIcon from '../../utils/icons/footer/FooterPhoneIcon'
import FooterEmailIcon from '../../utils/icons/footer/FooterEmailIcon'
import useScrollToSection from '../hooks/useScrollToSection'
import { useContactUsModal } from './contact/ContactUsModalProvider'

const footerNavItems = [
  { label: 'Our Expertise', id: 'expertise' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Safety', id: 'safety' },
  { label: 'Careers', id: 'careers' },
] as const

export default function Footer() {
  const scrollTo = useScrollToSection()
  const { open: openContactModal } = useContactUsModal()

  const setLandingModule = (module: 'expertise' | 'safety' | 'about') => {
    window.dispatchEvent(new CustomEvent('landing:set-module', { detail: { module } }))
  }

  const openConstructionProjects = () => {
    setLandingModule('expertise')
    scrollTo('expertise')
    window.dispatchEvent(new CustomEvent('expertise:open-card', { detail: { card: 1 } }))
    window.setTimeout(() => scrollTo('construction-management-projects'), 380)
  }

  const handleNavClick = (id: string) => {
    if (id === 'projects') {
      openConstructionProjects()
      return
    }
    if (id === 'safety') {
      setLandingModule('safety')
      scrollTo('expertise')
      return
    }
    if (id === 'about') {
      setLandingModule('about')
      scrollTo('expertise')
      return
    }
    if (id === 'expertise') {
      setLandingModule('expertise')
      scrollTo('expertise')
      return
    }
    if (id === 'careers') {
      scrollTo('careers')
      return
    }
    scrollTo(id)
  }

  const navLinkClass =
    'underline decoration-white underline-offset-4 transition hover:text-[#E4611F] hover:decoration-[#E4611F]'

  return (
    <footer className="bg-[#06070c]">
      <div className="mx-auto w-full bg-white">
        <div className="flex w-full items-end justify-center overflow-hidden leading-none">
          <img
            src="/images/footer/footer.png"
            alt=""
            className="block h-auto w-full min-w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="bg-[#06070c] text-white">
        <div className="mx-auto w-[94%] max-w-[120rem] py-6">
          <div className="mt-8 border-b-2 border-[#E4611F]/60 pb-8">
            <div className="flex w-full justify-center px-2 md:hidden">
              <div className="flex max-w-full flex-row flex-nowrap items-start gap-8 sm:gap-11">
                <div className="box-border flex shrink-0 flex-col items-start gap-3">
                  <HeaderLogo
                    className="h-9 w-auto max-w-[10.5rem] text-white sm:h-10 sm:max-w-[11.5rem]"
                    aria-label="TOTAL Civil Construction"
                    role="img"
                  />
                  <button
                    type="button"
                    onClick={() => openContactModal()}
                    className="box-border rounded-md border border-white px-4 py-2.5 text-left text-sm font-medium leading-snug text-white transition hover:border-[#E4611F] hover:text-[#E4611F] sm:text-[0.9375rem]"
                  >
                    Contact Us
                  </button>
                </div>
                <nav
                  className="box-border flex max-w-[11.5rem] shrink-0 flex-col items-end gap-2.5 break-words text-sm font-semibold leading-snug sm:max-w-[13rem] sm:text-base"
                  aria-label="Footer"
                >
                {footerNavItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`max-w-full ${navLinkClass} text-right underline-offset-2 [overflow-wrap:anywhere]`}
                  >
                    {item.label}
                  </button>
                ))}
                </nav>
              </div>
            </div>

            <div className="hidden flex-wrap items-center justify-between gap-6 md:flex">
              <nav className="ml-4 flex flex-wrap items-center gap-28 text-base font-semibold md:gap-44">
                {footerNavItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => handleNavClick(item.id)} className={navLinkClass}>
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => openContactModal()}
                className="min-w-0 shrink-0 rounded-lg border border-white px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#E4611F] hover:text-[#E4611F]"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="mb-10 pt-6">
            <div className="flex flex-col items-center gap-5 text-center text-base md:hidden">
              <span className="inline-flex max-w-[20rem] items-start justify-center gap-2">
                <FooterLocationIcon className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                <span>
                  9344 Lanham Severn Rd, Suite
                  <br />
                  210 Lanham, MD 20706
                </span>
              </span>
              <a href="tel:+13014597484" className="inline-flex items-center gap-2 transition hover:text-white">
                <FooterPhoneIcon className="h-5 w-5 text-white" />
                <span>301 459 7484</span>
              </a>
              <a href="tel:+13014597487" className="inline-flex items-center gap-2 transition hover:text-white">
                <FooterPhoneIcon className="h-5 w-5 text-white" />
                <span>301 459 7487</span>
              </a>
              <a href="mailto:contact@tcce.biz" className="inline-flex items-center gap-2 transition hover:text-white">
                <FooterEmailIcon className="h-5 w-5 text-white" />
                <span>contact@tcce.biz</span>
              </a>
              <div className="hidden" aria-hidden />
            </div>

            <div className="hidden flex-wrap items-center justify-between gap-6 md:flex">
              <div className="flex flex-wrap items-center gap-12 text-sm text-white md:gap-16">
                <HeaderLogo className="h-12 w-auto text-white" aria-label="TOTAL Civil Construction" role="img" />
                <span className="inline-flex items-center gap-2">
                  <FooterLocationIcon className="h-5 w-5 text-white" />
                  <span>
                    9344 Lanham Severn Rd, Suite
                    <br />
                    210 Lanham, MD 20706
                  </span>
                </span>
                <a href="tel:+13014597484" className="inline-flex items-center gap-2 transition hover:text-white">
                  <FooterPhoneIcon className="h-5 w-5 text-white" />
                  <span>301 459 7484</span>
                </a>
                <a href="tel:+13014597487" className="inline-flex items-center gap-2 transition hover:text-white">
                  <FooterPhoneIcon className="h-5 w-5 text-white" />
                  <span>301 459 7487</span>
                </a>
                <a href="mailto:contact@tcce.biz" className="inline-flex items-center gap-2 transition hover:text-white">
                  <FooterEmailIcon className="h-5 w-5 text-white" />
                  <span>contact@tcce.biz</span>
                </a>
              </div>

              <div className="hidden" aria-hidden />
            </div>
          </div>

          <p className="text-center text-xs text-white">© 2026 TCCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
