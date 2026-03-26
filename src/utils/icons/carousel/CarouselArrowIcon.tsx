import type { SVGProps } from 'react'

export type CarouselArrowDirection = 'left' | 'right'

export default function CarouselArrowIcon({
  direction,
  className,
  ...props
}: {
  direction: CarouselArrowDirection
} & SVGProps<SVGSVGElement>) {
  const rotate = direction === 'left' ? 'rotate(180 12 12)' : undefined

  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      className={`h-full w-full ${className ?? ''} scale-[0.72] origin-center`}
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="11" fill="#E4611F" />
      <g transform={rotate}>
        <path d="M10 8 L16 12 L10 16 Z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

