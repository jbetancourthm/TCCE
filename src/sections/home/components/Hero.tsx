import Container from '../../../shared/components/Container'

export default function Hero() {
  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-neutral-950">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/home/video hero.mp4" type="video/mp4" />
      </video>

      <Container className="relative z-[2] flex min-h-[100svh] flex-col pt-28 pb-10 md:pb-14">
        <div className="-translate-x-16 md:-translate-x-20 translate-y-8 md:translate-y-10 flex min-h-0 flex-1 flex-col justify-end pt-8 md:pt-12 lg:pt-14">
          <div className="mb-3 max-w-3xl text-left text-white sm:mb-4 sm:ml-[1vw] md:mb-5 md:ml-[4vw] lg:ml-[6vw] xl:ml-[8vw]">
            <h1
              className="font-sans text-balance text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}
            >
              We don&apos;t just build
            </h1>
            <p
              className="mt-5 sm:mt-6 max-w-3xl text-pretty text-xl font-medium leading-tight sm:text-2xl md:text-3xl lg:text-4xl"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              We understand the plan -
              <br />
              And elevate the outcome.
            </p>
          </div>
        </div>

        <div className="-translate-x-16 md:-translate-x-20 translate-y-8 md:translate-y-10 mt-auto shrink-0 pb-2 pt-0 sm:pt-1 md:pt-1 sm:ml-[1vw] md:ml-[4vw] lg:ml-[6vw] xl:ml-[8vw]">
          <p
            className="max-w-3xl text-left text-sm font-normal text-white sm:text-base md:text-lg"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.45)' }}
          >
            <span className="font-light">Built on innovation. Powered by data.</span>
            <br />
            <strong className="font-bold">Delivering trust.</strong>
          </p>
        </div>
      </Container>

      {/* Botones: abajo a la derecha del viewport (no centrados). Padding derecho = menos pegados al borde que antes */}
      <div
        className="pointer-events-none absolute inset-x-0 z-[3] flex justify-end pl-4 pr-24 sm:pr-32 md:pr-40 lg:pr-48 xl:pr-56"
        style={{ top: 'clamp(78%, 92vh, 82%)' }}
      >
        <div className="pointer-events-auto flex flex-wrap justify-end gap-4 sm:gap-5">
          <button
            type="button"
            className="min-w-[13rem] rounded-xl border border-white bg-transparent px-12 py-2 text-sm font-medium text-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-colors duration-200 hover:bg-white hover:text-orange-500 hover:shadow-none sm:min-w-[15rem] md:min-w-[11rem] md:px-14 md:py-3"
          >
            View Services
          </button>
          <button
            type="button"
            className="min-w-[13rem] rounded-xl border border-transparent bg-orange-500 px-8 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-700 sm:min-w-[15rem] md:min-w-[11rem] md:px-10 md:py-3"
          >
            Explore Our Process
          </button>
        </div>
      </div>
    </div>
  )
}
