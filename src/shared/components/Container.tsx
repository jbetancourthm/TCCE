import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 xl:px-10 ${className ?? ''}`}>
      {children}
    </div>
  )
}

