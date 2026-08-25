import moment from 'jalali-moment';
import { Button } from '../ui/button';

type Props = {
  currentMonth: moment.Moment;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  isCurrentMonth: boolean;
};

export default function MonthNavigator({
  currentMonth,
  goToPrevMonth,
  goToNextMonth,
  isCurrentMonth,
}: Props) {
  const monthYearName = currentMonth.clone().locale('fa').format('MMMM YYYY');
  const monthName = currentMonth.clone().locale('fa').format('MMMM');
  return (
    <div className="bg-card border-border flex min-h-16 items-center justify-between gap-3 rounded-md border px-3 py-3 sm:px-4 md:px-6 md:py-2">
      {/* عنوان + اطلاعات ماه */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 sm:gap-6">
        <div className="text-sm font-medium sm:text-base md:text-lg">
          تاریخچه یادداشت‌ها
        </div>

        <div className="text-muted-foreground text-xs sm:text-sm">
          {monthYearName} - ۹ یادداشت
        </div>
      </div>

      {/* تغییر ماه */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          onClick={goToNextMonth}
          disabled={isCurrentMonth}
          type="button"
          variant="outline"
          className="border-border hover:bg-muted h-8 w-8 cursor-pointer p-0 sm:h-9 sm:w-9"
        >
          →
        </Button>

        <h2 className="min-w-16 text-center text-xs font-medium sm:min-w-20 sm:text-sm">
          {monthName}
        </h2>

        <Button
          type="button"
          variant="outline"
          onClick={goToPrevMonth}
          disabled={!isCurrentMonth}
          className="border-border hover:bg-muted h-8 w-8 cursor-pointer p-0 disabled:cursor-not-allowed disabled:opacity-30 sm:h-9 sm:w-9"
        >
          ←
        </Button>
      </div>
    </div>
  );
}
