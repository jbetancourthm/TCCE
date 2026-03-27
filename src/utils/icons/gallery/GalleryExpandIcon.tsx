import { useId } from 'react'
import type { SVGProps } from 'react'

/** Icono “+” en recuadro con halo naranja (#E4611F); abre galería / lightbox. */
export default function GalleryExpandIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  const filterId = useId().replace(/:/g, '')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={56}
      height={56}
      viewBox="0 0 56 56.001"
      className={className}
      aria-hidden
      {...props}
    >
      <defs>
        <filter id={`gallery-expand-${filterId}`} x="0" y="0" width="56" height="56.001" filterUnits="userSpaceOnUse">
          <feOffset dy="3" in="SourceAlpha" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="6" result="blur" />
          <feFlood floodColor="#e4611f" result="flood" />
          <feComposite in="flood" in2="blur" operator="in" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>
      <g filter={`url(#gallery-expand-${filterId})`}>
        <path
          fill="#fff"
          d="M-4411.659,20h-8.671c-3.392,0-5.67-2.375-5.67-5.909V5.919c0-3.541,2.279-5.919,5.67-5.919h8.671c3.384,0,5.658,2.379,5.658,5.919v8.172C-4406,17.626-4408.275,20-4411.659,20Zm-7.926-10.835a1,1,0,0,0-1,1,.993.993,0,0,0,.293.706.994.994,0,0,0,.708.293h2.752v2.753a1,1,0,0,0,1,1,.994.994,0,0,0,.708-.293.994.994,0,0,0,.293-.706V11.166h2.75a1,1,0,0,0,1-1,1,1,0,0,0-1-1h-2.751V6.415a1,1,0,0,0-1-1,1,1,0,0,0-1,1V9.166Z"
          transform="translate(4444 15)"
        />
      </g>
    </svg>
  )
}
