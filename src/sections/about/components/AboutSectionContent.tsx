import Container from '../../../shared/components/Container'

export default function AboutSectionContent() {
  return (
    <div className="flex min-h-screen items-center bg-neutral-100 text-slate-900">
      <Container className="py-16">
        <h2 className="text-4xl font-semibold tracking-tight">About</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Placeholder de la sección. Aquí irá la historia / valores / experiencia con el estilo del diseño.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="h-64 rounded-3xl bg-slate-200" />
          <div className="h-64 rounded-3xl bg-slate-200" />
        </div>
      </Container>
    </div>
  )
}

