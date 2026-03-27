import type { SVGProps } from 'react'

/** Viñeta tipo flecha para listas (Construction Management intro). */
export default function CmListArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8.64 10.367"
      className={className}
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.321,4.207c-.049-.05-.233-.264-.4-.441A18.739,18.739,0,0,0,2.909.289,3.988,3.988,0,0,0,1.89,0a1.67,1.67,0,0,0-.773.188A1.619,1.619,0,0,0,.43.969a8.5,8.5,0,0,0-.221.919A20.716,20.716,0,0,0,0,5.177,23.953,23.953,0,0,0,.184,8.364,7.339,7.339,0,0,0,.479,9.51a1.542,1.542,0,0,0,1.363.857H1.89a4.215,4.215,0,0,0,1.141-.353,18.739,18.739,0,0,0,4.9-3.426,4.889,4.889,0,0,0,.417-.479A1.541,1.541,0,0,0,8.64,5.19a1.62,1.62,0,0,0-.319-.983"
      />
    </svg>
  )
}
