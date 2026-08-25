import { Entry } from '@/types/index';
import { getMoodEmoji } from '@/lib/mood';
import { formatJalaliDate } from '@/lib/date';
import { Badge } from '@/components/ui/badge';

type Props = {
  entries: Entry[];
};

export default function EntryList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="border-border bg-card text-muted-foreground rounded-xl border px-4 py-10 text-center text-sm">
        هنوز در این ماه یادداشتی ثبت نشده است
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* عنوان */}
      <div className="flex items-center justify-between px-1">
        <p className="text-foreground text-sm font-medium">
          یادداشت‌های این ماه
        </p>

        <span className="text-muted-foreground text-xs">
          {entries.length} یادداشت
        </span>
      </div>

      {/* لیست */}
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="group border-border bg-card hover:border-primary-border flex min-w-0 gap-3 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:gap-4 sm:p-4"
          >
            {/* Emoji */}
            <div className="bg-primary-bg border-primary-border text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl sm:h-11 sm:w-11">
              {getMoodEmoji(entry.mood)}
            </div>

            {/* محتوا */}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {/* Header کارت */}
              <div className="flex min-w-0 items-center justify-between gap-3">
                <span className="text-muted-foreground truncate text-[11px] sm:text-xs">
                  {formatJalaliDate(entry.createdAt)}
                </span>

                <Badge
                  variant="outline"
                  className="border-primary-border bg-primary-bg text-primary shrink-0 text-[10px] sm:text-xs"
                >
                  {entry.aiScore} از ۱۰
                </Badge>
              </div>

              {/* متن */}
              <p className="text-foreground line-clamp-3 text-sm leading-6 wrap-break-word">
                {entry.content}
              </p>

              {/* خلاصه AI */}
              {entry.aiSummary && (
                <div className="border-primary-border bg-primary-bg rounded-lg border px-3 py-2">
                  <p className="text-primary text-xs leading-5">
                    ✨ {entry.aiSummary}
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
