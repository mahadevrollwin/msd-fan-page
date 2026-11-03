export default function Loading() {
  return (
    <main id="main" className="flex-1" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="h-3 w-32 bg-gold/25" />
        <div className="mt-6 h-20 max-w-xl bg-cream/10" />
        <div className="mt-6 h-6 max-w-md bg-cream/10" />
      </div>
    </main>
  );
}
