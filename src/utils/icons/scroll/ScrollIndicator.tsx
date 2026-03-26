import type { SVGProps } from 'react'

export default function ScrollIndicator({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 93" className={className} aria-hidden {...props}>
      <g transform="translate(0 8.5)">
        <g transform="translate(0 52)" fill="none" stroke="currentColor" strokeWidth="1">
          <rect width="32" height="32" rx="6" stroke="none" />
          <rect x="0.5" y="0.5" width="31" height="31" rx="5.5" fill="none" />
        </g>
        <g transform="translate(3.143 53.779)">
          <g transform="translate(6.5 3)">
            <path
              d="M13.6,11.4a.891.891,0,0,0-.782-.474H7.752V.916a.895.895,0,1,0-1.789,0V10.924H.894a.888.888,0,0,0-.782.474.932.932,0,0,0,.025.93L6.1,22.015a.885.885,0,0,0,1.514,0l5.963-9.687a.933.933,0,0,0,.025-.93"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
      <text
        transform="translate(22 45) rotate(-90)"
        fill="currentColor"
        fontSize="16"
        fontFamily="Inter"
        fontWeight="700"
      >
        Scroll
      </text>
    </svg>
  )
}
