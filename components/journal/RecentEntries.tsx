import moment from 'jalali-moment';
import { Badge } from '../ui/badge';
import { Entry } from '@/types/index';
import { getThisMonthEntries } from '@/lib/date';
import { getMoodEmoji } from '@/lib/mood';

export default function RecentEntries({ entries }: { entries: Entry[] }) {
  const thisMonthEntries = getThisMonthEntries(entries);

  return (
    <div className="border-primary-border no-scrollbar flex max-h-120 flex-col gap-4 overflow-y-auto rounded-md border px-2 py-4">
      <p className="text-muted-foreground text-xs">یادداشت‌های اخیر</p>
      {thisMonthEntries.slice(0, 7).map((entry) => {
        const entryDate = moment(entry.createdAt)
          .locale('fa')
          .format('dddd، D MMMM YYYY');
        return (
          <div
            key={entry.id}
            className="bg-muted flex shrink-0 flex-col gap-6 rounded-md px-2 py-4"
          >
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-xs">{entryDate}</p>
              <span>{getMoodEmoji(entry.mood)}</span>
            </div>
            <p className="line-clamp-4">{entry.content}</p>
            <Badge>{entry.mood}</Badge>
          </div>
        );
      })}
    </div>
  );
}
