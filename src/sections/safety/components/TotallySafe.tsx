import ContactUsPillButton from '../../../shared/components/ContactUsPillButton'
import NavItemCaret from '../../../utils/icons/header/NavItemCaret'
import { SAFETY_TOTALLY_SAFE_CARD_IMAGES, SAFETY_TOTALLY_SAFE_MAIN_IMAGE } from '../hooks/useSafety'

function TotallySafeImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <img
        src={src}
        alt={alt}
        className="block h-auto w-full max-w-full shrink-0"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function CorePhilosophyCopy() {
  return (
    <>
      <p className="mb-4 text-center text-[1.2rem] font-semibold text-neutral-700 max-[950px]:text-left">Core Philosophy</p>
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
      <p className="mb-4 text-center text-[1.2rem] font-semibold text-neutral-700 max-[950px]:text-left">How We Apply It</p>
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
      <p className="mb-4 text-center text-[1.2rem] font-semibold text-neutral-700 max-[950px]:text-left">Safety Leadership</p>
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

const [card0, card1, card2] = SAFETY_TOTALLY_SAFE_CARD_IMAGES

export default function TotallySafe() {
  return (
    <div className="mt-16 text-left">
      <div className="grid grid-cols-1 gap-8 min-[951px]:grid-cols-[1fr_1.05fr]">
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

        <div className="min-w-0 overflow-hidden rounded-[2.2rem]">
          <img
            src={SAFETY_TOTALLY_SAFE_MAIN_IMAGE}
            alt="Totally Safe overview"
            className="block h-auto w-full max-w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Móvil: texto → imagen por bloque; Contact al final */}
      <div className="mt-8 flex flex-col gap-8 text-[1rem] leading-relaxed text-neutral-600 min-[951px]:hidden">
        <div>
          <CorePhilosophyCopy />
        </div>
        <TotallySafeImageCard src={card0.src} alt={card0.alt} />
        <div>
          <HowWeApplyCopy />
        </div>
        <TotallySafeImageCard src={card1.src} alt={card1.alt} />
        <div>
          <SafetyLeadershipCopy />
        </div>
        <TotallySafeImageCard src={card2.src} alt={card2.alt} />
        <ContactUsPillButton className="mt-2 self-center" />
      </div>

      {/* Escritorio: fila de 3 imágenes + 3 columnas de texto */}
      <div className="mt-8 hidden min-[951px]:block">
        <div className="grid grid-cols-3 gap-4">
          {SAFETY_TOTALLY_SAFE_CARD_IMAGES.map((item) => (
            <TotallySafeImageCard key={item.key} src={item.src} alt={item.alt} />
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
