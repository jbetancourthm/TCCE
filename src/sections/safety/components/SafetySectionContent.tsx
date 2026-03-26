import Container from '../../../shared/components/Container'

export default function SafetySectionContent() {
  return (
    <div className="flex min-h-screen items-center bg-neutral-950 text-white">
      <Container className="py-16">
        <h2 className="text-4xl font-semibold tracking-tight">Safety</h2>
        <p className="mt-3 max-w-2xl text-neutral-300">
          Placeholder modular para políticas y enfoque de seguridad. Lo conectaremos al diseño cuando nos confirmes la sección exacta.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-24 rounded-2xl bg-white/5" />
          <div className="h-24 rounded-2xl bg-white/5" />
          <div className="h-24 rounded-2xl bg-white/5" />
        </div>
      </Container>
    </div>
  )
}

