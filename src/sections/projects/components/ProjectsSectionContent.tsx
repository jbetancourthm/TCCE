import Container from '../../../shared/components/Container'

export default function ProjectsSectionContent() {
  return (
    <div className="flex min-h-screen items-center bg-neutral-50 text-slate-900">
      <Container className="py-16">
        <h2 className="text-4xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Placeholder. En los próximos pasos conectamos esta sección con el grid de “cards” del diseño.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="h-56 rounded-3xl bg-slate-200" />
          <div className="h-56 rounded-3xl bg-slate-200" />
        </div>
      </Container>
    </div>
  )
}

