import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { z } from 'zod'

import {
  buildContactFormHtml,
  getContactFormAttachments,
  getContactLogoImgSrc,
} from './email/contactFormHtml.js'

dotenv.config()

const app = express()
app.use(helmet())
app.use(express.json({ limit: '20kb' }))

const corsOrigins =
  process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()).filter(Boolean) || [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ]

app.use(
  cors({
    origin: corsOrigins,
    methods: ['POST', 'GET'],
    credentials: true,
  }),
)

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
})
app.use('/api/', limiter)

/** Alineado con el modal: name, email, message + honeypot website */
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Correo electrónico inválido').max(120),
  message: z.string().min(1, 'El mensaje no puede estar vacío').max(1500),
  website: z.string().max(0, 'Solicitud inválida').optional(),
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

function escapeHtml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function normalizeBody(req) {
  const raw = req.body || {}
  return {
    name: typeof raw.name === 'string' ? raw.name.trim() : '',
    email: typeof raw.email === 'string' ? raw.email.trim() : '',
    message: typeof raw.message === 'string' ? raw.message.trim() : '',
    website: typeof raw.website === 'string' ? raw.website.trim() : undefined,
  }
}

app.get('/health', (_, res) => {
  res.json({ ok: true, message: 'Mailer API funcionando correctamente' })
})

app.post('/api/contact', async (req, res) => {
  try {
    const body = normalizeBody(req)
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message || 'Datos inválidos'
      return res.status(400).json({
        ok: false,
        error: first,
        details: parsed.error.issues,
      })
    }

    const { name, email, message } = parsed.data

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.TO_EMAIL) {
      console.error('Faltan variables GMAIL_USER, GMAIL_APP_PASSWORD o TO_EMAIL')
      return res.status(500).json({
        ok: false,
        error: 'Servicio de correo no configurado. Intenta más tarde.',
      })
    }

    const emailSubject = `Nuevo mensaje — Contact Us | ${name}`
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const emailText = `
NUEVO MENSAJE (Contact Us)

Nombre: ${name}
Correo: ${email}
Mensaje:
${message}

— Enviado desde el formulario de la web TOTAL Civil Construction.
    `.trim()

    const logoSrc = getContactLogoImgSrc()
    const emailHtml = buildContactFormHtml({
      name: safeName,
      email: safeEmail,
      message: safeMessage,
      logoImgSrc: logoSrc,
    })

    await transporter.sendMail({
      from: `"TCCE Web Form" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      attachments: getContactFormAttachments(),
    })

    console.log(`Correo enviado: ${name} (${email})`)

    res.json({ ok: true, message: 'Mensaje enviado correctamente' })
  } catch (error) {
    console.error('Error al enviar correo:', error)
    res.status(500).json({
      ok: false,
      error: 'No se pudo enviar el mensaje. Por favor, intenta más tarde.',
    })
  }
})

app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Ruta no encontrada' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Mailer API en puerto ${PORT}`)
  console.log(`Destino TO_EMAIL: ${process.env.TO_EMAIL || 'NO CONFIGURADO'}`)
  console.log(`CORS: ${corsOrigins.join(', ')}`)
})
