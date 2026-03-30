/**
 * Hooks del módulo About — reexportaciones centralizadas.
 *
 * | Hook / módulo | Rol |
 * |---------------|-----|
 * | `useAboutSubnavScroll` | Scroll a anclas al usar el submenú About (`about:set-tab`). |
 * | `useAboutMedia` | Rutas de imágenes bajo `public/images/about/`. |
 */

export { useAboutSubnavScroll } from './useAboutSubnavScroll'
export {
  ABOUT_WHO_WE_ARE_IMAGE,
  ABOUT_CORE_VALUES_IMAGES,
  ABOUT_OUR_CULTURE_IMAGE,
  ABOUT_WORKFORCE_IMAGE,
  ABOUT_LEADERSHIP_IMAGE,
} from './useAboutMedia'
