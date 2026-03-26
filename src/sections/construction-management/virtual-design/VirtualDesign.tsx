import RelatedProjectsSection from '../components/RelatedProjectsSection'

export default function VirtualDesign() {
  return (
    <div className="mt-10 w-full rounded-3xl bg-neutral-50/60 p-6">
      <div className="w-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-start md:gap-6">
          <div className="relative h-[16.5rem] flex-1 overflow-hidden rounded-3xl bg-neutral-200 md:h-[19rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-[#0B2B6E]/20" />
            <div className="absolute inset-x-0 bottom-7 px-6 text-center">
              <span className="text-lg font-semibold text-white/95 drop-shadow">Virtual Design &amp; Construction</span>
            </div>
          </div>

          <div className="relative h-[16.5rem] flex-1 overflow-hidden rounded-3xl bg-neutral-200 md:h-[19rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B2B6E]/70 via-neutral-900/40 to-[#E4611F]/20" />
            <div className="absolute inset-x-0 bottom-7 px-6 text-center">
              <span className="text-lg font-semibold text-white/95 drop-shadow">BIM Coordination</span>
            </div>
          </div>

          <div className="relative h-[16.5rem] flex-1 overflow-hidden rounded-3xl bg-neutral-200 md:h-[19rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-[#E4611F]/25" />
            <div className="absolute inset-x-0 bottom-7 px-6 text-center">
              <span className="text-lg font-semibold text-white/95 drop-shadow">Augmented Reality</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#E4611F]" />
          <span className="h-2 w-2 rounded-full bg-neutral-300" />
          <span className="h-2 w-2 rounded-full bg-neutral-300" />
        </div>

        <RelatedProjectsSection />
      </div>
    </div>
  )
}
