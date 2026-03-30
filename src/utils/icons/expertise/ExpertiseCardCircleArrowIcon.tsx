import type { SVGProps } from 'react'

/** Círculo con flecha (cards Preconstruction / Construction Management en Expertise). */
export default function ExpertiseCardCircleArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1}>
        <rect width={32} height={32} rx={16} stroke="none" />
        <rect x={0.5} y={0.5} width={31} height={31} rx={15.5} fill="none" />
      </g>
      <g transform="translate(25.849 9.981) rotate(90)">
        <path
          d="M11.939,9.694a.782.782,0,0,1-.687.416H6.8v8.785a.785.785,0,1,1-1.57,0V10.11H.785A.78.78,0,0,1,.1,9.694.818.818,0,0,1,.12,8.878L5.354.375a.776.776,0,0,1,1.329,0l5.234,8.5a.819.819,0,0,1,.022.816"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
