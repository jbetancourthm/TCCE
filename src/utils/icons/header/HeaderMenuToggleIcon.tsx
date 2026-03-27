import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { open?: boolean }

export default function HeaderMenuToggleIcon({ open, className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      overflow="visible"
      aria-hidden
      {...props}
    >
      {open ? (
        <path d="M7 7l10 10M17 7L7 17" />
      ) : (
        <>
          <path d="M5 7h14" />
          <path d="M5 12h14" />
          <path d="M5 17h14" />
        </>
      )}
    </svg>
  )
}
