import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { ClerkProvider } from '@clerk/nextjs';
import { clerkTheme } from '@/types/clerk-theme';

export const metadata: Metadata = {
  title: 'AI Journal',
  description: 'Smart diary with emotion analysis',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkTheme}>
      <html lang="fa" dir="rtl" suppressHydrationWarning>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
