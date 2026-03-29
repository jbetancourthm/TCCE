import { useState, type Dispatch, type SetStateAction, type SyntheticEvent } from 'react'

const AERIAL_CAROUSEL_IMAGES = [
  '/images/preconstruction/project-cost/last1.png',
  '/images/preconstruction/project-cost/last2.png',
  '/images/preconstruction/project-cost/last3.png',
] as const

const EARTHWORK_CAROUSEL_IMAGES = [
  '/images/preconstruction/project-cost/first1.png',
  '/images/preconstruction/project-cost/first1.png',
  '/images/preconstruction/project-cost/first1.png',
] as const

const UNDERGROUND_CAROUSEL_IMAGES = [
  '/images/preconstruction/project-cost/second1.png',
  '/images/preconstruction/project-cost/second2.png',
] as const

const earthworkSlideBasisPct = 100 / EARTHWORK_CAROUSEL_IMAGES.length
const undergroundSlideBasisPct = 100 / UNDERGROUND_CAROUSEL_IMAGES.length
const aerialSlideBasisPct = 100 / AERIAL_CAROUSEL_IMAGES.length

function recordNaturalSize(setNatural: Dispatch<SetStateAction<{ w: number; h: number } | null>>) {
  return (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.naturalWidth > 0) {
      setNatural({ w: img.naturalWidth, h: img.naturalHeight })
    }
  }
}

/**
 * Tres carruseles independientes en Projects Cost Estimating (earthwork, underground, aerial).
 *
 * Cada uno lleva índice de slide, porcentaje de traslación según cantidad de imágenes y, para fijar
 * el aspect ratio del visor, las dimensiones naturales de la primera imagen al cargar.
 */
export function useProjectsCostEstimatingCarousels() {
  const [earthworkIndex, setEarthworkIndex] = useState(0)
  const [undergroundIndex, setUndergroundIndex] = useState(0)
  const [aerialIndex, setAerialIndex] = useState(0)

  const [earthworkFirstSlideNatural, setEarthworkFirstSlideNatural] = useState<{ w: number; h: number } | null>(null)
  const [undergroundFirstSlideNatural, setUndergroundFirstSlideNatural] = useState<{ w: number; h: number } | null>(null)
  const [aerialFirstSlideNatural, setAerialFirstSlideNatural] = useState<{ w: number; h: number } | null>(null)

  return {
    earthwork: {
      images: EARTHWORK_CAROUSEL_IMAGES,
      slideBasisPct: earthworkSlideBasisPct,
      index: earthworkIndex,
      setIndex: setEarthworkIndex,
      firstSlideNatural: earthworkFirstSlideNatural,
      onFirstSlideLoad: recordNaturalSize(setEarthworkFirstSlideNatural),
      goPrevious: () =>
        setEarthworkIndex((prev) => (prev + EARTHWORK_CAROUSEL_IMAGES.length - 1) % EARTHWORK_CAROUSEL_IMAGES.length),
      goNext: () => setEarthworkIndex((prev) => (prev + 1) % EARTHWORK_CAROUSEL_IMAGES.length),
    },
    underground: {
      images: UNDERGROUND_CAROUSEL_IMAGES,
      slideBasisPct: undergroundSlideBasisPct,
      index: undergroundIndex,
      setIndex: setUndergroundIndex,
      firstSlideNatural: undergroundFirstSlideNatural,
      onFirstSlideLoad: recordNaturalSize(setUndergroundFirstSlideNatural),
      goPrevious: () =>
        setUndergroundIndex(
          (prev) => (prev + UNDERGROUND_CAROUSEL_IMAGES.length - 1) % UNDERGROUND_CAROUSEL_IMAGES.length,
        ),
      goNext: () => setUndergroundIndex((prev) => (prev + 1) % UNDERGROUND_CAROUSEL_IMAGES.length),
    },
    aerial: {
      images: AERIAL_CAROUSEL_IMAGES,
      slideBasisPct: aerialSlideBasisPct,
      index: aerialIndex,
      setIndex: setAerialIndex,
      firstSlideNatural: aerialFirstSlideNatural,
      onFirstSlideLoad: recordNaturalSize(setAerialFirstSlideNatural),
      goPrevious: () =>
        setAerialIndex((prev) => (prev + AERIAL_CAROUSEL_IMAGES.length - 1) % AERIAL_CAROUSEL_IMAGES.length),
      goNext: () => setAerialIndex((prev) => (prev + 1) % AERIAL_CAROUSEL_IMAGES.length),
    },
  }
}
