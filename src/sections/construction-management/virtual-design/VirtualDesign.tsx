import RelatedProjectsSection from '../components/RelatedProjectsSection'

export default function VirtualDesign() {
  return (
    <div className="mt-10 w-full rounded-3xl bg-neutral-50/60 p-6">
      <div className="w-full">
        <div className="mx-auto flex w-[98%] max-w-[85rem] flex-col gap-6 md:flex-row md:items-stretch md:justify-center md:gap-6">
          <div className="group relative h-[17.5rem] min-w-0 flex-1 cursor-default overflow-hidden rounded-3xl bg-neutral-200 md:h-[20rem]">
            <img
              src="/images/construction-management/virtual/virtual.png"
              alt="Virtual Design & Construction"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/55"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
              aria-hidden
            />
            <div className="absolute inset-0 z-10 px-4 text-center md:px-6">
              <div className="absolute inset-x-0 bottom-7 transition-transform duration-500 ease-out [transition-delay:180ms] group-hover:translate-y-[-13rem] group-hover:[transition-delay:0ms] md:group-hover:translate-y-[-14rem]">
                <span className="block text-xl font-semibold text-white drop-shadow">Virtual Design &amp; Construction</span>
              </div>
              <p
                className="absolute inset-x-4 top-[5.5rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] group-hover:max-h-[13rem] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition-delay:380ms] md:inset-x-8 md:top-[6.25rem] md:group-hover:max-h-[15rem] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2"
              >
                During construction, the digital twin stays alive. Our VDC team keeps field operations aligned with
                continuously validated models — so crews always have accurate, constructible information in hand, not
                outdated drawings. Delays get caught before they happen, not after.
                <br />
                Field-verified updates, 3D/4D sequencing, and real-time coordination keep every trade synchronized and
                every stakeholder informed.
                RFIs, submittals, and installation decisions are backed by clear visual data — moving the project
                forward with precision and full transparency.
              </p>
            </div>
          </div>

          <div className="group relative h-[17.5rem] min-w-0 flex-1 cursor-default overflow-hidden rounded-3xl bg-neutral-200 md:h-[20rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B2B6E]/70 via-neutral-900/40 to-[#E4611F]/20" />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/55"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
              aria-hidden
            />
            <div className="absolute inset-0 z-10 px-4 text-center md:px-6">
              <div className="absolute inset-x-0 bottom-7 transition-transform duration-500 ease-out [transition-delay:180ms] group-hover:translate-y-[-10rem] group-hover:[transition-delay:0ms] md:group-hover:translate-y-[-11rem]">
                <span className="block text-xl font-semibold text-white drop-shadow">BIM Coordination</span>
              </div>
              <p
                className="absolute inset-x-4 top-[6.75rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] group-hover:max-h-[13rem] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition-delay:380ms] md:inset-x-8 md:top-[7.5rem] md:group-hover:max-h-[15rem] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2"
              >
                Conflicts are resolved in the model, not in the field. We integrate accurate, multidisciplinary models
                to detect clashes early, align every trade, and ensure each design decision is constructible before work
                begins — eliminating costly surprises and keeping the project moving with confidence.
              </p>
            </div>
          </div>

          <div className="group relative h-[17.5rem] min-w-0 flex-1 cursor-default overflow-hidden rounded-3xl bg-neutral-200 md:h-[20rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-[#E4611F]/25" />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/55"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
              aria-hidden
            />
            <div className="absolute inset-0 z-10 px-4 text-center md:px-6">
              <div className="absolute inset-x-0 bottom-7 transition-transform duration-500 ease-out [transition-delay:180ms] group-hover:translate-y-[-10rem] group-hover:[transition-delay:0ms] md:group-hover:translate-y-[-11rem]">
                <span className="block text-xl font-semibold text-white drop-shadow">Augmented Reality</span>
              </div>
              <p
                className="absolute inset-x-4 top-[6.75rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] group-hover:max-h-[13rem] group-hover:translate-y-0 group-hover:opacity-100 group-hover:[transition-delay:380ms] md:inset-x-8 md:top-[7.5rem] md:group-hover:max-h-[15rem] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2"
              >
                Augmented Reality enhances project clarity by overlaying digital models onto real-world environments,
                giving teams and clients an immediate, intuitive understanding of design intent, constructability, and
                on-site decision-making.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <RelatedProjectsSection />
        </div>
      </div>
    </div>
  )
}
