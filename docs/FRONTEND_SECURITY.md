# Frontend security (TCCE landing)

This document describes security measures applied to the **client** (Vite + React), how they relate to the **contact API**, and what remains the responsibility of the **server** and **hosting**.

---

## 1. General principle

A SPA **cannot hide** logic that runs in the browser: anyone can inspect the bundle. Therefore:

- **Authority** for validating data, usage limits, and keeping credentials secret lives on the **backend**.
- The frontend should **reduce attack surface** (CSP, no obvious XSS, no sensitive data in logs, `fetch` without unnecessary cookies) and **never store secrets** in `VITE_*` variables.

---

## 2. Document metadata (Helmet / `react-helmet-async`)

- **`HelmetProvider`** wraps the app in `App.tsx`.
- **`SecurityHead`** sets title, description, `lang`, `referrer`, viewport, `theme-color`, and `color-scheme`.
- **`index.html`** repeats referrer and description for **first paint** before JavaScript loads.

Critical HTTP headers (`X-Frame-Options`, strict CSP, etc.) **cannot rely on meta tags alone**; they must be sent by the static server or CDN (see section 7).

---

## 3. HTTP headers and Content-Security-Policy (CSP)

### Files in the repo

| File | Purpose |
|------|---------|
| `public/_headers` | Netlify and hosts that read this format: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP, and **CSP**. |
| `vercel.json` | Same intent for projects deployed on **Vercel**. |

### CSP directives (summary)

The current policy (simplified) allows:

- Scripts and styles mainly from **`'self'`**; styles include **`'unsafe-inline'`** because of how Tailwind/Vite inject CSS.
- Images: **`'self'`, `data:`, `blob:`** (favicon generated as `data:` in `main.tsx`).
- Connections (`fetch`, XHR): **`'self'`, localhost in dev, and `https:`** for production APIs.
- Media: local video under **`'self'`** / `blob:`.
- **`object-src 'none'`**, **`frame-ancestors 'none'`**, **`form-action 'self'`** (affects `<form action="...">` submissions, not the contact modal’s `fetch`).

### When to adjust CSP

If you add:

- **Analytics** (Google Tag Manager, Plausible, etc.): extend `script-src` and/or `connect-src` with specific domains.
- **Fonts** from a CDN: `font-src` and possibly `style-src`.
- **API** on a fixed domain only: narrow `connect-src` to that origin instead of generic `https:`.

### Local development (`npm run dev`)

Vite does **not** apply `_headers` / `vercel.json` by default. Test CSP in **preview** (`npm run preview` behind a server that sends headers) or in **staging/production**.

---

## 4. “Contact Us” form

### Safe client behavior

- **`credentials: 'omit'`** on `fetch` so session cookies are not sent to the API.
- Explicit **`mode: 'cors'`**.
- **Timeout** (~15 s) with `AbortController` to avoid hung requests.
- **Validation** for email and max lengths (aligned with the backend).
- **Honeypot** (`tcce_hp` → `website` field in JSON): hidden, `tabIndex={-1}`, `autoComplete="off"`, `data-lpignore="true"`. Opening the modal clears the honeypot to avoid false positives from aggressive autofill.
- **Errors:** in **production**, avoid `console.error` with the full error object; only in **`import.meta.env.DEV`**.

### What the frontend does not do (and must not claim to)

- It does not replace **server-side** validation (Zod on Express).
- It does not stop **mass abuse** without **API rate limiting** (already configured in the backend).
- It does not hide the **payload** from an attacker controlling the browser (they can replay with `curl`).

### Backend (cross-reference)

Full API and env reference: **[BACKEND.md](./BACKEND.md)**.

In `backend/server.js` (summary):

- **Helmet** on Express.
- **CORS** with explicit origin list (`CORS_ORIGIN`).
- **Rate limit** on `/api/` routes.
- **JSON body limit** (20 kb).
- **Honeypot** `website` with max length 0.
- **HTML escape** when building email body.
- **400** responses in production **without** Zod’s detailed `details` array (generic client message only).

---

## 5. Environment variables (`VITE_*`)

- Any variable prefixed with **`VITE_`** is **embedded in the browser bundle**.
- **Never** store paid API keys, JWT secrets, mail passwords, etc. in `VITE_*`.
- Current use: **`VITE_CONTACT_API_URL`**: **public** contact API URL (e.g. `https://api.example.com`).
- Template: **`.env.example`** at the frontend root.

---

## 6. XSS surface and DOM data

- No **`dangerouslySetInnerHTML`**, **`eval`**, or **`document.write`** in reviewed frontend code.
- Form content is sent only as JSON; **email rendering** is escaped on the server.

---

## 7. Links and UI

- Footer social icons without real URLs: **`button type="button"`** instead of `href="#"` to avoid confusing navigation or abusive anchor patterns.

---

## 8. Pre-production checklist

- [ ] `VITE_CONTACT_API_URL` points to the correct **HTTPS** API.
- [ ] Backend `CORS_ORIGIN` includes the **exact** frontend origin (scheme + host + port if needed).
- [ ] **`_headers`** or **`vercel.json`** headers are active on the chosen host.
- [ ] Test real form submission and rejection when honeypot is filled (from browser and tools).
- [ ] Check browser console for CSP if third-party scripts are added.
- [ ] Node version compatible with Vite (see `npm run build` warning if any).

---

## 9. Known limitations

- Strict **CORP / COOP** may break future integrations (iframes, third-party widgets); relax only deliberately and document.
- **CSP** with `connect-src https:` is broad; it can be tightened to the API domain once stable.
