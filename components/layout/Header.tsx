'use client';

import { useTheme } from '@/lib/theme-context';
import moment from 'jalali-moment';

type Props = {
  onSave: () => void;
  isLoading: boolean;
};

export default function Header({ onSave, isLoading }: Props) {
  const date = moment().locale('fa').format('dddd، D MMMM YYYY');
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-border bg-card flex min-h-16 items-center justify-between rounded-md border-b px-3 py-2 sm:px-4 md:px-6">
      {/* عنوان و تاریخ */}
      <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-sm font-medium sm:text-base md:text-lg">
          یادداشت امروز
        </p>

        <p className="text-muted-foreground truncate text-[10px] sm:text-xs">
          {date}
        </p>
      </div>

      {/* اکشن‌ها */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="bg-primary border-border cursor-pointer rounded-lg border px-3 py-2 text-xs text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
        >
          {isLoading ? (
            <>
              <span className="sm:hidden">⏳</span>
              <span className="hidden sm:inline">⏳ در حال ذخیره‌سازی...</span>
            </>
          ) : (
            'ذخیره'
          )}
        </button>

        <button
          onClick={toggleTheme}
          aria-label="تغییر تم"
          className="text-muted-foreground hover:text-foreground border-border hover:bg-muted cursor-pointer rounded-lg border p-2 text-sm transition-all duration-150"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
