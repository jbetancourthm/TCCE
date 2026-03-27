import type { ComponentPropsWithoutRef } from 'react'
import ContactUsPhoneCircleIcon from '../../utils/icons/contact/ContactUsPhoneCircleIcon'

export default function ContactUsPillButton({
  className,
  children = 'Contact Us',
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      className={`group relative inline-flex h-14 select-none items-stretch overflow-hidden rounded-full border-2 border-transparent bg-transparent px-3 text-base font-semibold text-[#E4611F] transition-[color,border-color] duration-300 ease-out motion-reduce:transition-none hover:border-[#E4611F] hover:text-white focus-visible:border-[#E4611F] focus-visible:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4611F] focus-visible:ring-offset-2 ${className ?? ''}`}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#E4611F] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-x-100 group-focus-visible:scale-x-100"
        aria-hidden
      />
      <span className="relative z-10 inline-flex items-center gap-1.5 group-hover:flex-row-reverse group-focus-visible:flex-row-reverse">
        <ContactUsPhoneCircleIcon className="h-11 w-11 shrink-0" />
        <span>{children}</span>
      </span>
    </button>
  )
}
