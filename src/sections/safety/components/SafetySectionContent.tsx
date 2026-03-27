import { useState } from 'react'
import Container from '../../../shared/components/Container'
import SafetyPlanning from '../safety-planning/SafetyPlanning'
import SafetyConstruction from '../safety-construction/SafetyConstruction'
import TotallySafe from '../totally-safe/TotallySafe'

export default function SafetySectionContent() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0)
  const pillTransform = activeTab === 0 ? 'translate-x-0' : activeTab === 1 ? 'translate-x-full' : 'translate-x-[200%]'

  return (
    <div className="bg-white text-neutral-700">
      <Container className="py-12 md:py-14">
        <div className="mx-auto w-[90%] text-left">
          <div className="flex items-center justify-start gap-3">
            <span className="h-[2px] w-12 bg-neutral-500/70" aria-hidden />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-600">Safety</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
            <div className="max-md:pl-0 md:pl-14">
              <h2 className="mt-8 mb-8 text-left text-4xl font-bold tracking-tight text-neutral-700 md:mt-14 md:mb-16">
                SAFETY
              </h2>
              <p className="mt-6 max-w-[24rem] text-left text-[1.35rem] font-semibold leading-[1.2] text-neutral-700 max-md:max-w-none md:mt-8 md:text-[1.75rem]">
                Safety is how we plan, communicate, and execute.
              </p>
            </div>

            <div className="text-[1.1rem] leading-relaxed text-neutral-600">
              <p>
                At Total Civil Construction &amp; Engineering, safety is fully integrated into every stage of our
                projects from early analysis and planning to field execution.
              </p>
              <div className="h-6" aria-hidden />
              <p>
                Our approach is structured, disciplined, and designed to provide certainty. We plan the work in detail,
                communicate it clearly with control, and take immediate action when conditions change.
              </p>
              <div className="h-6" aria-hidden />
              <p>
                Through this approach, we reduce risk, improve performance, and ensure consistent, safe execution across
                all operations.
              </p>
              <div className="h-6" aria-hidden />
              <p className="font-semibold text-neutral-700">
                Our goal is simple:
                <br />
                every employee goes home safe-every project, every day.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="relative mx-auto flex w-full max-w-full overflow-hidden rounded-xl bg-white ring-1 ring-[#E4611F]/40 md:inline-flex md:w-full md:max-w-[min(100%_58rem)]">
              <div
                aria-hidden
                className={`absolute top-0 bottom-0 left-0 w-1/3 rounded-xl bg-[#E4611F] transition-transform duration-500 ease-in-out ${pillTransform}`}
              />
              <button
                type="button"
                onClick={() => setActiveTab(0)}
                aria-pressed={activeTab === 0}
                className={
                  'relative z-10 w-1/3 rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold leading-snug transition-colors duration-300 max-md:text-balance md:whitespace-nowrap md:px-8 md:py-4 md:text-sm ' +
                  (activeTab === 0 ? 'text-white' : 'text-[#b37249]')
                }
              >
                Safety Planning
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                aria-pressed={activeTab === 1}
                className={
                  'relative z-10 w-1/3 rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold leading-snug transition-colors duration-300 max-md:text-balance md:whitespace-nowrap md:px-8 md:py-4 md:text-sm ' +
                  (activeTab === 1 ? 'text-white' : 'text-[#b37249]')
                }
              >
                Safety Construction
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(2)}
                aria-pressed={activeTab === 2}
                className={
                  'relative z-10 w-1/3 rounded-xl px-2 py-2.5 text-[0.6875rem] font-semibold leading-snug transition-colors duration-300 max-md:text-balance md:whitespace-nowrap md:px-8 md:py-4 md:text-sm ' +
                  (activeTab === 2 ? 'text-white' : 'text-[#b37249]')
                }
              >
                Totally Safe
              </button>
            </div>
          </div>

          {activeTab === 0 ? <SafetyPlanning /> : null}
          {activeTab === 1 ? <SafetyConstruction /> : null}
          {activeTab === 2 ? <TotallySafe /> : null}
        </div>
      </Container>
    </div>
  )
}

