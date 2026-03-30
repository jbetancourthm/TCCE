# TCCE landing — complete frontend manual

Detailed documentation of the React/Vite app that powers the corporate landing. It is intended for developer onboarding, technical reviews, and long-term maintenance.

---

## Table of contents

1. [Product overview](#1-product-overview)
2. [Tech stack](#2-tech-stack)
3. [Requirements and scripts](#3-requirements-and-scripts)
4. [Environment variables](#4-environment-variables)
5. [Folder structure](#5-folder-structure)
6. [Entry point and bootstrap](#6-entry-point-and-bootstrap)
7. [Single-page landing app](#7-single-page-landing-app)
8. [Section module pattern](#8-section-module-pattern)
9. [Module: Home](#9-module-home)
10. [Module: Expertise](#10-module-expertise)
11. [Module: Preconstruction](#11-module-preconstruction)
12. [Module: Construction Management](#12-module-construction-management)
13. [Module: Safety](#13-module-safety)
14. [Module: About (and Projects / Careers status)](#14-module-about-and-projects--careers-status)
15. [Shared components and hooks](#15-shared-components-and-hooks)
16. [Contact: modal, context, and API](#16-contact-modal-context-and-api)
17. [Document metadata and head](#17-document-metadata-and-head)
18. [Custom `window` events](#18-custom-window-events)
19. [Development configuration](#19-development-configuration)
20. [Styles, Tailwind, and static assets](#20-styles-tailwind-and-static-assets)
21. [Icons and graphics utilities](#21-icons-and-graphics-utilities)
22. [Build, preview, and artifacts](#22-build-preview-and-artifacts)
23. [Security (link)](#23-security-link)
24. [Conventions and recommended extensions](#24-conventions-and-recommended-extensions)
25. [Glossary](#25-glossary)
26. [Responsive breakpoints](#26-responsive-breakpoints)

---

## 1. Product overview

The app is a **single-page landing** (scroll between blocks) that includes:

- **Home** with background video and calls to action.
- **Our Expertise**, where the user picks between two lines (**Preconstruction** and **Construction Management**) via cards; expanded content embeds those modules’ “pages”.
- Switching within the same **`#expertise`** anchor between **Our Expertise**, **Safety**, and **About** according to `activeModule` on `LandingPage` (`landing:set-module` event).
- **Footer** with navigation, contact, and section links.

There is no React Router–style router: navigation is **scroll to element IDs** and **local state** (`LandingPage`, cards, tabs).

**Current scope:** the **About** module is **mounted** and replaces `#expertise` content when the user chooses About (header, footer, or hero). **Projects** and **Careers** remain intent links (e.g. scroll to `#careers`); if that `id` is missing in the DOM, scroll has no effect until those sections are integrated.

---

## 2. Tech stack

| Layer | Technology |
|-------|-------------|
| UI | React 19 |
| Rendering | `react-dom` (`createRoot`) |
| Build / dev server | Vite 7 |
| Language | TypeScript |
| Styles | Tailwind CSS 4 (PostCSS) |
| Toasts (contact) | `sonner` |
| Document head | `react-helmet-async` |

The contact form **backend** is a separate **Node + Express** project in `backend/` (not part of the frontend bundle). See **[BACKEND.md](./BACKEND.md)** for API and environment details.

---

## 3. Requirements and scripts

### Requirements

- **Node.js**: must satisfy Vite’s supported range (build may warn if the version is old).
- **npm** (or compatible) to install dependencies.

### Scripts (repo root, `package.json`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (HMR). |
| `npm run build` | `tsc --noEmit` + `vite build` → output in `dist/`. |
| `npm run preview` | Serves `dist/` to verify the production build. |

---

## 4. Environment variables

Defined in **`.env`**, **`.env.local`**, etc. (do not commit secrets).

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CONTACT_API_URL` | No (dev fallback exists) | Contact API base URL **without** trailing slash. In development, if missing, `http://localhost:3001` is used and a `console.warn` is shown. |

Every **`VITE_*`** variable is **public** in the browser. See [FRONTEND_SECURITY.md](./FRONTEND_SECURITY.md).

Recommended template: **`.env.example`** at the frontend root.

---

## 5. Folder structure

Conceptual tree of source code (`src/`):

```
src/
├── App.tsx                 # React root: HelmetProvider + SecurityHead + LandingPage
├── main.tsx                # Bootstrap: dynamic favicon + createRoot
├── style.css               # Global styles entry (Tailwind)
├── vite-env.d.ts           # import.meta.env types
├── app/
│   └── LandingPage.tsx     # Orchestrates home, expertise/safety/about, footer, contact provider
├── config/
│   └── devExpandSections.ts  # EXPAND_ALL_SECTIONS flag
├── sections/               # One subdirectory per business “module”
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
│   ├── hooks/              # useScrollToSection, useMinWidthMd, useMinWidthLg, useMinWidth951
│   └── services/           # sendContactMessage
└── utils/
    ├── icons/              # SVG as React components
    └── graphics/           # Complex SVG / watermarks
```

**`public/`** (project root): files served as static assets (`favicon.svg`, `_headers`, etc.).

---

## 6. Entry point and bootstrap

### `index.html`

- Root container: `<div id="app"></div>`.
- Loads `src/main.tsx`.
- Includes **charset**, **viewport**, **referrer**, **description**, and **title** meta (aligned with `SecurityHead`).

### `main.tsx`

1. **`setHeaderLogoAsFavicon()`**: renders the SVG `Logo` with `renderToStaticMarkup`, builds a `data:image/svg+xml`, and sets `link[rel="icon"]` to match branding.
2. **`createRoot(document.getElementById('app')).render(<App />)`**.

If `#app` is missing, an explicit error is thrown.

---

## 7. Single-page landing app

### `App.tsx`

- **`HelmetProvider`**: context for `react-helmet-async`.
- **`SecurityHead`**: document metadata (see section 17).
- **`LandingPage`**: main content.

### `LandingPage.tsx`

- Wraps everything in **`ContactUsModalProvider`** (global modal + toasts).
- **`<main className="scroll-smooth">`**: smooth scroll when using `scrollIntoView`.
- **`#home`**: `HomeSection` (default export from `sections/home`).
- **`#expertise`**: by state:
  - `activeModule === 'safety'` → `SafetySection`
  - `activeModule === 'about'` → `AboutSection` (default export from `about` module)
  - otherwise → `ExpertiseSection`
- **`Footer`**.

**`activeModule`**: `'expertise' | 'safety' | 'about'`, default `'expertise'`. Updated by listening for **`landing:set-module`** (section 18).

---

## 8. Section module pattern

Each module under `src/sections/<name>/` follows a common convention:

| Piece | Role |
|-------|------|
| **`pages/*Page.tsx`** | Top-level “page” or container exported by the module. |
| **`components/*.tsx`** | UI reused inside the module. |
| **`hooks/*.ts`** | State and effects; often a **barrel** `use<Name>.ts` re-exports hooks with a JSDoc table. |
| **`index.ts`** | Public export (`default` or named), consumed by `LandingPage` or other modules. |

Not every module has all four levels; **Projects** and **Careers** may stay minimal until fully integrated into the landing.

---

## 9. Module: Home

**Path:** `src/sections/home/`

| File | Description |
|------|-------------|
| `index.ts` | Default export: `HomePage`. |
| `pages/HomePage.tsx` | `Header`, `Hero`, fixed scroll indicator. |
| `components/Hero.tsx` | Full-screen video, headlines, CTAs (Our Expertise / About — Who we are) via scroll + `landing:set-module` / `about:set-tab`; responsive layout uses **`xl`** on part of the floating block. |
| `hooks/useHomeScrollIndicator.ts` | After scroll, hides indicator and shows it again after 5 s idle. |
| `hooks/useHome.ts` | Barrel: re-exports `useHomeScrollIndicator`. |

---

## 10. Module: Expertise

**Path:** `src/sections/expertise/`

| File | Description |
|------|-------------|
| `index.ts` | Default export: `ExpertisePage`. |
| `pages/ExpertisePage.tsx` | Delegates to `ExpertiseSectionContent`. |
| `components/ExpertiseSectionContent.tsx` | “Our Expertise” image + `ExpertiseCardsSection`. |
| `components/ExpertiseCardsSection.tsx` | Two-card grid; expands to `PreconstructionPage` or `ConstructionManagementPage`; honors `EXPAND_ALL_SECTIONS`. **Responsive:** with one card active, 4:1 / 1:4 column split only from **`min-width: 1700px`**; below that, **single column** (stacked) to avoid clipped titles on the narrow card. |
| `hooks/useExpertiseCards.ts` | `activeCard` state, image/height helpers, `expertise:open-card` listener. |
| `hooks/useExpertise.ts` | Documented barrel. |

**Data in component:** open Preconstruction copy, card image paths, and `CARD_IMAGES_OPEN` / `cardImageWhenExpanded` live in `ExpertiseCardsSection.tsx` (presentational).

---

## 11. Module: Preconstruction

**Path:** `src/sections/preconstruction/`

| Export (index) | `PreconstructionPage` (named). |
|----------------|----------------------------------|
| `pages/PreconstructionPage.tsx` | Tabs or fully expanded per `EXPAND_ALL_SECTIONS`; `ProjectsCostEstimating` / `PreliminaryConstructionPlan`. |
| `components/PreconstructionTitleBlock.tsx` | Title and two-tab switch. |
| `components/ProjectsCostEstimating.tsx` | Carousels (earthwork, underground, aerial). **Aerial:** up to **`xl` (1280px)** video and carousel are **stacked**; video text overlay uses “compact” mode only from **`xl`** so copy is not clipped in stacked layouts. |
| `components/PreliminaryConstructionPlan.tsx` | Plan + thumbnail gallery. |
| `components/PreliminaryGalleryModal.tsx` | Gallery modal (portal). |
| `hooks/usePreconstructionTabs.ts` | Tab `0 \| 1`. |
| `hooks/useProjectsCostEstimatingCarousels.ts` | Three carousels with first-slide aspect ratio. |
| `hooks/usePreliminaryPlanGallery.ts` | Open/close and modal index from plan. |
| `hooks/usePreliminaryGalleryModal.ts` | Scroll, body lock, Escape, modal navigation. |
| `hooks/usePreconstruction.ts` | Documented barrel. |

**Consumption:** `ExpertiseCardsSection` imports `{ PreconstructionPage }` from `sections/preconstruction`.

---

## 12. Module: Construction Management

**Path:** `src/sections/construction-management/`

| Export (index) | `ConstructionManagementPage` (named). |
|----------------|----------------------------------------|
| `pages/ConstructionManagementPage.tsx` | Intro + three-tab switch or fully expanded. |
| `components/ConstructionManagementIntro.tsx` | Methodology + image. |
| `components/ConstructionManagementSwitch.tsx` | Three-option pill; `ConstructionTab` type from hook. |
| `components/FieldOperations.tsx` | Field cards carousel + `RelatedProjectsSection`. |
| `components/VirtualDesign.tsx` | Three expandable cards (touch/hover). |
| `components/PerformanceMonitoring.tsx` | Same pattern as Virtual Design. |
| `components/RelatedProjectsSection.tsx` | Paginated list (mock data). |
| `hooks/useConstructionManagementTabs.ts` | `activeTab` `0 \| 1 \| 2`. |
| `hooks/useTouchExpandableCards.ts` | Shared by Virtual Design and Performance Monitoring; **`useMinWidthLg`** → desktop hover vs mobile tap. |
| `hooks/useFieldOperationsCarousel.ts` | Card data + pagination + touch expand; **`useMinWidthLg`** (1024px) for 3-up vs 1-up slides and hover/tap behavior. |
| `hooks/useRelatedProjectsPagination.ts` | Related projects pagination. |
| `hooks/useConstructionManagement.ts` | Documented barrel. |

**Responsive (Construction Management):** three-column grids / card rows, intro two-column layout, **Related Projects**, and most “desktop” content use Tailwind **`lg` (1024px)**. The tab **switch** stays **horizontal** like classic desktop; below `lg`, label text may wrap with tighter padding to avoid overflow. See also section 26.

---

## 13. Module: Safety

**Path:** `src/sections/safety/`

| Export (index) | Default: `SafetyPage`. |
|----------------|------------------------|
| `pages/SafetyPage.tsx` | Thin wrapper → `SafetySectionContent`. |
| `components/SafetySectionContent.tsx` | Title, three-tab switch, conditional content. |
| `components/SafetyPlanning.tsx` | Tab 0 content. |
| `components/SafetyConstruction.tsx` | Carousel + copy. |
| `components/TotallySafe.tsx` | Tab 2 content. |
| `hooks/useSafetySectionTabs.ts` | State and `pillTransform` for the switch. |
| `hooks/useSafetyConstructionCarousel.ts` | Image carousel; **`useMinWidth951`** aligns 3-up vs 1-up pages with CSS layout (~950px / 951px). |
| `hooks/useSafetyPlanningMedia.ts` | Image paths and entries for Safety Planning (hero + marquee). |
| `hooks/useSafety.ts` | Documented barrel: hooks and centralized module data. |

**Convention:** reusable state, effects, and data for each Safety subsection should live under `src/sections/safety/hooks/` and be re-exported from `useSafety.ts` when useful.

**Responsive (Safety):** the two-tone intro under “SAFETY”, the three-tab **switch**, and internal layouts for **Safety Planning**, **Safety Construction**, and **Totally Safe** align around **`min-width: 951px`**: below that, mobile-style **single column** (carousel one image per slide where applicable); from **951px**, two- or three-column layouts as designed. **`useMinWidth951`** keeps the Safety Construction carousel in sync.

---

## 14. Module: About (and Projects / Careers status)

### About — implemented on the landing

**Path:** `src/sections/about/`

About renders **inside `#expertise`** when `LandingPage` has `activeModule === 'about'` (there is no separate `<section id="about">` in the main DOM).

| File | Description |
|------|-------------|
| `index.ts` | Default export → `AboutPage`. |
| `pages/AboutPage.tsx` | Wrapper → `AboutSectionContent`. |
| `components/AboutSectionContent.tsx` | `Container`; mounts in order: Who we are, Core Values, Our Culture, Workforce & people, Our Leadership; uses `useAboutSubnavScroll`. |
| `components/WhoWeAre.tsx` | About hero + image; `id="about-section-0"`. |
| `components/CoreValues.tsx` | Values + two images; `about-section-1`. |
| `components/OurCulture.tsx` | Culture three-column grid on desktop; `about-section-2`. |
| `components/WorkforceAndPeople.tsx` | Copy + capabilities + image; `about-section-3`. |
| `components/OurLeadership.tsx` | Image + copy + principles; `about-section-4`. |
| `components/AboutBlockKicker.tsx` | “About” kicker with decorative line. |
| `components/AboutImageFrame.tsx` | Shared image frame. |
| `hooks/useAboutMedia.ts` | Path constants under `/images/about/`. |
| `hooks/useAboutSubnavScroll.ts` | Listens for **`about:set-tab`** with `tab: 0…4` and smooth-scrolls to `about-section-{tab}`. |
| `hooks/useAbout.ts` | Documented barrel. |

**Responsive (About):** two- or three-column grids (text + image, Culture, etc.) become **single column** below **`min-width: 1061px`** (`min-[1061px]:…` in components) to avoid large whitespace gaps and awkward titles on wide tablets. Who we are uses **`items-start`** instead of vertically centering columns on desktop.

### Projects and Careers

**Paths:** `src/sections/projects/`, `src/sections/careers/`

Still available as modules by folder convention; **full** `LandingPage` integration (dedicated section + stable `id`) may be pending per roadmap. Header/footer may link to `#careers` or other anchors when they exist in the DOM.

---

## 15. Shared components and hooks

### `shared/components/Container.tsx`

Max-width wrapper with responsive horizontal padding (`px-4` … `xl:px-10`), used across sections.

### `shared/components/Header.tsx`

- Mega-menu navigation (desktop) / mobile drawer (hamburger).
- **Desktop breakpoint:** utilities with **`min-[1355px]:`** (full nav, phone, Contact Us, mega panel, hide hamburger). Below **1355px** viewport width, mobile layout is used; crossing that threshold runs `matchMedia('(min-width: 1355px)')` to close the menu and reset mobile accordions.
- State: active item, scroll visibility, mobile menu open, mobile accordions (`mobileExpandedParent`).
- Includes **Careers** item (`chevron: false`) and mega panels only for `about`, `safety`, `projects` (`NavPanelItemId` typing / guards so `careers` never indexes panels).
- Integrates **`useScrollToSection`**, **`useContactUsModal`**, **`landing:set-module`**, **`expertise:open-card`**, **`about:set-tab`**, **`safety:set-tab`**, etc., per menu item.
- Menu data in constants (`navItems`, `navPanels`, Preconstruction / CM link maps, etc.).
- **Right CTAs:** on desktop the `tel:` link and Contact Us button sit in a `flex` row with a wide **`gap`**; the button avoids negative margins in that range so it does not overlap the number.

### `shared/components/Footer.tsx`

- Internal navigation via `useScrollToSection` and `useContactUsModal`.
- **Layout:** mobile-style centered column blocks until **`xl` (~1280px)**; from **`xl`**, wide link row and bottom legal/social strip use **`justify-between`**.
- **`openConstructionProjects`:** sets expertise module, construction card, scroll to `#construction-management-projects`.
- Social buttons are placeholders (no external URLs).

### Home (`Hero.tsx`) — quick note

- Buttons can route to Our Expertise / About (Who we are sub-tab) via `scrollTo` + events; the floating headline/CTA block uses **`xl`** in part of the layout to align with header/footer.

### `shared/components/ContactUsPillButton.tsx`

Reusable button opening the contact modal (`useContactUsModal`).

### `shared/components/SecurityHead.tsx`

Metadata via `Helmet` (section 17 and security doc).

### `shared/hooks/useScrollToSection.ts`

`document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })`.

### `shared/hooks/useMinWidthMd.ts`

**`min-width: 768px`** (Tailwind `md`). Still used where “tablet” behavior should align to 768px (some carousels outside Construction Management).

### `shared/hooks/useMinWidthLg.ts`

**`min-width: 1024px`** (Tailwind `lg`). Used by **Construction Management** (`useFieldOperationsCarousel`, `useTouchExpandableCards`) to separate desktop (hover, three columns) from compact layout (tap, single column).

### `shared/hooks/useMinWidth951.ts`

**`min-width: 951px`**, aligned with arbitrary breakpoints in the **Safety** module (internal layouts and Safety Construction carousel).

---

## 16. Contact: modal, context, and API

### Context

- **`ContactUsModalProvider`**: provides `open`, `close`, `isOpen`.
- **`useContactUsModal()`**: required under the provider (throws if missing).

### Modal (`ContactUsModalDialog`)

- Portal to `document.body`, `role="dialog"`, `aria-modal`, title via `useId`.
- Locks `body` scroll when open; **Escape** closes unless submit in progress.
- Form: name, email, message + honeypot; limits `CONTACT_FORM_*_MAX`.
- **`sendContactMessage`** in `shared/services/sendContactMessage.ts`: JSON `POST` to `{API_URL}/api/contact`. Server contract: **[BACKEND.md](./BACKEND.md)**.

### Exported constants (tests / consistency)

`CONTACT_FORM_NAME_MAX`, `CONTACT_FORM_EMAIL_MAX`, `CONTACT_FORM_MESSAGE_MAX` on the provider.

---

## 17. Document metadata and head

- **`SecurityHead`**: default title, description, `html lang="en"`, referrer, viewport, theme-color, color-scheme.
- **`index.html`**: consistent first paint.

HTTP security headers (CSP, X-Frame-Options, etc.) are documented in **[FRONTEND_SECURITY.md](./FRONTEND_SECURITY.md)**.

---

## 18. Custom `window` events

| Event | Payload (`detail`) | Main listener | Main dispatcher |
|--------|---------------------|---------------|-----------------|
| `landing:set-module` | `{ module: 'expertise' \| 'safety' \| 'about' }` | `LandingPage` | Header, Footer, Hero |
| `expertise:open-card` | `{ card: 0 \| 1 }` | `useExpertiseCards` | Header, Footer |
| `about:set-tab` | `{ tab: 0 \| 1 \| 2 \| 3 \| 4 }` | `useAboutSubnavScroll` | Header (mega About) |
| `safety:set-tab` | `{ tab: 0 \| 1 \| 2 }` | `useSafetySectionTabs` | Header (mega Safety) |
| `preconstruction:set-tab` | `{ tab: 0 \| 1 }` | Preconstruction tab hooks | Header (expertise links) |
| `construction-management:set-tab` | `{ tab: 0 \| 1 \| 2 }` | `useConstructionManagementTabs` | Header (expertise links) |

Pattern: **`window.dispatchEvent(new CustomEvent(...))`** and **`addEventListener`** with cleanup in `useEffect`. Exact payloads may grow in other modules; search `CustomEvent` in `src/` when adding integrations.

---

## 19. Development configuration

### `src/config/devExpandSections.ts`

```ts
export const EXPAND_ALL_SECTIONS = false
```

If set to **`true`**:

- **Preconstruction** and **Construction Management** show **all** subsections at once (not only tabs/cards).
- **Expertise** shows the grid in “expanded” mode per `ExpertiseCardsSection`.

Useful for design and QA of long content without repeated clicks.

---

## 20. Styles, Tailwind, and static assets

- **CSS entry:** `src/style.css` with Tailwind v4 directives (`@import "tailwindcss"` per project setup).
- **PostCSS / Tailwind:** root config (`postcss.config`, dependencies in `package.json`).
- **Images and video:** paths under **`/public`** referenced as **`/images/...`**, **`/videos/...`** in JSX.
- **Favicon:** in addition to `/favicon.svg`, `main.tsx` may override with a logo data URL.

---

## 21. Icons and graphics utilities

- **`src/utils/icons/`**: inline SVG React components by domain (`header`, `footer`, `carousel`, `contact`, etc.).
- **`src/utils/graphics/`**: larger SVGs (e.g. preliminary plan watermark).
- **`utils/icons/index.ts`**: optional export barrel.

---

## 22. Build, preview, and artifacts

- **`npm run build`** outputs **`dist/`** with hashed HTML, JS, and CSS.
- **`vite.config.ts`**: `@vitejs/plugin-react`.
- **Bundle size:** Vite may warn if a chunk exceeds ~500 kB; consider future code-splitting if growth continues.

---

## 23. Security (link)

Dedicated doc: **[FRONTEND_SECURITY.md](./FRONTEND_SECURITY.md)** (CSP, form, env, backend cross-reference, checklist).

---

## 24. Conventions and recommended extensions

1. **New module hooks:** file `useDescriptiveName.ts` + barrel entry in `use<ModuleName>.ts` with JSDoc table.
2. **New landing sections:** add `<section id="...">` in `LandingPage` and verify header/footer links. **About** does not use a separate section `id`: it lives under `#expertise` with `activeModule === 'about'`.
3. **New API usage:** service in `shared/services/`, no secrets in `VITE_*`, validation and generic error messages in prod.
4. **Images:** prefer `public/` or static imports; document CDN usage and update CSP.
5. **Accessibility:** keep ARIA roles on modals, focus and keyboard behavior consistent with `ContactUsModalProvider` and existing galleries.

---

## 25. Glossary

| Term | Meaning in this project |
|------|-------------------------|
| **SPA** | Single Page Application; one HTML load and navigation by scroll/state. |
| **Barrel** | `index` or `useX.ts` that only re-exports for short imports and centralized docs. |
| **Honeypot** | Hidden field bots often fill; server rejects if non-empty. |
| **Portal** | React nodes rendered outside the parent tree (`createPortal` → `document.body`). |
| **CSP** | Content-Security-Policy: HTTP directive limiting script, style, image origins, etc. |

---

## 26. Responsive breakpoints

Quick reference for **pixel thresholds** that do not always match Tailwind’s `sm` / `md` / `lg` / `xl` names. Exact values live in component classes; this table captures product intent.

| Area | Threshold (approx.) | Behavior |
|------|---------------------|----------|
| **Header** | **1355px** | Full mega row vs hamburger + drawer; menu closes when switching to desktop. |
| **Footer** | **1280px (`xl`)** | Wide row layout vs mobile-style stacking. |
| **Hero (home)** | **1280px (`xl`)** in part of layout | Aligns with header/footer for some absolute blocks. |
| **Expertise — cards** | **1700px** | 4:1 / 1:4 split only from this width; below, **single column**. |
| **Preconstruction — Aerial** | **1280px (`xl`)** | Video + carousel row; compact text overlay from `xl`. |
| **Construction Management** | **1024px (`lg`)** | Three columns, “desktop” carousel, Related Projects 3-col, `useMinWidthLg`. |
| **About** | **1061px** | 2/3 column grids only from this width; below, **single column**. |
| **Safety** | **951px** | Intro, tabs, three subsections’ bodies + `useMinWidth951` on Construction carousel. |

If you change a value (e.g. header width), update **this table** and related constants/hooks (`matchMedia`, `useMinWidth*`).

---

*Last updated: About integrated into the landing; responsive behavior documented (header 1355px, About 1061px, Safety 951px, CM `lg`, Expertise cards 1700px); hooks `useMinWidthLg` and `useMinWidth951`; events `about:set-tab` / `safety:set-tab` / nested tabs. Roadmap: Projects and Careers on `LandingPage` if dedicated sections are required.*
