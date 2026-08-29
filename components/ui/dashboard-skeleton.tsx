import { Skeleton } from './skeleton';

export default function DashboardSkeleton() {
  return (
    <main className="flex min-w-0 flex-1 flex-col gap-2 rounded-md px-2 py-2 sm:p-4">
      {/* Header skeleton */}
      <Skeleton className="h-16 w-full rounded-md" />

      <div className="flex min-h-0 flex-1 flex-col gap-2 lg:flex-row">
        {/* ستون چپ */}
        <div className="flex flex-3 flex-col gap-2">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="min-h-100 flex-1 rounded-md" />
        </div>

        {/* ستون راست */}
        <div className="flex flex-1 flex-col gap-4 p-2">
          <div className="flex gap-3">
            <Skeleton className="h-24 flex-1 rounded-md" />
            <Skeleton className="h-24 flex-1 rounded-md" />
          </div>
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>
      </div>
    </main>
  );
}
