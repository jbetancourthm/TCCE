import type { SVGProps } from 'react'

export type CarouselArrowDirection = 'left' | 'right'

export default function CarouselArrowIcon({
  direction,
  className,
  ...props
}: {
  direction: CarouselArrowDirection
} & SVGProps<SVGSVGElement>) {
  const arrowTransform = direction === 'left' ? 'rotate(180 16 16)' : undefined

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="100%"
      height="100%"
      className={`h-full w-full origin-center scale-[0.62] ${className ?? ''}`}
      aria-hidden
      {...props}
    >
      <rect width="32" height="32" rx="16" fill="#e4611f" />
      <g transform={arrowTransform}>
        <g transform="translate(10.835 9)">
          <path
            fill="#fff"
            d="M10.753,5.436c-.063-.065-.3-.342-.523-.569A24.217,24.217,0,0,0,3.759.374,5.155,5.155,0,0,0,2.443,0a2.158,2.158,0,0,0-1,.243A2.092,2.092,0,0,0,.556,1.253,10.987,10.987,0,0,0,.27,2.441,26.773,26.773,0,0,0,0,6.69a30.955,30.955,0,0,0,.238,4.119,9.485,9.485,0,0,0,.381,1.482A1.993,1.993,0,0,0,2.38,13.4h.063a5.447,5.447,0,0,0,1.475-.457,24.218,24.218,0,0,0,6.328-4.428,6.319,6.319,0,0,0,.538-.619,1.991,1.991,0,0,0,.381-1.188,2.093,2.093,0,0,0-.412-1.271"
          />
        </g>
      </g>
    </svg>
  )
}
