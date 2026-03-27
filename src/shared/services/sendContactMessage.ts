const API_URL = (import.meta.env.VITE_CONTACT_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')

if (import.meta.env.DEV && !import.meta.env.VITE_CONTACT_API_URL) {
  console.warn(
    '[contact] VITE_CONTACT_API_URL no está definida; usando http://localhost:3001 (solo desarrollo).',
  )
}

export type ContactMessagePayload = {
  name: string
  email: string
  message: string
  /** Honeypot: debe ir vacío */
  website?: string
}

export async function sendContactMessage(payload: ContactMessagePayload): Promise<{
  ok: boolean
  message?: string
}> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 15_000)

  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        website: payload.website ?? '',
      }),
      signal: controller.signal,
    })

    const data: { ok?: boolean; message?: string; error?: string } = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(typeof data.error === 'string' ? data.error : 'Error al enviar el mensaje')
    }

    return { ok: true, message: typeof data.message === 'string' ? data.message : undefined }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('La solicitud tardó demasiado. Revisa tu conexión.')
    }
    if (err instanceof TypeError) {
      throw new Error('No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.')
    }
    throw err
  } finally {
    window.clearTimeout(timeoutId)
  }
}
