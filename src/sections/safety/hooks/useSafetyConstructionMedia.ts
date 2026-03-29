/**
 * Imágenes de la sección Safety Construction (hero + carrusel inferior).
 */

export const SAFETY_CONSTRUCTION_MAIN_IMAGE = '/images/safety/construction/main.png'

export const ITEM_IDS = [1, 2, 3, 4, 5] as const

export const SAFETY_CONSTRUCTION_CAROUSEL_ITEMS = ITEM_IDS.map((n) => ({
  id: n,
  src: `/images/safety/construction/${n}.png`,
  alt: `Safety construction — ${n}`,
})) as readonly { id: (typeof ITEM_IDS)[number]; src: string; alt: string }[]

export type SafetyConstructionCarouselItem = (typeof SAFETY_CONSTRUCTION_CAROUSEL_ITEMS)[number]
