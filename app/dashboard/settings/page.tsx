'use client';

import { useTheme } from '@/lib/theme-context';
import { SignOutButton, useUser } from '@clerk/nextjs';

export default function SettingsPage() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const email = user?.emailAddresses?.[0]?.emailAddress ?? '';
  const initial = firstName.charAt(0) || '؟';

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-4 p-3 sm:p-4 md:p-6">
      {/* هدر */}
      <header className="bg-card border-border flex min-h-16 items-center rounded-md border px-3 py-3 sm:px-4 md:px-6 md:py-2">
        <h1 className="text-sm font-medium sm:text-base md:text-lg">تنظیمات</h1>
      </header>

      {/* پروفایل */}
      <section className="bg-card border-border flex items-center gap-3 rounded-md border p-4 sm:gap-4">
        <div className="bg-primary-bg border-primary-border text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-lg font-bold">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium sm:text-base">
            {firstName} {lastName}
          </p>

          <p className="text-muted-foreground mt-1 truncate text-xs sm:text-sm">
            {email}
          </p>
        </div>
      </section>

      {/* ظاهر */}
      <section className="bg-card border-border rounded-md border">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">حالت تاریک</p>

            <p className="text-muted-foreground mt-1 text-xs">
              تغییر بین حالت روشن و تاریک
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="تغییر حالت تاریک"
            aria-pressed={theme === 'dark'}
            className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
              theme === 'dark' ? 'bg-primary' : 'bg-muted-foreground'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                theme === 'dark' ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </section>

      {/* خروج */}
      <section className="bg-card border-border overflow-hidden rounded-md border">
        <SignOutButton redirectUrl="/sign-in">
          <button
            type="button"
            className="text-destructive hover:bg-destructive/10 w-full cursor-pointer p-4 text-right text-sm font-medium transition-colors"
          >
            خروج از حساب کاربری
          </button>
        </SignOutButton>
      </section>
    </main>
  );
}
