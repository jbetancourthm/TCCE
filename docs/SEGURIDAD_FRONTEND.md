# Seguridad del frontend (TCCE Landing)

Este documento describe las medidas de seguridad aplicadas al **cliente** (Vite + React), cómo se relacionan con el **API de contacto** y qué responsabilidades siguen siendo del **servidor** y del **hosting**.

---

## 1. Principio general

Una SPA (Single Page Application) **no puede ocultar** la lógica que ejecuta en el navegador: cualquier usuario puede inspeccionar el bundle. Por tanto:

- La **autoridad** para validar datos, límites de uso y secreto de credenciales está en el **backend**.
- El front debe **reducir la superficie de ataque** (CSP, sin XSS obvio, sin filtrar datos sensibles en logs, fetch sin cookies innecesarias) y **no almacenar secretos** en variables `VITE_*`.

---

## 2. Metadatos del documento (Helmet / `react-helmet-async`)

- **`HelmetProvider`** envuelve la aplicación en `App.tsx`.
- **`SecurityHead`** define título, descripción, `lang`, `referrer`, viewport, `theme-color` y `color-scheme`.
- **`index.html`** repite referrer y descripción para el **primer pintado** antes de que cargue JavaScript.

Las cabeceras HTTP críticas (`X-Frame-Options`, CSP estricta, etc.) **no se pueden fiar solo de meta tags**; deben enviarse desde el servidor estático o el CDN (ver sección 7).

---

## 3. Cabeceras HTTP y Content-Security-Policy (CSP)

### Archivos en el repositorio

| Archivo | Uso |
|---------|-----|
| `public/_headers` | Netlify y hosts que lean este formato: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP y **CSP**. |
| `vercel.json` | Mismas ideas para proyectos desplegados en **Vercel**. |

### Directivas CSP (resumen)

La política actual (simplificada) permite:

- Scripts y estilos principalmente de **`'self'`**; estilos incluyen **`'unsafe-inline'`** por cómo Tailwind/Vite inyectan CSS.
- Imágenes: **`'self'`, `data:`, `blob:`** (favicon generado como `data:` en `main.tsx`).
- Conexiones (`fetch`, XHR): **`'self'`, localhost en dev y `https:`** para APIs en producción.
- Medios: vídeo local bajo **`'self'`** / `blob:`.
- **`object-src 'none'`**, **`frame-ancestors 'none'`**, **`form-action 'self'`** (afecta envíos de `<form action="...">`, no al `fetch` del modal de contacto).

### Cuándo ajustar la CSP

Si añades:

- **Analytics** (Google Tag Manager, Plausible, etc.): ampliar `script-src` y/o `connect-src` con los dominios concretos.
- **Fuentes** desde CDN: `font-src` y posiblemente `style-src`.
- **API** solo en un dominio fijo: restringir `connect-src` a ese origen en lugar de `https:` genérico.

### Desarrollo local (`npm run dev`)

Vite **no** aplica por defecto los archivos `_headers` / `vercel.json`. La CSP se prueba en **preview** (`npm run preview` detrás de un servidor que respete cabeceras) o en el entorno de **staging/producción**.

---

## 4. Formulario “Contact Us”

### Comportamiento seguro en cliente

- **`credentials: 'omit'`** en `fetch` para no enviar cookies de sesión al API.
- **`mode: 'cors'`** explícito.
- **Timeout** (~15 s) con `AbortController` para evitar peticiones colgadas.
- **Validación** de email y longitudes máximas (alineadas con el backend).
- **Honeypot** (`tcce_hp` → campo `website` en JSON): oculto, `tabIndex={-1}`, `autoComplete="off"`, `data-lpignore="true"`. Efectos al abrir el modal limpian el honeypot para evitar falsos positivos por autocompletado agresivo.
- **Errores**: en **producción** no se hace `console.error` con el objeto de error completo; solo en **`import.meta.env.DEV`**.

### Qué no hace el front (y no debe pretender hacerlo)

- No sustituye la **validación en servidor** (Zod en Express).
- No impide **abuso masivo** sin **rate limiting** en API (ya configurado en backend).
- No oculta el **payload** a un atacante que controla el navegador (puede repetir la petición con `curl`).

### Backend (referencia cruzada)

En `backend/server.js` (resumen):

- **Helmet** en Express.
- **CORS** con lista explícita de orígenes (`CORS_ORIGIN`).
- **Rate limit** en rutas `/api/`.
- **Límite de JSON** (20 kb).
- **Honeypot** `website` con longitud máxima 0.
- **Escape HTML** al generar el cuerpo del correo.
- Respuestas **400** en producción **sin** el array detallado `details` de Zod (solo mensaje de error genérico al cliente).

---

## 5. Variables de entorno (`VITE_*`)

- Cualquier variable con prefijo **`VITE_`** se **incrusta en el bundle** visible en el navegador.
- **Nunca** almacenar API keys de pago, secretos de JWT, contraseñas de correo, etc. en `VITE_*`.
- Uso actual: **`VITE_CONTACT_API_URL`**: URL **pública** del API de contacto (ej. `https://api.ejemplo.com`).
- Plantilla: **`.env.example`** en la raíz del front.

---

## 6. Superficie XSS y datos en DOM

- No se usa **`dangerouslySetInnerHTML`**, **`eval`**, ni **`document.write`** en el código del front revisado.
- Contenido de formulario solo se envía por JSON; el **renderizado en email** se escapa en el servidor.

---

## 7. Enlaces y UI

- Iconos sociales en footer sin URL real: **`button type="button"`** en lugar de `href="#"` para evitar navegación confusa o patrones de anclaje abusivos.

---

## 8. Checklist antes de producción

- [ ] `VITE_CONTACT_API_URL` apunta al API **HTTPS** correcto.
- [ ] `CORS_ORIGIN` en backend incluye el **origen exacto** del front (esquema + host + puerto si aplica).
- [ ] Cabeceras de **`_headers`** o **`vercel.json`** activas en el hosting elegido.
- [ ] Probar envío real del formulario y rechazo con honeypot relleno (desde cliente y con herramientas).
- [ ] Revisar CSP en consola del navegador si se añaden scripts de terceros.
- [ ] Node en versión compatible con Vite (ver mensaje de `npm run build` si aparece aviso de motor).

---

## 9. Limitaciones conocidas

- **CORP / COOP** estrictos pueden romper integraciones futuras (iframes, widgets de terceros); habría que relajar de forma deliberada y documentada.
- La **CSP** con `connect-src https:` es amplia; puede acotarse al dominio del API cuando sea estable.
