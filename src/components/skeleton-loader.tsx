import { Skeleton } from '@/components/ui/skeleton';

export function ArticleSkeleton() {
  return (
    <div className="flex h-full max-h-[calc(100vh-5rem)] w-full flex-1 items-center justify-center">
      <article className="mx-auto flex h-full w-full items-center justify-center lg:max-w-[80rem]">
        <div className="flex h-full w-full flex-1 flex-col gap-8 px-4 py-6 lg:p-10">
          {/* Title */}
          <Skeleton className="h-9 w-3/4" />

          {/* Tags & Last Edited Section */}
          <section className="flex flex-col gap-2 border-b pb-6">
            {/* Tags */}
            <div className="flex items-center gap-2 text-sm">
              <div className="line flex w-28 items-center gap-2 py-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-7 w-16 rounded-md" />
                ))}
              </div>
            </div>

            {/* Last edited */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex w-28 items-center gap-2 py-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </section>

          {/* Content area */}
          <div className="flex flex-col gap-4 p-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      </article>
      <section className="h-full w-full max-w-xs border-l">
        <div className="flex flex-col gap-3 px-4 py-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
    </div>
  );
}
