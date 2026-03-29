/**
 * Hooks del módulo Safety — reexportaciones centralizadas.
 *
 * Toda la lógica y datos reutilizables de estado/efectos del módulo deben vivir en esta carpeta (`hooks/`).
 *
 * | Hook / módulo | Rol |
 * |---------------|-----|
 * | `useSafetySectionTabs` | Pestañas del switch + listener `safety:set-tab` (navegación desde el Header). |
 * | `useSafetyConstructionCarousel` | Páginas y navegación del carrusel inferior en Safety Construction. |
 * | `useSafetyConstructionMedia` | Rutas: Safety Construction (main + carrusel 1–5). |
 * | `useSafetyPlanningMedia` | Rutas y lista de imágenes de Safety Planning (hero + marquesina). |
 * | `useSafetyTotallySafeMedia` | Rutas: Totally Safe (hero + tres imágenes inferiores). |
 */

export { useSafetySectionTabs, type SafetySectionTab } from './useSafetySectionTabs'
export { useSafetyConstructionCarousel } from './useSafetyConstructionCarousel'
export {
  SAFETY_CONSTRUCTION_MAIN_IMAGE,
  SAFETY_CONSTRUCTION_CAROUSEL_ITEMS,
  type SafetyConstructionCarouselItem,
} from './useSafetyConstructionMedia'
export {
  SAFETY_PLANNING_BIG_IMAGE,
  SAFETY_PLANNING_MARQUEE_ITEMS,
  SAFETY_PLANNING_MARQUEE_LOOP,
  type SafetyPlanningMarqueeItem,
} from './useSafetyPlanningMedia'
export {
  SAFETY_TOTALLY_SAFE_MAIN_IMAGE,
  SAFETY_TOTALLY_SAFE_CARD_IMAGES,
  type SafetyTotallySafeCardImage,
} from './useSafetyTotallySafeMedia'
