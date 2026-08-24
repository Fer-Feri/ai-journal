'use client';

import EntryForm from '@/components/journal/EntryForm';
import MoodSelector from '@/components/journal/MoodSelector';
import StateCards from '@/components/journal/StateCards';
import MoodChart from '@/components/journal/MoodChart';
import RecentEntries from '@/components/journal/RecentEntries';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { Entry } from '@/types/index';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('خوب');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    score: number;
    summary: string;
  } | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);

  // ================================
  // ================================
  useEffect(() => {
    fetch('/api/entries')
      .then((response) => response.json())
      .then((data) => {
        const allEntries: Entry[] = data.entries ?? [];
        setEntries(allEntries);

        // یادداشت امروز
        const today = new Date().toDateString();
        const todayEntry = allEntries.find(
          (e) => new Date(e.createdAt).toDateString() === today,
        );

        if (todayEntry) {
          setContent(todayEntry.content);
          setMood(todayEntry.mood);
          setAiResult({
            score: todayEntry.aiScore,
            summary: todayEntry.aiSummary,
          });
        }
      });
  }, []);
  // ================================
  // ================================
  const handleSave = async () => {
    if (!content.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, mood }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'خطا در ذخیره یادداشت');
        return;
      }

      setAiResult(data.aiResult);
      setIsLoading(false);
      setContent(''); // پاک کردن محتوای فرم بعد از ذخیره
      setMood('خوب'); // بازنشانی حالت احساسی به حالت پیش‌فرض
      setEntries((prevEntries) => [data.entry, ...prevEntries]); // اضافه کردن یادداشت جدید به لیست
      toast.success('یادداشت با موفقیت ذخیره شد');
    } catch (error) {
      console.error('خطا:', error);
      toast.error('خطا در ذخیره یادداشت'); // موقتاً برای debug
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex min-w-0 flex-1 flex-col gap-2 rounded-md px-2 py-2 sm:p-4">
      <Header onSave={handleSave} isLoading={isLoading} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-3 flex-col">
          <MoodSelector mood={mood} onMoodChange={setMood} />
          <EntryForm
            className="min-h-100 w-full min-w-0 flex-1"
            content={content}
            onContentChange={setContent}
            aiResult={aiResult}
            isLoading={isLoading}
          />
        </div>
        <div className="bg-card flex min-w-0 flex-1 flex-col gap-8 rounded-md p-2">
          <StateCards entries={entries} />
          <MoodChart entries={entries} />
          <RecentEntries entries={entries} />
        </div>
      </div>
    </main>
  );
}
