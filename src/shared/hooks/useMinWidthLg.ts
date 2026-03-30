import { useSyncExternalStore } from 'react'

/** Coincide con el breakpoint `lg` de Tailwind (1024px). */
export function useMinWidthLg() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(min-width: 1024px)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => false,
  )
}
