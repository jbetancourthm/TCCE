import { useSyncExternalStore } from 'react'

/** Coincide con el breakpoint `md` de Tailwind (768px). */
export function useMinWidthMd() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(min-width: 768px)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(min-width: 768px)').matches,
    () => false,
  )
}
