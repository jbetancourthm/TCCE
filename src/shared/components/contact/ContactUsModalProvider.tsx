import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { toast, Toaster } from 'sonner'

import { sendContactMessage } from '../../services/sendContactMessage'

/** Límites de caracteres (incl. espacios; el envío usa trim). */
export const CONTACT_FORM_NAME_MAX = 100
export const CONTACT_FORM_EMAIL_MAX = 120
export const CONTACT_FORM_MESSAGE_MAX = 1500

/** Validación de email razonable para formularios (no sustituye validación en servidor). */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i

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

function ContactModalSubmitSpinner() {
  return (
    <span
      className="inline-block size-4 shrink-0 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin motion-reduce:border-t-transparent motion-reduce:animate-none"
      aria-hidden
    />
  )
}

function ContactUsModalDialog() {
  const { isOpen, close } = useContactUsModal()
  const titleId = useId()
  const honeypotId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  /** Honeypot anti-bot (oculto; debe quedar vacío). */
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  isSubmittingRef.current = isSubmitting

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setMessage('')
      setHoneypot('')
      setIsSubmitting(false)
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmittingRef.current) close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  /** Evita que el autocompletado llene el honeypot al abrir (antes era name="website" y bloqueaba el envío sin mensaje). */
  useEffect(() => {
    if (!isOpen) return undefined
    const clear = () => setHoneypot('')
    const t0 = window.setTimeout(clear, 0)
    const t1 = window.setTimeout(clear, 120)
    const t2 = window.setTimeout(clear, 450)
    return () => {
      window.clearTimeout(t0)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [isOpen])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nameTrim = name.trim()
    const emailTrim = email.trim()
    const messageTrim = message.trim()

    if (!nameTrim || !emailTrim || !messageTrim) {
      toast.error('Por favor, completa todos los campos.')
      return
    }
    if (!EMAIL_REGEX.test(emailTrim)) {
      toast.error('Introduce un email válido.')
      return
    }

    setIsSubmitting(true)
    try {
      await sendContactMessage({
        name: nameTrim,
        email: emailTrim,
        message: messageTrim,
        website: honeypot,
      })
      toast.success('Gracias. Tu mensaje fue enviado correctamente.')
      close()
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : 'No se pudo enviar el mensaje.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" aria-hidden />

      <div className="relative z-10 flex h-fit max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] ring-1 ring-[#E4611F]/35">
        <div className="h-1.5 w-full shrink-0 bg-[#E4611F]" aria-hidden />

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-100 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div>
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-neutral-800 sm:text-2xl">
              Contact Us
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              Send a message or reach us directly.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={isSubmitting}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-lg font-light leading-none text-neutral-600 transition hover:bg-[#E4611F] hover:text-white disabled:pointer-events-none disabled:opacity-45"
            aria-label="Cerrar ventana"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <form
            onSubmit={onSubmit}
            className="relative flex flex-col gap-4"
            noValidate
            aria-busy={isSubmitting}
          >
            <input
              id={honeypotId}
              type="text"
              name="tcce_hp"
              value={honeypot}
              onChange={(ev) => setHoneypot(ev.target.value)}
              tabIndex={-1}
              autoComplete="off"
              data-lpignore="true"
              className="pointer-events-none fixed left-[120%] h-0 w-0 opacity-0"
              aria-hidden
            />
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
                maxLength={CONTACT_FORM_NAME_MAX}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[#E4611F] focus:ring-2 focus:ring-[#E4611F]/25 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="Your name"
              />
              <p className="mt-1 text-right text-xs text-neutral-400">
                {name.length}/{CONTACT_FORM_NAME_MAX}
              </p>
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
                maxLength={CONTACT_FORM_EMAIL_MAX}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[#E4611F] focus:ring-2 focus:ring-[#E4611F]/25 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="you@company.com"
              />
              <p className="mt-1 text-right text-xs text-neutral-400">
                {email.length}/{CONTACT_FORM_EMAIL_MAX}
              </p>
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
                maxLength={CONTACT_FORM_MESSAGE_MAX}
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                disabled={isSubmitting}
                className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[#E4611F] focus:ring-2 focus:ring-[#E4611F]/25 disabled:cursor-not-allowed disabled:opacity-60"
                placeholder="How can we help?"
              />
              <p className="mt-1 text-right text-xs text-neutral-400">
                {message.length}/{CONTACT_FORM_MESSAGE_MAX}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#E4611F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c9551a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4611F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-[0.72]"
            >
              {isSubmitting ? (
                <>
                  <ContactModalSubmitSpinner />
                  <span>Sending…</span>
                </>
              ) : (
                'Send message'
              )}
            </button>
          </form>

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
      <Toaster
        position="top-center"
        richColors
        closeButton
        offset="1rem"
        className="z-[260]"
        toastOptions={{
          classNames: {
            toast: 'font-sans shadow-lg',
          },
        }}
      />
      {children}
      <ContactUsModalDialog />
    </ContactUsModalContext.Provider>
  )
}
