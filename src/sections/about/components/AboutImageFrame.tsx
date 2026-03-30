import type { ComponentPropsWithoutRef } from 'react'

type AboutImageFrameProps = ComponentPropsWithoutRef<'img'> & {
  roundedClassName?: string
}

/** Imagen About: esquinas redondeadas, sin borde ni sombra (contenedor transparente). */
export default function AboutImageFrame({
  className,
  roundedClassName = 'rounded-[2rem] md:rounded-[2.2rem]',
  alt,
  ...props
}: AboutImageFrameProps) {
  return (
    <div className={`min-w-0 overflow-hidden ${roundedClassName}`}>
      <img alt={alt} className={`block h-auto w-full max-w-full ${className ?? ''}`} loading="lazy" decoding="async" {...props} />
    </div>
  )
}
