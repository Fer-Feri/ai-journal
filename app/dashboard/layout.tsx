import Siderar from '@/components/layout/Sidebar';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'AI Journal Dashboard',
  description: 'Ai Journal Dashboard',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  return (
    <div className="flex min-h-screen">
      <Siderar />
      {/* <Header /> */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-w-0 flex-1">{children}</div>
      </main>
    </div>
  );
}
