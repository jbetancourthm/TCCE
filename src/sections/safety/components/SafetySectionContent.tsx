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
        <div className="mx-auto w-[90%]">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-neutral-500/70" aria-hidden />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-600">Safety</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
            <div className="pl-14">
              <h2 className="mt-14 mb-16 text-4xl font-bold tracking-tight text-neutral-700">SAFETY</h2>
              <p className="mt-8 max-w-[24rem] text-[1.75rem] font-semibold leading-[1.2] text-neutral-700">
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

          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="relative inline-flex w-full max-w-[58rem] overflow-hidden rounded-xl border border-[#E4611F]/40 bg-white">
              <span
                aria-hidden
                className={`absolute inset-y-0 left-0 w-1/3 rounded-xl bg-[#E4611F] transition-transform duration-500 ease-in-out ${pillTransform}`}
              />
              <button
                type="button"
                onClick={() => setActiveTab(0)}
                aria-pressed={activeTab === 0}
                className={`relative z-10 w-1/3 px-8 py-4 text-sm font-semibold transition-colors duration-300 ${activeTab === 0 ? 'text-white' : 'text-[#b37249]'}`}
              >
                Safety Planning
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                aria-pressed={activeTab === 1}
                className={`relative z-10 w-1/3 border-l border-[#E4611F]/40 px-8 py-4 text-sm font-semibold transition-colors duration-300 ${activeTab === 1 ? 'text-white' : 'text-[#b37249]'}`}
              >
                Safety Construction
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(2)}
                aria-pressed={activeTab === 2}
                className={`relative z-10 w-1/3 border-l border-[#E4611F]/40 px-8 py-4 text-sm font-semibold transition-colors duration-300 ${activeTab === 2 ? 'text-white' : 'text-[#b37249]'}`}
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

