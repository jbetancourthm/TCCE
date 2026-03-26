import Container from '../../../shared/components/Container'

export default function ContactSectionContent() {
  return (
    <div className="flex min-h-screen items-center bg-neutral-950 text-white">
      <Container className="py-16">
        <h2 className="text-4xl font-semibold tracking-tight">Contact Us</h2>
        <p className="mt-3 text-neutral-300">
          Aquí irá el formulario / datos de contacto. Por ahora es un placeholder para completar el scroll modular.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-12 rounded-xl bg-white/5" />
            <div className="h-12 rounded-xl bg-white/5" />
            <div className="h-12 rounded-xl bg-white/5 md:col-span-2" />
            <div className="h-32 rounded-xl bg-white/5 md:col-span-2" />
          </div>
          <div className="mt-6 h-11 w-40 rounded-xl bg-white/10" />
        </div>
      </Container>
    </div>
  )
}

