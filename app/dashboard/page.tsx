import EntryForm from '@/components/journal/EntryForm';
import MoodSelector from '@/components/journal/MoodSelector';

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-2 rounded-md p-4">
      <MoodSelector />
      <EntryForm className="flex-1" />
    </main>
  );
}
