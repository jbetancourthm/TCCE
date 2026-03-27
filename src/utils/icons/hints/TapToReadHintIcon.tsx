import type { SVGProps } from 'react'

/** Pista visual: tocar para ver más texto (móvil). */
export default function TapToReadHintIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      fill="none"
      className={className}
      aria-hidden
      {...props}
    >
      <circle cx="28" cy="28" r="26" className="fill-black/40" />
      <circle cx="28" cy="28" r="26" className="stroke-white/45" strokeWidth="1.25" />
      {/* ondas de toque */}
      <circle cx="34" cy="38" r="10" className="stroke-white/35" strokeWidth="1.5" />
      <circle cx="34" cy="38" r="6" className="stroke-white/55" strokeWidth="1.25" />
      {/* dedo índice */}
      <path
        fill="#fff"
        d="M22.2 12.2c.78-.22 1.6.15 2 1.85l2.05 9.1.85-6.65a2 2 0 0 1 3.95.3l-.95 11.35 2.65-2.5a2 2 0 0 1 2.8 2.8l-5.15 4.5-.5 6.9a3.2 3.2 0 0 1-3.2 3.05h-4.95a3.2 3.2 0 0 1-2.7-1.45L16 27.1a3.6 3.6 0 0 1-.45-2.65l1.2-5.8a2.6 2.6 0 0 1 2.45-2.05l.15-6.15c.05-.9.75-1.65 1.85-1.95Z"
      />
    </svg>
  )
}
