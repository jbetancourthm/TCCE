import { type ReactNode } from 'react'
import TapToReadHintIcon from '../../../utils/icons/hints/TapToReadHintIcon'
import { useTouchExpandableCards } from '../hooks/useTouchExpandableCards'
import RelatedProjectsSection from './RelatedProjectsSection'

export default function PerformanceMonitoring() {
  const { isDesktop, toggleCard, isExpandedTouch } = useTouchExpandableCards()

  const cardShell = (
    key: string,
    ariaLabel: string,
    children: {
      media: ReactNode
      title: ReactNode
      paragraph: ReactNode
      titleShiftClasses: string
    },
  ) => {
    const expandedTouch = isExpandedTouch(key)
    return (
      <div
        key={key}
        role={isDesktop ? undefined : 'button'}
        tabIndex={isDesktop ? undefined : 0}
        aria-expanded={isDesktop ? undefined : expandedTouch}
        aria-label={isDesktop ? undefined : `${expandedTouch ? 'Contraer' : 'Ampliar'}: ${ariaLabel}`}
        data-expanded={expandedTouch ? 'true' : undefined}
        className="group relative h-[17.5rem] w-full shrink-0 min-w-0 flex-none cursor-default overflow-hidden rounded-3xl bg-neutral-200 max-md:cursor-pointer md:h-[20rem] md:min-w-0 md:flex-1"
        onClick={isDesktop ? undefined : () => toggleCard(key)}
        onKeyDown={
          isDesktop
            ? undefined
            : (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleCard(key)
                }
              }
        }
      >
        {children.media}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-opacity duration-300 max-md:group-data-[expanded=true]:from-black/85 max-md:group-data-[expanded=true]:via-black/55 md:group-hover:from-black/85 md:group-hover:via-black/55"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 max-md:group-data-[expanded=true]:bg-black/40 md:group-hover:bg-black/40"
          aria-hidden
        />
        {!isDesktop && !expandedTouch ? (
          <div
            className="pointer-events-none absolute top-2 right-2 z-20 flex max-w-[46%] flex-col items-end gap-0.5 motion-safe:animate-pulse"
            aria-hidden
          >
            <TapToReadHintIcon className="h-10 w-10 shrink-0 drop-shadow-md sm:h-11 sm:w-11" />
            <span className="text-right text-[0.625rem] font-semibold leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Toca para leer
            </span>
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 z-10 px-4 text-center md:px-6">
          <div
            className={`absolute inset-x-0 bottom-7 transition-transform duration-500 ease-out [transition-delay:180ms] max-md:group-data-[expanded=true]:[transition-delay:0ms] md:group-hover:[transition-delay:0ms] ${children.titleShiftClasses}`}
          >
            {children.title}
          </div>
          {children.paragraph}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-10 w-full rounded-3xl bg-neutral-50/60 p-6">
      <div className="w-full">
        <div className="mx-auto flex w-[98%] max-w-[85rem] flex-col gap-6 md:flex-row md:items-stretch md:justify-center md:gap-6">
          {cardShell('performance', 'Performance Monitoring', {
            media: (
              <img
                src="/images/construction-management/performance/performance.png"
                alt="Performance Monitoring"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              />
            ),
            title: (
              <span className="block text-xl font-semibold text-white drop-shadow">Performance Monitoring</span>
            ),
            titleShiftClasses:
              'max-md:group-data-[expanded=true]:translate-y-[-13rem] md:group-hover:translate-y-[-14rem]',
            paragraph: (
              <p className="absolute inset-x-4 top-[5.5rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] max-md:group-data-[expanded=true]:max-h-[13rem] max-md:group-data-[expanded=true]:translate-y-0 max-md:group-data-[expanded=true]:opacity-100 max-md:group-data-[expanded=true]:[transition-delay:380ms] md:inset-x-8 md:top-[6.25rem] md:group-hover:max-h-[15rem] md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:[transition-delay:380ms] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2">
                We stay closely connected to every phase of construction-tracking production, schedule, and cost
                performance in real time. Our team actively monitors progress to ensure projects remain aligned, controlled,
                and moving forward as planned.
                <br />
                <br />
                By identifying trends early and responding quickly to changing site conditions, we help protect
                schedules, manage risk, and deliver consistent results from start to finish.
              </p>
            ),
          })}

          {cardShell('cost-schedule', 'Cost and Schedule Control', {
            media: (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B2B6E]/70 via-neutral-900/40 to-[#E4611F]/20" />
            ),
            title: (
              <span className="block text-xl font-semibold text-white drop-shadow">Cost and Schedule Control</span>
            ),
            titleShiftClasses:
              'max-md:group-data-[expanded=true]:translate-y-[-13.5rem] md:group-hover:translate-y-[-14.5rem]',
            paragraph: (
              <p className="absolute inset-x-4 top-[4.9rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] max-md:group-data-[expanded=true]:max-h-[13rem] max-md:group-data-[expanded=true]:translate-y-0 max-md:group-data-[expanded=true]:opacity-100 max-md:group-data-[expanded=true]:[transition-delay:380ms] md:inset-x-8 md:top-[5.65rem] md:group-hover:max-h-[15rem] md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:[transition-delay:380ms] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2">
                We continuously track cost and schedule performance against project objectives by integrating real-time
                field progress with cost data. This provides clear visibility into project status, allowing us to identify
                variances early, take corrective action, and keep projects on budget and on schedule.
                <br />
                <span className="mt-1 block w-full text-left">
                  We perform:
                  <br />▶ Resource Planning
                  <br />▶ Crew Management
                  <br />▶ Cost &amp; Schedule Tracking
                  <br />▶ Performance Monitoring
                  <br />▶ Risk identification and management
                </span>
              </p>
            ),
          })}

          {cardShell('scan-bim', 'Scan-to-BIM', {
            media: (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-[#E4611F]/25" />
            ),
            title: <span className="block text-xl font-semibold text-white drop-shadow">Scan-to-BIM</span>,
            titleShiftClasses:
              'max-md:group-data-[expanded=true]:translate-y-[-10rem] md:group-hover:translate-y-[-11rem]',
            paragraph: (
              <p className="absolute inset-x-4 top-[7.5rem] max-h-0 overflow-hidden text-pretty opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out [transition-delay:0ms] max-md:group-data-[expanded=true]:max-h-[13rem] max-md:group-data-[expanded=true]:translate-y-0 max-md:group-data-[expanded=true]:opacity-100 max-md:group-data-[expanded=true]:[transition-delay:380ms] md:inset-x-8 md:top-[8.25rem] md:group-hover:max-h-[15rem] md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-hover:[transition-delay:380ms] text-[0.6875rem] leading-snug text-white/95 md:text-xs md:leading-snug translate-y-2">
                At Total Civil Construction, we use advanced Scan-to-BIM technology to connect the field with the office
                in real time, producing accurate as-built models that are continuously synchronized with our BIM systems to
                ensure full compliance with the design and tracking of progress in real time.
              </p>
            ),
          })}
        </div>

        <div className="mt-8">
          <RelatedProjectsSection />
        </div>
      </div>
    </div>
  )
}
