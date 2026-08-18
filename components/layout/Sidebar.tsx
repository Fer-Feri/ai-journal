'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemType =
  | { href: string; label: string; icon: string; divider?: never }
  | { divider: true; href?: never; label?: never; icon?: never };

const navItems: NavItemType[] = [
  { href: '/dashboard', label: 'امروز', icon: '✏️' },
  { href: '/dashboard/chart', label: 'نمودار', icon: '📈' },
  { href: '/dashboard/history', label: 'تاریخچه', icon: '🕐' },
  { divider: true },
  { href: '/dashboard/settings', label: 'تنظیمات', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const initial = firstName.charAt(0) ?? '؟';

  return (
    <aside className="border-border bg-card flex min-h-screen w-52 shrink-0 flex-col justify-between border-l px-3 py-6">
      <div className="flex flex-col gap-6">
        {/* لوگو */}
        <div className="text-foreground px-3 text-lg font-bold">
          Journal <span className="text-primary">AI</span>
        </div>

        {/* منو */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            // خط فاصله تنظیمات با بقیه
            if ('divider' in item)
              return (
                <div key={index} className="border-border my-1 border-t" />
              );
            // ----
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm no-underline transition-all duration-150 ${
                  isActive
                    ? 'border-border bg-muted text-foreground border font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent font-normal'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* کاربر */}
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="border-primary-border bg-primary-bg text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
          {initial}
        </div>
        <span className="text-muted-foreground text-sm">
          {firstName} {lastName}
        </span>
      </div>
    </aside>
  );
}
