/**
 * Hooks del módulo Preconstruction — reexportaciones centralizadas.
 *
 * | Hook | Rol |
 * |------|-----|
 * | `usePreconstructionTabs` | Pestaña activa (Cost Estimating / Preliminary Plan). |
 * | `useProjectsCostEstimatingCarousels` | Tres carruseles con aspect ratio del primer slide en Projects Cost Estimating. |
 * | `usePreliminaryPlanGallery` | Apertura/cierre e índice del modal de galería en Preliminary Construction Plan. |
 * | `usePreliminaryGalleryModal` | Lógica interna del modal (scroll, teclado, body lock). |
 */

export { usePreconstructionTabs, type PreconstructionTab } from './usePreconstructionTabs'
export { useProjectsCostEstimatingCarousels } from './useProjectsCostEstimatingCarousels'
export { usePreliminaryPlanGallery } from './usePreliminaryPlanGallery'
export { usePreliminaryGalleryModal } from './usePreliminaryGalleryModal'
