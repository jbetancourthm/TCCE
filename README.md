# TCCE — Total Civil Construction (landing)

Corporate **single-page landing** site (React 19 + Vite 7 + TypeScript + Tailwind CSS 4). Includes Home, Expertise (Preconstruction / Construction Management), Safety, footer, and a global contact modal against an optional Node API.

## Documentation

| Resource | Description |
|----------|-------------|
| **[docs/README.md](./docs/README.md)** | Index of all technical documentation. |
| **[docs/MANUAL_FRONTEND.md](./docs/MANUAL_FRONTEND.md)** | Full frontend manual: architecture, modules, hooks, events, build, and conventions. |
| **[docs/FRONTEND_SECURITY.md](./docs/FRONTEND_SECURITY.md)** | Client security, CSP, headers, contact form, and production checklist. |
| **[docs/BACKEND.md](./docs/BACKEND.md)** | Contact API (Express): `/api/contact`, env vars, Gmail/Nodemailer, rate limits, CORS. |

## Requirements

- **Node.js** compatible with Vite 7 (watch `npm run build` warnings if the version is outdated).
- **npm** or another compatible package manager.

## Scripts (frontend — repo root)

```bash
npm install
npm run dev      # http://localhost:5173 (default)
npm run build    # TypeScript + bundle to dist/
npm run preview  # Serves dist/ for production-like tests
```

## Environment variables (frontend)

Copy **`.env.example`** to **`.env.local`** and adjust:

- **`VITE_CONTACT_API_URL`**: public contact API base URL (exposed in the bundle). If unset in dev, `http://localhost:3001` is used.

Do **not** put secrets in `VITE_*` variables.

## Contact backend (optional)

The **`backend/`** folder contains an **Express** server exposing `POST /api/contact` (Zod validation, rate limit, Helmet, CORS). See **`docs/BACKEND.md`**, **`backend/.env.example`**, and **`docs/FRONTEND_SECURITY.md`** for configuration and deployment alignment.

## Quick structure

```
├── backend/           # Mail / contact API
├── docs/              # Technical documentation
├── public/            # Static assets and headers (e.g. _headers for Netlify)
├── src/
│   ├── app/           # LandingPage
│   ├── sections/      # Domain modules (home, expertise, …)
│   ├── shared/        # Header, Footer, contact, hooks, services
│   └── utils/         # Icons and graphics
├── index.html
├── vite.config.ts
└── vercel.json        # Security headers on Vercel
```

## License and use

**Private** repository (`"private": true` in `package.json`). Internal use per TCCE policy.
