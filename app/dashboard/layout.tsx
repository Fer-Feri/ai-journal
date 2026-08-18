import Header from '@/components/layout/Header';
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
      <div className="flex flex-1 flex-col p-2">
        <Header />
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
}
