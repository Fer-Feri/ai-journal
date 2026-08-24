import CalendarGrid from '@/components/history/CalendarGrid';
import EntryList from '@/components/history/EntryList';
import MonthNavigator from '@/components/history/MonthNavigator';

export default function HistoryPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <MonthNavigator />
      <CalendarGrid />
      <EntryList />
    </main>
  );
}
