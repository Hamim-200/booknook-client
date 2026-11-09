export default function LegalPage({ title, updated, children }) {
  return (
    <div className="container-page py-12">
      <article className="mx-auto max-w-3xl">
        <h1 className="section-title">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {updated}
        </p>
        <div className="mt-8 space-y-8 leading-relaxed text-muted-foreground">
          {children}
        </div>
      </article>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}