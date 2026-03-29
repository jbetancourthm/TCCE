# Manual completo del frontend — TCCE Landing Page

Documentación detallada de la aplicación React/Vite que compone la landing corporativa. Está pensada para incorporación de desarrolladores, auditorías técnicas y mantenimiento a largo plazo.

---

## Tabla de contenidos

1. [Visión general del producto](#1-visión-general-del-producto)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Requisitos y scripts](#3-requisitos-y-scripts)
4. [Variables de entorno](#4-variables-de-entorno)
5. [Estructura de carpetas](#5-estructura-de-carpetas)
6. [Punto de entrada y arranque](#6-punto-de-entrada-y-arranque)
7. [Aplicación de página única (Landing)](#7-aplicación-de-página-única-landing)
8. [Patrón de módulos por sección](#8-patrón-de-módulos-por-sección)
9. [Módulo: Home](#9-módulo-home)
10. [Módulo: Expertise](#10-módulo-expertise)
11. [Módulo: Preconstruction](#11-módulo-preconstruction)
12. [Módulo: Construction Management](#12-módulo-construction-management)
13. [Módulo: Safety](#13-módulo-safety)
14. [Módulos: About, Projects, Careers](#14-módulos-about-projects-careers)
15. [Componentes y hooks compartidos](#15-componentes-y-hooks-compartidos)
16. [Contacto: modal, contexto y API](#16-contacto-modal-contexto-y-api)
17. [Metadatos y cabecera del documento](#17-metadatos-y-cabecera-del-documento)
18. [Eventos personalizados (`window`)](#18-eventos-personalizados-window)
19. [Configuración de desarrollo](#19-configuración-de-desarrollo)
20. [Estilos, Tailwind y activos estáticos](#20-estilos-tailwind-y-activos-estáticos)
21. [Iconos y utilidades gráficas](#21-iconos-y-utilidades-gráficas)
22. [Build, preview y artefactos](#22-build-preview-y-artefactos)
23. [Seguridad (enlace)](#23-seguridad-enlace)
24. [Convenciones y extensiones recomendadas](#24-convenciones-y-extensiones-recomendadas)
25. [Glosario](#25-glosario)

---

## 1. Visión general del producto

La aplicación es una **landing de una sola página** (con scroll entre bloques) que presenta:

- **Home** con vídeo de fondo y llamadas a la acción.
- Bloque **Our Expertise**, donde el usuario elige entre dos grandes líneas (**Preconstruction** y **Construction Management**) mediante tarjetas; el contenido expandido incrusta las “páginas” de esos módulos.
- Conmutación a **Safety** dentro del mismo ancla `#expertise`, sustituyendo el contenido por el módulo de seguridad.
- **Footer** con navegación, contacto y enlaces a secciones.

No hay enrutador tipo React Router en el front: la navegación es **scroll a IDs** y **estado local** (`LandingPage`, tarjetas, pestañas).

**Nota de alcance:** existen módulos **About**, **Projects** y **Careers** con `pages/` y `components/`, pero **no están montados** hoy en `LandingPage.tsx`. El header intenta hacer scroll a IDs como `about`, `projects` o `careers`; hasta que existan elementos con esos `id` en el DOM, ese scroll no tendrá efecto. Conviene montarlos en `LandingPage` o alinear los IDs con la estructura real.

---

## 2. Stack tecnológico

| Capa | Tecnología |
|------|------------|
| UI | React 19 |
| Renderizado | `react-dom` (`createRoot`) |
| Build / dev server | Vite 7 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 (PostCSS) |
| Toasts (contacto) | `sonner` |
| Head del documento | `react-helmet-async` |

El **backend** del formulario de contacto es un proyecto **Node + Express** aparte, en la carpeta `backend/` (no forma parte del bundle del front).

---

## 3. Requisitos y scripts

### Requisitos

- **Node.js**: la versión debe cumplir el rango que exige Vite (el build puede advertir si la versión es antigua).
- **npm** (o compatible) para instalar dependencias.

### Scripts (raíz del repo, `package.json`)

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo Vite (HMR). |
| `npm run build` | `tsc --noEmit` + `vite build` → salida en `dist/`. |
| `npm run preview` | Sirve la carpeta `dist/` para probar el build. |

---

## 4. Variables de entorno

Definidas en **`.env`**, **`.env.local`**, etc. (no commitear secretos).

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `VITE_CONTACT_API_URL` | No (hay fallback en dev) | URL base del API de contacto **sin** barra final. En desarrollo, si falta, se usa `http://localhost:3001` y se muestra un `console.warn`. |

Toda variable **`VITE_*`** es **pública** en el cliente. Ver [SEGURIDAD_FRONTEND.md](./SEGURIDAD_FRONTEND.md).

Plantilla recomendada: **`.env.example`** en la raíz del front.

---

## 5. Estructura de carpetas

Árbol conceptual del código fuente (`src/`):

```
src/
├── App.tsx                 # Raíz React: HelmetProvider + SecurityHead + LandingPage
├── main.tsx                # Bootstrap: favicon dinámico + createRoot
├── style.css               # Entrada global de estilos (Tailwind)
├── vite-env.d.ts           # Tipos de import.meta.env
├── app/
│   └── LandingPage.tsx     # Orquestación: home, expertise/safety, footer, provider de contacto
├── config/
│   └── devExpandSections.ts  # Flag EXPAND_ALL_SECTIONS
├── sections/               # Un subdirectorio por “módulo” de negocio
│   ├── home/
│   ├── expertise/
│   ├── preconstruction/
│   ├── construction-management/
│   ├── safety/
│   ├── about/
│   ├── projects/
│   └── careers/
├── shared/
│   ├── components/         # Header, Footer, Container, ContactUs*, SecurityHead
│   ├── hooks/              # useScrollToSection, useMinWidthMd
│   └── services/           # sendContactMessage
└── utils/
    ├── icons/              # SVG como componentes React
    └── graphics/           # SVG complejos / watermarks
```

**`public/`** (raíz del proyecto): archivos servidos tal cual (`favicon.svg`, `_headers`, etc.).

---

## 6. Punto de entrada y arranque

### `index.html`

- Contenedor raíz: `<div id="app"></div>`.
- Carga el módulo `src/main.tsx`.
- Incluye meta **charset**, **viewport**, **referrer**, **description** y **title** (alineados con `SecurityHead`).

### `main.tsx`

1. **`setHeaderLogoAsFavicon()`**: renderiza el componente SVG `Logo` con `renderToStaticMarkup`, construye un `data:image/svg+xml` y asigna `link[rel="icon"]` para unificar favicon con la marca.
2. **`createRoot(document.getElementById('app')).render(<App />)`**.

Si falta `#app`, se lanza un error explícito.

---

## 7. Aplicación de página única (Landing)

### `App.tsx`

- **`HelmetProvider`**: contexto para `react-helmet-async`.
- **`SecurityHead`**: metadatos del documento (ver sección 17).
- **`LandingPage`**: contenido principal.

### `LandingPage.tsx`

- Envuelve todo en **`ContactUsModalProvider`** (modal global + toasts).
- **`<main className="scroll-smooth">`**: scroll suave al usar `scrollIntoView`.
- **`#home`**: `HomeSection` (export default desde `sections/home`).
- **`#expertise`**: según estado:
  - `activeModule === 'safety'` → `SafetySection`
  - en caso contrario → `ExpertiseSection`
- **`Footer`**.

Estado **`activeModule`**: `'expertise' | 'safety'`, por defecto `'expertise'`. Se actualiza escuchando el evento **`landing:set-module`** (ver sección 18).

---

## 8. Patrón de módulos por sección

Cada módulo bajo `src/sections/<nombre>/` sigue una convención común:

| Pieza | Rol |
|-------|-----|
| **`pages/*Page.tsx`** | Componente de “página” o contenedor de alto nivel exportado por el módulo. |
| **`components/*.tsx`** | UI reutilizable dentro del módulo. |
| **`hooks/*.ts`** | Lógica de estado y efectos; a menudo un **barrel** `use<Nombre>.ts` reexporta hooks con tabla JSDoc. |
| **`index.ts`** | Export público del módulo (`default` o named), consumido por `LandingPage` o por otros módulos. |

No todos los módulos tienen los cuatro niveles; los placeholders (About, Projects, Careers) son mínimos.

---

## 9. Módulo: Home

**Ruta:** `src/sections/home/`

| Archivo | Descripción |
|---------|-------------|
| `index.ts` | Export default: `HomePage`. |
| `pages/HomePage.tsx` | `Header`, `Hero`, indicador de scroll fijo. |
| `components/Hero.tsx` | Vídeo a pantalla completa, titulares, botones móvil/desktop (sin navegación cableada aún). |
| `hooks/useHomeScrollIndicator.ts` | Tras scroll, oculta el indicador y lo vuelve a mostrar tras 5 s de inactividad. |
| `hooks/useHome.ts` | Barrel: reexporta `useHomeScrollIndicator`. |

---

## 10. Módulo: Expertise

**Ruta:** `src/sections/expertise/`

| Archivo | Descripción |
|---------|-------------|
| `index.ts` | Export default: `ExpertisePage`. |
| `pages/ExpertisePage.tsx` | Delega en `ExpertiseSectionContent`. |
| `components/ExpertiseSectionContent.tsx` | Imagen “Our Expertise” + `ExpertiseCardsSection`. |
| `components/ExpertiseCardsSection.tsx` | Grid de dos tarjetas; al expandir muestra `PreconstructionPage` o `ConstructionManagementPage`; respeta `EXPAND_ALL_SECTIONS`. |
| `hooks/useExpertiseCards.ts` | Estado `activeCard`, derivados para imágenes/alturas, listener `expertise:open-card`. |
| `hooks/useExpertise.ts` | Barrel documentado. |

**Datos en componente:** textos de Preconstruction abierto, rutas de imágenes de tarjetas y mapas `CARD_IMAGES_OPEN` / `cardImageWhenExpanded` viven en `ExpertiseCardsSection.tsx` (contenido presentacional).

---

## 11. Módulo: Preconstruction

**Ruta:** `src/sections/preconstruction/`

| Export (index) | `PreconstructionPage` (named). |
|----------------|--------------------------------|
| `pages/PreconstructionPage.tsx` | Pestañas o todo expandido según `EXPAND_ALL_SECTIONS`; `ProjectsCostEstimating` / `PreliminaryConstructionPlan`. |
| `components/PreconstructionTitleBlock.tsx` | Título y switch de dos pestañas. |
| `components/ProjectsCostEstimating.tsx` | Carruseles (earthwork, underground, aerial). |
| `components/PreliminaryConstructionPlan.tsx` | Plan + galería miniaturas. |
| `components/PreliminaryGalleryModal.tsx` | Modal de galería (portal). |
| `hooks/usePreconstructionTabs.ts` | Pestaña `0 \| 1`. |
| `hooks/useProjectsCostEstimatingCarousels.ts` | Tres carruseles con aspect ratio del primer slide. |
| `hooks/usePreliminaryPlanGallery.ts` | Apertura/cierre e índice del modal desde el plan. |
| `hooks/usePreliminaryGalleryModal.ts` | Scroll, body lock, Escape, navegación del modal. |
| `hooks/usePreconstruction.ts` | Barrel documentado. |

**Consumo:** `ExpertiseCardsSection` importa `{ PreconstructionPage }` desde `sections/preconstruction`.

---

## 12. Módulo: Construction Management

**Ruta:** `src/sections/construction-management/`

| Export (index) | `ConstructionManagementPage` (named). |
|----------------|----------------------------------------|
| `pages/ConstructionManagementPage.tsx` | Intro + switch de 3 pestañas o todo expandido. |
| `components/ConstructionManagementIntro.tsx` | Metodología + imagen. |
| `components/ConstructionManagementSwitch.tsx` | Píldora de tres opciones; tipo `ConstructionTab` desde hook. |
| `components/FieldOperations.tsx` | Carrusel de tarjetas de campo + `RelatedProjectsSection`. |
| `components/VirtualDesign.tsx` | Tres tarjetas expandibles (touch/hover). |
| `components/PerformanceMonitoring.tsx` | Igual patrón que Virtual Design. |
| `components/RelatedProjectsSection.tsx` | Listado paginado (datos mock). |
| `hooks/useConstructionManagementTabs.ts` | `activeTab` `0 \| 1 \| 2`. |
| `hooks/useTouchExpandableCards.ts` | Compartido por Virtual Design y Performance Monitoring. |
| `hooks/useFieldOperationsCarousel.ts` | Datos de tarjetas + paginación + expansión móvil. |
| `hooks/useRelatedProjectsPagination.ts` | Paginación de proyectos relacionados. |
| `hooks/useConstructionManagement.ts` | Barrel documentado. |

---

## 13. Módulo: Safety

**Ruta:** `src/sections/safety/`

| Export (index) | Default: `SafetyPage`. |
|----------------|------------------------|
| `pages/SafetyPage.tsx` | Contenedor mínimo → `SafetySectionContent`. |
| `components/SafetySectionContent.tsx` | Título, switch de tres pestañas, contenido condicional. |
| `components/SafetyPlanning.tsx` | Contenido pestaña 0. |
| `components/SafetyConstruction.tsx` | Carrusel + texto. |
| `components/TotallySafe.tsx` | Contenido pestaña 2. |
| `hooks/useSafetySectionTabs.ts` | Estado y `pillTransform` para el switch. |
| `hooks/useSafetyConstructionCarousel.ts` | Carrusel de imágenes. |
| `hooks/useSafetyPlanningMedia.ts` | Rutas y entradas de imagen para Safety Planning (hero + marquesina). |
| `hooks/useSafety.ts` | Barrel documentado: exporta hooks y datos centralizados del módulo. |

**Convención:** el estado, efectos y datos reutilizables de cada subsección Safety deben añadirse bajo `src/sections/safety/hooks/` y reexportarse desde `useSafety.ts` cuando convenga al resto del módulo.

---

## 14. Módulos: About, Projects, Careers

**Rutas:** `src/sections/about|projects|careers/`

Cada uno expone un **default** desde su `index.ts` hacia `*Page.tsx` → `*SectionContent.tsx` con **placeholders** (títulos y bloques grises).

**Hooks:** `useAbout.ts`, `useProjects.ts`, `useCareers.ts` son **stubs** preparados para lógica futura.

**Integración pendiente:** montar estas secciones en `LandingPage` con `<section id="about">` (etc.) para alinear con el header y `useScrollToSection`.

---

## 15. Componentes y hooks compartidos

### `shared/components/Container.tsx`

Wrapper de ancho máximo y padding horizontal responsive (`px-4` … `xl:px-10`), usado en múltiples secciones.

### `shared/components/Header.tsx`

- Navegación mega-menú / móvil.
- Estado: ítem activo, visibilidad al scroll, menú móvil abierto.
- Integración con **`useScrollToSection`**, **`useContactUsModal`**, eventos **`landing:set-module`** y **`expertise:open-card`**.
- Datos de menús en constantes (`navItems`, `navPanels`, etc.).

### `shared/components/Footer.tsx`

- Navegación interna vía `useScrollToSection` y `useContactUsModal`.
- **`openConstructionProjects`**: combina módulo expertise, tarjeta construction y scroll a `#construction-management-projects`.
- Botones sociales placeholder (sin URL externa).

### `shared/components/ContactUsPillButton.tsx`

Botón reutilizable que abre el modal de contacto (`useContactUsModal`).

### `shared/components/SecurityHead.tsx`

Metadatos con `Helmet` (ver sección 17 y doc de seguridad).

### `shared/hooks/useScrollToSection.ts`

`document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })`.

### `shared/hooks/useMinWidthMd.ts`

Media query `min-width` breakpoint `md` de Tailwind (768px), para comportamiento responsive (carruseles, tarjetas táctiles, etc.).

---

## 16. Contacto: modal, contexto y API

### Contexto

- **`ContactUsModalProvider`**: provee `open`, `close`, `isOpen`.
- **`useContactUsModal()`**: obligatorio bajo el provider (lanza si falta).

### Modal (`ContactUsModalDialog`)

- Portal a `document.body`, `role="dialog"`, `aria-modal`, título con `useId`.
- Bloqueo de scroll del `body` al abrir; **Escape** cierra salvo envío en curso.
- Formulario: nombre, email, mensaje + honeypot; límites `CONTACT_FORM_*_MAX`.
- **`sendContactMessage`** en `shared/services/sendContactMessage.ts`: `POST` JSON a `{API_URL}/api/contact`.

### Constantes exportadas (tests / consistencia)

`CONTACT_FORM_NAME_MAX`, `CONTACT_FORM_EMAIL_MAX`, `CONTACT_FORM_MESSAGE_MAX` en el provider.

---

## 17. Metadatos y cabecera del documento

- **`SecurityHead`**: título por defecto, descripción, `html lang="en"`, referrer, viewport, theme-color, color-scheme.
- **`index.html`**: coherencia en primer paint.

Las cabeceras HTTP de seguridad (CSP, X-Frame-Options, etc.) se documentan en **[SEGURIDAD_FRONTEND.md](./SEGURIDAD_FRONTEND.md)**.

---

## 18. Eventos personalizados (`window`)

| Evento | Payload (`detail`) | Quién escucha | Quién dispara |
|--------|-------------------|---------------|---------------|
| `landing:set-module` | `{ module: 'expertise' \| 'safety' }` | `LandingPage` | Header, Footer |
| `expertise:open-card` | `{ card: 0 \| 1 }` | `ExpertiseCardsSection` (hook) | Header, Footer |

Patrón: **`window.dispatchEvent(new CustomEvent(...))`** y **`addEventListener`** con cleanup en `useEffect`.

---

## 19. Configuración de desarrollo

### `src/config/devExpandSections.ts`

```ts
export const EXPAND_ALL_SECTIONS = false
```

Si se pone **`true`**:

- **Preconstruction** y **Construction Management** muestran **todas** las subsecciones a la vez (sin depender solo de pestañas/tarjetas).
- **Expertise** muestra el grid en modo “expandido” según la lógica de `ExpertiseCardsSection`.

Útil para diseño y QA de contenido largo sin clicks repetidos.

---

## 20. Estilos, Tailwind y activos estáticos

- **Entrada CSS:** `src/style.css` con directivas Tailwind v4 (`@import "tailwindcss"` según configuración del proyecto).
- **PostCSS / Tailwind:** configuración en raíz (`postcss.config`, dependencias en `package.json`).
- **Imágenes y vídeo:** rutas bajo **`/public`** referenciadas como **`/images/...`**, **`/videos/...`** en JSX.
- **Favicon:** además de `/favicon.svg`, `main.tsx` puede sobrescribir con data URL del logo.

---

## 21. Iconos y utilidades gráficas

- **`src/utils/icons/`**: componentes React (SVG inline) por dominio (`header`, `footer`, `carousel`, `contact`, etc.).
- **`src/utils/graphics/`**: SVG más grandes (p. ej. watermark del plan preliminar).
- **`utils/icons/index.ts`**: barrel opcional de exportaciones.

---

## 22. Build, preview y artefactos

- **`npm run build`** genera **`dist/`** con HTML, JS y CSS hasheados.
- **`vite.config.ts`**: plugin `@vitejs/plugin-react`.
- **Tamaño de bundle:** Vite puede advertir si un chunk supera ~500 kB; valorar code-splitting futuro si crece mucho.

---

## 23. Seguridad (enlace)

Documento dedicado: **[SEGURIDAD_FRONTEND.md](./SEGURIDAD_FRONTEND.md)** (CSP, formulario, env, backend cruzado, checklist).

---

## 24. Convenciones y extensiones recomendadas

1. **Nuevos hooks de módulo:** archivo `useAlgoDescriptivo.ts` + entrada en el barrel `use<NombreModulo>.ts` con tabla JSDoc.
2. **Nuevas secciones en la landing:** añadir `<section id="...">` en `LandingPage` y comprobar enlaces del header/footer.
3. **Nuevo consumo de API:** servicio en `shared/services/`, sin secretos en `VITE_*`, validación y mensajes de error genéricos en prod.
4. **Imágenes:** preferir `public/` o imports estáticos; documentar si se usa CDN y actualizar CSP.
5. **Accesibilidad:** mantener roles ARIA en modales, foco y teclado al estilo de `ContactUsModalProvider` y galerías existentes.

---

## 25. Glosario

| Término | Significado en este proyecto |
|---------|------------------------------|
| **SPA** | Single Page Application; una sola carga HTML y navegación por scroll/estado. |
| **Barrel** | Archivo `index` o `useX.ts` que solo reexporta módulos para imports cortos y documentación centralizada. |
| **Honeypot** | Campo oculto que los bots suelen rellenar; el servidor rechaza si no está vacío. |
| **Portal** | Renderizado de nodos React fuera del árbol padre (`createPortal` → `document.body`). |
| **CSP** | Content-Security-Policy: directiva HTTP que limita orígenes de scripts, estilos, imágenes, etc. |

---

*Última actualización alineada con la estructura del repositorio TCCE (landing + backend de contacto). Ajustar este manual cuando se integren About, Projects y Careers en la landing o se añadan rutas nuevas.*
