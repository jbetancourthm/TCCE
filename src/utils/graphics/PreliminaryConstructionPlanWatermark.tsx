import { useId } from 'react'
import type { SVGProps } from 'react'

/** Franja decorativa de texto repetido a ancho completo (capa de fondo). */
export default function PreliminaryConstructionPlanWatermark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  const clipId = useId().replace(/:/g, '')

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1920"
      height="272"
      viewBox="0 0 1920 272"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      {...props}
    >
      <defs>
        <clipPath id={`pcp-clip-${clipId}`}>
          <rect x="36" width="1920" height="272" fill="none" />
        </clipPath>
      </defs>
      <g
        transform="translate(-36)"
        opacity={0.078}
        clipPath={`url(#pcp-clip-${clipId})`}
        style={{ mixBlendMode: 'normal', isolation: 'isolate' }}
      >
        <text
          transform="translate(0 218)"
          fill="#5c5c5c"
          fontSize="225"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            PRELIMINARY CONSTRUCTION PLAN - PRELIMINARY CONSTRUCTION PLAN|
          </tspan>
        </text>
      </g>
    </svg>
  )
}
