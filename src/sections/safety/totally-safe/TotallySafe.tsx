import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import NavItemCaret from '../../../utils/icons/header/NavItemCaret'

const topCards = [
  {
    key: 'core-philosophy',
    title: 'Core Philosophy',
    text: 'A safety-first mindset shapes every decision before, during, and after execution.',
  },
  {
    key: 'how-we-apply-it',
    title: 'How We Apply It',
    text: 'Clear actions and real-time communication keep teams aligned whenever conditions change.',
  },
  {
    key: 'safety-leadership',
    title: 'Safety Leadership',
    text: 'Leadership in the field means accountability, participation, and immediate response.',
  },
] as const

function TotallySafeImageCard({ card }: { card: (typeof topCards)[number] }) {
  return (
    <div className="group relative h-56 overflow-hidden rounded-[2rem] border border-neutral-400/70 bg-neutral-100">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-5 px-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm font-semibold text-white">{card.text}</p>
      </div>
    </div>
  )
}

function CorePhilosophyCopy() {
  return (
    <>
      <p className="mb-4 text-center text-[1.2rem] font-semibold text-neutral-700 max-md:text-left">Core Philosophy</p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Plan the work</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Communicate the plan</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Execute only the plan</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Stop if conditions change</span>
      </p>
    </>
  )
}

function HowWeApplyCopy() {
  return (
    <>
      <p className="mb-4 text-center text-[1.2rem] font-semibold text-neutral-700 max-md:text-left">How We Apply It</p>
      <p className="mt-3">When a change occurs, our teams follow a clear and disciplined process:</p>
      <div className="h-4" aria-hidden />
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Stop work immediately</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Escalate to jobsite leadership</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Re-evaluate conditions and revise the plan</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Re-communicate the updated plan</span>
      </p>
      <p className="mt-[0.4rem] flex items-start gap-1.5">
        <NavItemCaret className="mt-[0.15rem] h-4 w-4 shrink-0 -rotate-90 text-[#E4611F]" />
        <span>Execute only once alignment is re-established</span>
      </p>
    </>
  )
}

function SafetyLeadershipCopy() {
  return (
    <>
      <p className="mb-4 text-center text-[1.2rem] font-semibold text-neutral-700 max-md:text-left">Safety Leadership</p>
      <p className="mt-3">Safety is a shared responsibility.</p>
      <div className="h-6" aria-hidden />
      <p>
        Every team member is empowered to speak up, raise concerns, and stop work when needed. Strong safety
        performance depends on active participation, accountability, and leadership at all levels.
      </p>
      <div className="h-6" aria-hidden />
      <p className="font-semibold text-neutral-700">
        Totally Safe is how we deliver work with clarity, discipline, and control.
      </p>
    </>
  )
}

export default function TotallySafe() {
  return (
    <div className="mt-16 text-left">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.05fr]">
        <div>
          <h3 className="mb-6 text-4xl font-bold tracking-tight text-neutral-700">Totally Safe</h3>
          <p className="mt-3 text-[2.2rem] leading-tight text-neutral-600">A Mindset That Defines How We Work.</p>

          <div className="mt-8 text-[1rem] leading-relaxed text-neutral-600">
            <p>Totally Safe is more than a safety program it is the way we think, plan, communicate, and execute every task.</p>
            <div className="h-6" aria-hidden />
            <p>
              It defines how our teams operate in the field and empowers every individual to take ownership of safety and
              act when something is not aligned with the plan.
            </p>
          </div>
        </div>

        <div className="h-[25rem] rounded-[2.2rem] border border-neutral-400/70 bg-neutral-100" />
      </div>

      {/* Móvil: texto → imagen por bloque; Contact al final */}
      <div className="mt-8 flex flex-col gap-8 text-[1rem] leading-relaxed text-neutral-600 md:hidden">
        <div>
          <CorePhilosophyCopy />
        </div>
        <TotallySafeImageCard card={topCards[0]} />
        <div>
          <HowWeApplyCopy />
        </div>
        <TotallySafeImageCard card={topCards[1]} />
        <div>
          <SafetyLeadershipCopy />
        </div>
        <TotallySafeImageCard card={topCards[2]} />
        <ContactUsPillButton className="mt-2 self-start" />
      </div>

      {/* Escritorio: fila de 3 imágenes + 3 columnas de texto */}
      <div className="mt-8 hidden md:block">
        <div className="grid grid-cols-3 gap-4">
          {topCards.map((card) => (
            <TotallySafeImageCard key={card.key} card={card} />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-10 text-[1rem] leading-relaxed text-neutral-600">
          <div>
            <CorePhilosophyCopy />
            <ContactUsPillButton className="mt-8" />
          </div>

          <div>
            <HowWeApplyCopy />
          </div>

          <div>
            <SafetyLeadershipCopy />
          </div>
        </div>
      </div>
    </div>
  )
}
