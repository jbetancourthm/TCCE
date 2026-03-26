import type { SVGProps } from 'react'

export default function NavItemCaret({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...props}>
      <path
        d="M12 18.5c-.8 0-1.54-.39-2-.99l-4.25-5.52A2.5 2.5 0 0 1 7.73 8h8.54a2.5 2.5 0 0 1 1.98 3.99L14 17.51c-.46.6-1.2.99-2 .99Z"
        fill="currentColor"
      />
    </svg>
  )
}
