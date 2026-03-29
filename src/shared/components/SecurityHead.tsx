import { Helmet } from 'react-helmet-async'

const DEFAULT_TITLE = 'Total Civil Construction | TCCE'
const DEFAULT_DESCRIPTION =
  'Heavy civil construction, preconstruction, and construction management — engineering-led insight, field execution, and digital coordination.'

/**
 * Metadatos del documento (equivalente a Helmet): título, descripción, referrer y endurecimiento básico vía meta.
 * Las cabeceras HTTP críticas (CSP, X-Frame-Options, etc.) deben configurarse en el hosting; ver `public/_headers` y `vercel.json`.
 */
export default function SecurityHead() {
  return (
    <Helmet defaultTitle={DEFAULT_TITLE}>
      <html lang="en" />
      <title>{DEFAULT_TITLE}</title>
      <meta name="description" content={DEFAULT_DESCRIPTION} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="color-scheme" content="light" />
    </Helmet>
  )
}
