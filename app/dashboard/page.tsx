import EntryForm from '@/components/journal/EntryForm';
import MoodSelector from '@/components/journal/MoodSelector';
import StateCards from '@/components/journal/StateCards';
import MoodChart from '@/components/journal/MoodChart';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 gap-2 rounded-md p-4">
      <div className="flex flex-3 flex-col">
        <MoodSelector />
        <EntryForm className="flex-1" />
      </div>
      <div className="bg-card flex flex-1 flex-col gap-8 rounded-md p-2">
        <StateCards />
        <MoodChart />
      </div>
    </main>
  );
}
