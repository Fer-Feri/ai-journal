import { Skeleton } from './skeleton';

type Props = {
  hasCalendar?: boolean;
  hasChart?: boolean;
  hasSettings?: boolean;
};

export default function PageSkeleton({
  hasCalendar,
  hasChart,
  hasSettings,
}: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      {/* Navigator / Header */}
      <Skeleton className="h-16 w-full rounded-md" />

      {hasSettings ? (
        <>
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </>
      ) : hasCalendar ? (
        <>
          <Skeleton className="h-64 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
        </>
      ) : hasChart ? (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-52 w-full rounded-md" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-md" />
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
