import type { SVGProps } from 'react'

export default function FooterPhoneIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden {...props}>
      <g transform="translate(-53 -3622)">
        <rect width="24" height="24" transform="translate(53 3622)" fill="none" />
        <g transform="translate(53.5 3622.5)">
          <g transform="translate(2.5 2.5)">
            <path
              d="M8.081,8.923c3.569,3.568,4.379-.56,6.651,1.711,2.191,2.19,3.45,2.629.674,5.4-.348.279-2.557,3.641-10.32-4.12S.681,1.944.961,1.6C3.743-1.187,4.175.08,6.366,2.27,8.638,4.542,4.512,5.354,8.081,8.923Z"
              transform="translate(0 0)"
              fill="currentColor"
              fillRule="evenodd"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
