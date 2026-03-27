import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const CONTACT_LOGO_CID = 'tcce_logo'

/** URL absoluta (https) a un PNG del logo — mejor para Outlook. Si no existe, se usa SVG embebido por cid. */
export function getContactLogoImgSrc() {
  const url = process.env.EMAIL_LOGO_URL?.trim().replace(/["'<>]/g, '')
  if (url) return url
  return `cid:${CONTACT_LOGO_CID}`
}

export function getContactFormAttachments() {
  if (process.env.EMAIL_LOGO_URL?.trim()) return []

  const logoPath = path.join(__dirname, '..', 'assets', 'email-logo.svg')
  if (!fs.existsSync(logoPath)) {
    console.warn('[email] Falta backend/assets/email-logo.svg; el correo irá sin logo.')
    return []
  }

  return [
    {
      filename: 'tcce-logo.svg',
      path: logoPath,
      cid: CONTACT_LOGO_CID,
      contentDisposition: 'inline',
    },
  ]
}

/**
 * HTML de correo Contact Us (tablas + estlos inline).
 * name, email, message deben llegar ya escapados (escapeHtml).
 */
export function buildContactFormHtml({ name, email, message, logoImgSrc }) {
  const brand = '#E4611F'
  const brandSoft = '#fff4ec'
  const ink = '#0f172a'
  const muted = '#64748b'
  const line = '#e2e8f0'

  const cardShadow = '0 20px 50px rgba(15,23,42,0.08), 0 4px 16px rgba(228,97,31,0.06)'

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Nuevo mensaje — Contact Us</title>
</head>
<body style="margin:0;padding:0;background:#e8ecf3;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(180deg,#dfe6f0 0%,#e8ecf3 40%,#f1f4f9 100%);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;border-collapse:separate;border-spacing:0;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:${cardShadow};border:1px solid ${line};">

          <tr>
            <td style="background:linear-gradient(155deg,${brand} 0%,#d55616 45%,#a84310 100%);padding:28px 24px 26px;text-align:center;">
              <img src="${logoImgSrc}" width="204" height="60" alt="TOTAL Civil Construction" style="display:block;margin:0 auto;height:44px;width:auto;max-width:min(280px,92vw);" />
              <p style="margin:14px 0 0;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.88);">
                Contact · Web form
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:26px 26px 8px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${brandSoft};border:1px solid #ffdac2;border-radius:14px;margin-bottom:22px;">
                <tr>
                  <td style="padding:14px 18px;font-size:14px;line-height:1.5;color:#9a3412;font-family:system-ui,-apple-system,sans-serif;">
                    <strong style="font-weight:700;">Nueva solicitud</strong> recibida desde el formulario <em>Contact Us</em> del sitio.
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${muted};font-family:system-ui,sans-serif;">
                Datos del remitente
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid ${line};border-radius:14px;padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${muted};font-family:system-ui,sans-serif;">Nombre</p>
                    <p style="margin:0;font-size:17px;font-weight:600;color:${ink};line-height:1.35;font-family:system-ui,sans-serif;">${name}</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:22px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid ${line};border-radius:14px;padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${muted};font-family:system-ui,sans-serif;">Correo</p>
                    <p style="margin:0;font-size:16px;font-weight:600;line-height:1.4;font-family:system-ui,sans-serif;">
                      <a href="mailto:${email}" style="color:${brand};text-decoration:none;border-bottom:1px solid rgba(228,97,31,0.35);">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${muted};font-family:system-ui,sans-serif;">
                Mensaje
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="background:linear-gradient(90deg,${brand} 0%,${brand} 4px,#fafbfc 4px,#fafbfc 100%);border:1px solid ${line};border-radius:4px 16px 16px 4px;padding:20px 22px 22px 24px;">
                    <p style="margin:0;font-size:15px;line-height:1.65;color:#334155;white-space:pre-wrap;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f1f5f9;border-top:1px solid ${line};padding:26px 24px;text-align:center;font-family:system-ui,sans-serif;">
              <a href="mailto:${email}" style="display:inline-block;background:${brand};color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 28px;border-radius:12px;box-shadow:0 4px 14px rgba(228,97,31,0.35);">
                Responder al usuario
              </a>
              <p style="margin:18px 0 0;font-size:12px;line-height:1.55;color:${muted};max-width:400px;margin-left:auto;margin-right:auto;">
                Al responder, se usará la dirección del cliente como <strong style="color:#475569;">Responder a</strong> (Reply-To).
              </p>
              <p style="margin:20px 0 0;font-size:11px;color:#94a3b8;">
                TOTAL Civil Construction · Notificación automática
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
