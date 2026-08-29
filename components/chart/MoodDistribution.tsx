import { Entry } from '@/types/index';
import { getMoodEmoji } from '@/lib/mood';

type Props = { entries: Entry[] };

const moods = ['عالی', 'خوب', 'معمولی', 'بد'];

export default function MoodDistribution({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center text-sm">
        این ماه هنوز یادداشتی ثبت نشده
      </div>
    );
  }

  return (
    <div className="bg-card border-border rounded-xl border p-4">
      <p className="text-muted-foreground mb-4 text-xs">توزیع mood این ماه</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {moods.map((mood) => {
          const count = entries.filter((e) => e.mood === mood).length;
          const percent =
            entries.length > 0 ? Math.round((count / entries.length) * 100) : 0;
          return (
            <div
              key={mood}
              className="bg-muted border-border flex flex-col items-center gap-2 rounded-xl border p-3"
            >
              <span className="text-2xl">{getMoodEmoji(mood)}</span>
              <p className="text-muted-foreground text-xs">{mood}</p>
              <p className="text-primary text-lg font-bold">{percent}٪</p>
              <p className="text-muted-foreground text-xs">{count} روز</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


