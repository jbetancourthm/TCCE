# TCCE — Total Civil Construction (Landing)

Sitio corporativo tipo **landing de una sola página** (React 19 + Vite 7 + TypeScript + Tailwind CSS 4). Incluye secciones de Home, Expertise (Preconstruction / Construction Management), Safety, footer y modal global de contacto contra un API Node opcional.

## Documentación

| Recurso | Descripción |
|---------|-------------|
| **[docs/README.md](./docs/README.md)** | Índice de toda la documentación técnica. |
| **[docs/MANUAL_FRONTEND.md](./docs/MANUAL_FRONTEND.md)** | Manual detallado del frontend: arquitectura, módulos, hooks, eventos, build y convenciones. |
| **[docs/SEGURIDAD_FRONTEND.md](./docs/SEGURIDAD_FRONTEND.md)** | Seguridad del cliente, CSP, cabeceras, formulario de contacto y checklist de producción. |

## Requisitos

- **Node.js** compatible con Vite 7 (revisar avisos de `npm run build` si la versión es antigua).
- **npm** u otro gestor compatible.

## Scripts (frontend — raíz del repo)

```bash
npm install
npm run dev      # http://localhost:5173 (por defecto)
npm run build    # TypeScript + bundle en dist/
npm run preview  # Sirve dist/ para pruebas de producción
```

## Variables de entorno (frontend)

Copia **`.env.example`** a **`.env.local`** y ajusta:

- **`VITE_CONTACT_API_URL`**: URL base del API de contacto (pública en el bundle). Sin definir en dev se usa `http://localhost:3001`.

**No** coloques secretos en variables `VITE_*`.

## Backend de contacto (opcional)

En la carpeta **`backend/`** hay un servidor **Express** que expone `POST /api/contact` (validación Zod, rate limit, Helmet, CORS). Ver `backend/.env.example` y el manual de seguridad para alinear orígenes y despliegue.

## Estructura rápida

```
├── backend/           # API de correo / contacto
├── docs/              # Documentación técnica
├── public/            # Estáticos y cabeceras (p. ej. _headers para Netlify)
├── src/
│   ├── app/           # LandingPage
│   ├── sections/      # Módulos por dominio (home, expertise, …)
│   ├── shared/        # Header, Footer, contacto, hooks y servicios
│   └── utils/         # Iconos y gráficos
├── index.html
├── vite.config.ts
└── vercel.json        # Cabeceras de seguridad en Vercel
```

## Licencia y uso

Repositorio **privado** (`"private": true` en `package.json`). Uso interno según política de TCCE.
