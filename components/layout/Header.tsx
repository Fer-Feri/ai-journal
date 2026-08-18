'use client';

import { useTheme } from '@/lib/theme-context';
import moment from 'jalali-moment';
import { useState } from 'react';

export default function Header() {
  const [date, setDate] = useState(() =>
    moment().locale('fa').format('dddd، D MMMM YYYY'),
  );
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b-border bg-card flex h-16 items-center justify-between rounded-md border-b px-6 py-2">
      {/* عنوان */}
      <div className="flex items-center justify-center gap-4">
        <p className="text-lg font-medium">یادداشت امروز</p>
        <p className="text-muted-foreground text-xs">{date}</p>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-4">
        <button className="border-border bg-primary font-ring cursor-pointer rounded-lg border px-4 py-2 text-sm text-white">
          ذخیره
        </button>
        <button
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground border-border hover:bg-muted cursor-pointer rounded-lg border p-2 text-sm transition-all duration-150"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
