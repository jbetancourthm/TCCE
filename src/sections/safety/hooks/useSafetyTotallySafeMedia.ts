/**
 * Imágenes de la sección Totally Safe (hero + tres bloques inferiores).
 *
 * Archivos esperados en `public/images/safety/safe/`:
 * - `main.png` — imagen grande del encabezado
 * - `1.png`, `2.png`, `3.png` — columnas Core Philosophy / How We Apply It / Safety Leadership
 */

export const SAFETY_TOTALLY_SAFE_MAIN_IMAGE = '/images/safety/safe/main.png'

export const SAFETY_TOTALLY_SAFE_CARD_IMAGES = [
  {
    key: 'core-philosophy',
    src: '/images/safety/safe/first.png',
    alt: 'Totally Safe — Core Philosophy',
  },
  {
    key: 'how-we-apply-it',
    src: '/images/safety/safe/second.png',
    alt: 'Totally Safe — How We Apply It',
  },
  {
    key: 'safety-leadership',
    src: '/images/safety/safe/third.png',
    alt: 'Totally Safe — Safety Leadership',
  },
] as const

export type SafetyTotallySafeCardImage = (typeof SAFETY_TOTALLY_SAFE_CARD_IMAGES)[number]
