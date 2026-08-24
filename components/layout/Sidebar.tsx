'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavItemType =
  | {
      href: string;
      label: string;
      icon: string;
      divider?: never;
    }
  | {
      divider: true;
      href?: never;
      label?: never;
      icon?: never;
    };

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

  const [isOpen, setIsOpen] = useState(false);

  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const initial = firstName.charAt(0) || '؟';

  return (
    <aside
      className={`border-border bg-card flex min-h-screen shrink-0 flex-col justify-between border-l px-2 py-6 transition-[width] duration-300 ease-in-out ${isOpen ? 'w-52' : 'w-16'} `}
    >
      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="text-foreground flex h-10 w-full cursor-pointer items-center rounded-lg px-2"
        >
          {isOpen ? (
            <Image
              src="/icons/close-menu.png"
              alt="AI Journal"
              width={40}
              height={40}
              className="h-4 w-4 shrink-0"
            />
          ) : (
            <Image
              src="/icons/menu.png"
              alt="AI Journal"
              width={40}
              height={40}
              className="h-7 w-7 shrink-0"
            />
          )}

          <span
            className={`overflow-hidden text-lg font-bold whitespace-nowrap transition-all duration-200 ${isOpen ? 'mr-3 max-w-24 opacity-100' : 'max-w-0 opacity-0'} `}
          >
            Journal <span className="text-primary">AI</span>
          </span>
        </button>

        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            if ('divider' in item) {
              return (
                <div key={index} className="border-border my-1 border-t" />
              );
            }

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-11 items-center rounded-lg transition-all duration-150 ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} ${
                  isActive
                    ? 'border-border bg-muted text-foreground border font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
                } `}
              >
                <span className="flex w-7 shrink-0 items-center justify-center text-base">
                  {item.icon}
                </span>

                <span
                  className={`overflow-hidden text-sm whitespace-nowrap transition-all duration-200 ${
                    isOpen ? 'max-w-24 opacity-100' : 'max-w-0 opacity-0'
                  } `}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`flex items-center rounded-lg py-2 ${isOpen ? 'gap-3 px-2' : 'justify-center px-0'} `}
      >
        <div className="border-primary-border bg-primary-bg text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
          {initial}
        </div>

        <span
          className={`text-muted-foreground overflow-hidden text-sm whitespace-nowrap transition-all duration-200 ${
            isOpen ? 'max-w-32 opacity-100' : 'max-w-0 opacity-0'
          } `}
        >
          {firstName} {lastName}
        </span>
      </div>
    </aside>
  );
}
