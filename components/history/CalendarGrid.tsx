import moment from 'jalali-moment';
import { Entry } from '@/types/index';

type Props = {
  currentMonth: moment.Moment;
  entries: Entry[];
};

const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export default function CalendarGrid({ currentMonth, entries }: Props) {
  const today = moment().locale('fa').format('YYYY/MM/DD');

  // روزهایی که یادداشت دارن
  const entryDays = new Set(
    entries.map((e) => moment(e.createdAt).locale('fa').format('YYYY/MM/DD')),
  );

  // اول ماه شمسی
  const startOfMonth = currentMonth.clone().locale('fa').startOf('month');
  const daysInMonth = currentMonth.clone().locale('fa').daysInMonth();

  // چندم هفته شروع میشه (شنبه = 0)
  const startDayOfWeek = (startOfMonth.day() + 1) % 7;

  const cells: { day: number | null; dateStr: string }[] = [];

  // خانه‌های خالی اول
  for (let i = 0; i < startDayOfWeek; i++) {
    cells.push({ day: null, dateStr: '' });
  }

  // روزهای ماه
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = currentMonth
      .clone()
      .locale('fa')
      .date(d)
      .format('YYYY/MM/DD');
    cells.push({ day: d, dateStr });
  }

  return (
    <div className="bg-card border-border rounded-xl border p-4">
      {/* عناوین روزهای هفته */}
      <div className="mb-2 grid grid-cols-7 gap-1 rounded-md bg-[#722F99] p-3 text-xs sm:text-sm">
        {weekDays.map((d) => (
          <div
            key={d}
            className="py-1 text-center text-xs font-medium text-white"
          >
            {d}
          </div>
        ))}
      </div>

      {/* سل‌های روز */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell.day) return <div key={i} />;

          const isToday = cell.dateStr === today;
          const hasEntry = entryDays.has(cell.dateStr);

          return (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-lg text-xs font-medium transition-all ${isToday ? 'bg-secondary text-white' : ''} ${hasEntry && !isToday ? 'bg-primary text-white' : ''} ${!hasEntry && !isToday ? 'text-muted-foreground' : ''} `}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
