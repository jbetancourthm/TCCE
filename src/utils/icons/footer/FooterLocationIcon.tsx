import type { SVGProps } from 'react'

export default function FooterLocationIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden {...props}>
      <g transform="translate(3 -3679)">
        <rect width="24" height="24" transform="translate(-3 3679)" fill="none" />
        <g transform="translate(-3 3679)">
          <g transform="translate(2 2)">
            <path
              d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Zm3.85,6.71a.449.449,0,0,0-.56-.57h0L8.17,7.74a.668.668,0,0,0-.44.44h0l-1.6,5.13a.448.448,0,0,0,.56.56h0l5.1-1.6a.648.648,0,0,0,.44-.44h0Z"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
