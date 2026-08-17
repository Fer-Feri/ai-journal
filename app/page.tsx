'use client';
import { useTheme } from '@/lib/theme-context';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
        AI Journal
      </h1>
      <p style={{ color: 'var(--muted-foreground)' }}>تم فعلی: {theme}</p>
      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          تغییر تم
        </button>
        <button
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: 'var(--secondary)', color: '#fff' }}
        >
          دکمه نارنجی
        </button>
      </div>
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <p className="text-sm" style={{ color: 'var(--card-foreground)' }}>
          این یه کارت تسته
        </p>
      </div>
    </main>
  );
}
