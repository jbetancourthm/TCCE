/**
 * Hooks del módulo Construction Management — reexportaciones centralizadas.
 *
 * | Hook | Rol |
 * |------|-----|
 * | `useConstructionManagementTabs` | Pestaña activa (Field / VDC / Performance). |
 * | `useTouchExpandableCards` | Expansión táctil en móvil + reset al pasar a desktop (VDC, Performance). |
 * | `useFieldOperationsCarousel` | Páginas del carrusel Field Operations y estado de tarjetas expandibles. |
 * | `useRelatedProjectsPagination` | Paginación de Related Projects. |
 */

export { useConstructionManagementTabs, type ConstructionTab } from './useConstructionManagementTabs'
export { useTouchExpandableCards } from './useTouchExpandableCards'
export { useFieldOperationsCarousel, type FieldOperationsCard } from './useFieldOperationsCarousel'
export { useRelatedProjectsPagination } from './useRelatedProjectsPagination'
