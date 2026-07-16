export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <span className="sr-only">Chargement… Loading…</span>
      <div className="mx-auto max-w-7xl animate-pulse space-y-8" aria-hidden="true">
        <div className="h-3 w-28 rounded bg-muted" />
        <div className="h-20 max-w-3xl rounded bg-muted sm:h-28" />
        <div className="h-5 max-w-2xl rounded bg-muted" />
        <div className="grid gap-5 pt-8 md:grid-cols-3">
          <div className="h-44 rounded-xl bg-muted" />
          <div className="h-44 rounded-xl bg-muted" />
          <div className="h-44 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
