import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_zom3mye'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

export type ContactMessagePayload = {
  name: string
  email: string
  message: string
  website?: string
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<{
  ok: boolean
  message?: string
}> {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS no está configurado. Contacta al administrador.')
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        Name: payload.name,
        Email: payload.email,
        Additional: payload.message,
      },
      PUBLIC_KEY,
    )

    return { ok: true, message: 'Mensaje enviado correctamente' }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.')
    }
    throw err
  }
}
