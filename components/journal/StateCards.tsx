import { Entry } from '@/types/index';
import moment from 'jalali-moment';

export default function StateCards({ entries }: { entries: Entry[] }) {
  // ماه و سال شمسی فعلی
  const currentMonth = moment().locale('fa').format('MM');
  const currentYear = moment().locale('fa').format('YYYY');

  // فیلتر یادداشت‌های این ماه شمسی
  const thisMonthEntries = entries.filter((entry) => {
    const entryDate = moment(entry.createdAt).locale('fa');
    return (
      entryDate.format('MM') === currentMonth &&
      entryDate.format('YYYY') === currentYear
    );
  });

  // میانگین امتیاز
  const avgScore =
    thisMonthEntries.length > 0
      ? (
          thisMonthEntries.reduce((sum, e) => sum + e.aiScore, 0) /
          thisMonthEntries.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="border-secondary-border bg-muted flex flex-1 flex-col items-center justify-center gap-4 rounded-md border p-4">
        <p className="text-muted-foreground text-center text-xs">
          روزهای ثبت شده
        </p>
        <p className="text-secondary text-2xl font-bold">
          {thisMonthEntries.length}
        </p>
        <p className="text-muted-foreground text-xs font-bold">این ماه</p>
      </div>
      <div className="border-secondary-border bg-muted flex flex-1 flex-col items-center justify-center gap-4 rounded-md border p-4">
        <p className="text-muted-foreground text-center text-xs">
          میانگین خوشحالی
        </p>
        <p className="text-succes text-2xl font-bold">{avgScore}</p>
        <p className="text-muted-foreground text-xs font-bold">از 10</p>
      </div>
    </div>
  );
}
