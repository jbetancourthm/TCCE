/**
 * Rutas y metadatos de imágenes para Safety Planning.
 * La lógica de presentación (marquesina vs grid reducido) vive en el componente.
 */

export const SAFETY_PLANNING_BIG_IMAGE = '/images/safety/planning/big.png'

export const SAFETY_PLANNING_MARQUEE_ITEMS = [
  { src: '/images/safety/planning/first.png', alt: 'Safety planning — field coordination' },
  { src: '/images/safety/planning/second.png', alt: 'Safety planning — site preparation' },
  { src: '/images/safety/planning/third.png', alt: 'Safety planning — team alignment' },
] as const

export type SafetyPlanningMarqueeItem = (typeof SAFETY_PLANNING_MARQUEE_ITEMS)[number]

/** Secuencia duplicada para animación seamless de la marquesina (translateX -50%). */
export const SAFETY_PLANNING_MARQUEE_LOOP = [
  ...SAFETY_PLANNING_MARQUEE_ITEMS,
  ...SAFETY_PLANNING_MARQUEE_ITEMS,
] as const
