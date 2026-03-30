# TCCE contact API (backend)

Small **Express** service that receives submissions from the landing **Contact Us** form and sends email via **Gmail (SMTP)** using **Nodemailer**. It lives in **`backend/`** and is **not** part of the Vite frontend bundle.

For client-side security (CORS, CSP, form behavior), see **[FRONTEND_SECURITY.md](./FRONTEND_SECURITY.md)**.

---

## Tech stack

| Piece | Technology |
|-------|------------|
| Runtime | Node.js (ES modules: `"type": "module"`) |
| HTTP | Express 4 |
| Validation | Zod 3 |
| Mail | Nodemailer → Gmail |
| Hardening | Helmet, `express-rate-limit`, strict JSON size |
| Config | `dotenv` |

---

## Scripts (`backend/package.json`)

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies. |
| `npm start` | Run `node server.js`. |
| `npm run dev` | Run with `node --watch server.js` (restart on file changes). |

Default listen port: **`3001`** (overridable with `PORT`).

---

## Environment variables

Copy **`.env.example`** to **`.env`** in `backend/`. Do **not** commit real credentials.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | HTTP port (default `3001`). |
| `GMAIL_USER` | Yes (for sending) | Gmail address used to authenticate SMTP. |
| `GMAIL_APP_PASSWORD` | Yes | [App password](https://support.google.com/accounts/answer/185833) for that account (not the normal login password). |
| `TO_EMAIL` | Yes | Inbox that receives contact submissions. |
| `CORS_ORIGIN` | No | Comma-separated list of allowed browser origins (e.g. `http://localhost:5173`, production site URL). Defaults to local Vite URLs if unset. |
| `EMAIL_LOGO_URL` | No | Absolute **HTTPS** URL to a **PNG** logo for the HTML email (better for Outlook). If unset, the server attaches **`backend/assets/email-logo.svg`** as an inline **CID** image instead. |
| `NODE_ENV` | No | If set to `production`, Zod **validation detail arrays** are omitted from `400` responses (only a single user-facing message is returned). |

---

## HTTP API

### `GET /health`

Returns JSON such as `{ ok: true, message: '...' }` for uptime checks.

### `POST /api/contact`

**Content-Type:** `application/json`  
**Body (aligned with the frontend modal):**

| Field | Rules |
|-------|--------|
| `name` | String, trimmed, length 2–100. |
| `email` | Valid email, max 120 chars. |
| `message` | Non-empty, max 1500 chars. |
| `website` | Honeypot: must be **empty or omitted** (server enforces max length `0` when present). |

**Success `200`:** `{ ok: true, message: '...' }`  
**Validation `400`:** `{ ok: false, error: string }`; in non-production, may include `details` (Zod issues) for debugging.  
**Misconfiguration `500`:** missing `GMAIL_*` / `TO_EMAIL`, or mail send failure — generic message to the client.

**Rate limiting:** All routes under **`/api/*`** share a limiter: **30 requests / 10 minutes** per IP (see `server.js`). Adjust if your hosting policy requires different values.

**JSON body size:** Hard cap **20 KB** (`express.json({ limit: '20kb' })`).

---

## Behavior summary

1. **`helmet()`** sets sensible default security headers on responses.
2. **CORS** allows only origins listed in `CORS_ORIGIN` (trimmed); `POST` and `GET` are allowed. The frontend uses `fetch` with `credentials: 'omit'`.
3. **Input** is normalized (strings trimmed; unknown types become empty).
4. **HTML** fields in the outgoing email are built from **`escapeHtml`**-safe strings to reduce injection in the mail client.
5. **Reply-To** is set to the submitter’s email so staff can reply in one click.

---

## Project layout (`backend/`)

| Path | Role |
|------|------|
| `server.js` | Express app, routes, Zod schema, Nodemailer send. |
| `email/contactFormHtml.js` | Builds HTML email (tables + inline styles), logo CID vs `EMAIL_LOGO_URL`, attachments helper. |
| `assets/email-logo.svg` | Default inline logo for HTML email when `EMAIL_LOGO_URL` is not set. |

---

## Frontend integration

- The SPA calls **`{VITE_CONTACT_API_URL}/api/contact`** (see **[MANUAL_FRONTEND.md](./MANUAL_FRONTEND.md)** §4 and §16).
- In development, if `VITE_CONTACT_API_URL` is missing, the frontend may default to `http://localhost:3001` — ensure the backend runs on the same port or align both env files.
- **Production:** use HTTPS for the API URL; set **`CORS_ORIGIN`** to the exact production origin(s) of the static site (scheme + host + port if non-default).

---

## Operations checklist

- [ ] `GMAIL_USER` / `GMAIL_APP_PASSWORD` / `TO_EMAIL` set on the server.
- [ ] `CORS_ORIGIN` includes every allowed frontend origin.
- [ ] `POST /api/contact` tested from the deployed site (not only localhost).
- [ ] Honeypot: submissions with `website` filled should return **400**.
- [ ] Rate limit acceptable for expected traffic; monitor 429s if needed.

---

*Last updated to match `backend/server.js` and `email/contactFormHtml.js`. Adjust this doc if routes, limits, or schema change.*
