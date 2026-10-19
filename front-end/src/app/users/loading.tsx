export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-7 w-28 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl border bg-card p-4"
          >
            <div className="flex items-start gap-3">
              <div className="size-11 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="h-px w-full bg-border" />
            <div className="flex gap-2">
              <div className="h-7 flex-1 animate-pulse rounded-lg bg-muted" />
              <div className="size-7 animate-pulse rounded-lg bg-muted" />
              <div className="size-7 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
