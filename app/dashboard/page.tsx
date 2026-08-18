import Header from '@/components/layout/Header';

export default function DashboardPage() {
  return (
    <main className="flex flex-col p-8">
      <Header />
      <h1 style={{ color: 'var(--primary)' }}>داشبورد ✨</h1>
    </main>
  );
}
