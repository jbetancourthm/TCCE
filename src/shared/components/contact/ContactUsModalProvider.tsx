import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

type ContactUsModalContextValue = {
  open: () => void
  close: () => void
  isOpen: boolean
}

const ContactUsModalContext = createContext<ContactUsModalContextValue | null>(null)

export function useContactUsModal() {
  const ctx = useContext(ContactUsModalContext)
  if (!ctx) {
    throw new Error('useContactUsModal debe usarse dentro de ContactUsModalProvider')
  }
  return ctx
}

function ContactUsModalDialog() {
  const { isOpen, close } = useContactUsModal()
  const titleId = useId()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false)
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Cerrar"
        onClick={close}
      />

      <div className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] ring-1 ring-[#E4611F]/35">
        <div className="h-1.5 w-full shrink-0 bg-[#E4611F]" aria-hidden />

        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div>
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-neutral-800 sm:text-2xl">
              Contact Us
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              Send a message or reach us directly. Vista provisional; luego se conectará el envío real.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-lg font-light leading-none text-neutral-600 transition hover:bg-[#E4611F] hover:text-white"
            aria-label="Cerrar ventana"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {submitted ? (
            <p className="rounded-2xl bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-700">
              Gracias — esto es una vista previa. Pronto podrás enviar mensajes desde aquí.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[#E4611F] focus:ring-2 focus:ring-[#E4611F]/25"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[#E4611F] focus:ring-2 focus:ring-[#E4611F]/25"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-msg"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-500"
                >
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={4}
                  className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[#E4611F] focus:ring-2 focus:ring-[#E4611F]/25"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-[#E4611F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c9551a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4611F] focus-visible:ring-offset-2"
              >
                Send message
              </button>
            </form>
          )}

          <div className="mt-6 border-t border-neutral-100 pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Direct</p>
            <a
              href="tel:+13014597484"
              className="mt-2 inline-flex text-sm font-semibold text-[#E4611F] underline-offset-2 hover:underline"
            >
              (301) 459 7484
            </a>
            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              9344 Lanham Severn Rd, Suite 210
              <br />
              Lanham, MD 20706
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function ContactUsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])

  return (
    <ContactUsModalContext.Provider value={value}>
      {children}
      <ContactUsModalDialog />
    </ContactUsModalContext.Provider>
  )
}
