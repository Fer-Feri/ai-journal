import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import { ClerkProvider } from '@clerk/nextjs';
import { clerkTheme } from '@/types/clerk-theme';
import { Toaster } from '@/components/ui/sonner';

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
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              classNames: {
                toast: 'font-sans border-border bg-secondary text-foreground',
                title: 'font-medium',
                description: 'text-muted-foreground',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
