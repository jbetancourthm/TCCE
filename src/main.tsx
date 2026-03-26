import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App'
import './style.css'
import HeaderLogo from './utils/icons/header/Logo'

function setHeaderLogoAsFavicon() {
  const svg = renderToStaticMarkup(<HeaderLogo />)
  const faviconHref = `data:image/svg+xml,${encodeURIComponent(svg)}`

  const link =
    document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
    document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]')

  if (link) {
    link.href = faviconHref
    return
  }

  const newLink = document.createElement('link')
  newLink.rel = 'icon'
  newLink.href = faviconHref
  document.head.appendChild(newLink)
}

const el = document.getElementById('app')
if (!el) throw new Error('Elemento #app no encontrado')

setHeaderLogoAsFavicon()
createRoot(el).render(<App />)

