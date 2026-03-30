import { useSyncExternalStore } from 'react'

/** Alineado con breakpoints arbitrarios de Safety (~950px apilado / 951px+ desktop). */
export function useMinWidth951() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(min-width: 951px)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(min-width: 951px)').matches,
    () => false,
  )
}
