'use client';

import EntryForm from '@/components/journal/EntryForm';
import MoodSelector from '@/components/journal/MoodSelector';
import StateCards from '@/components/journal/StateCards';
import MoodChart from '@/components/journal/MoodChart';
import RecentEntries from '@/components/journal/RecentEntries';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { Entry } from '@/types/index';

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
  useEffect(() => {
    fetch('/api/entries')
      .then((response) => response.json())
      .then((data) => setEntries(data.entries ?? []));
  }, []);
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
        console.error('خطا:', data.error);
        alert(data.error); // موقتاً برای debug
        return;
      }

      setAiResult(data.aiResult);
      setIsLoading(false);
      setContent(''); // پاک کردن محتوای فرم بعد از ذخیره
      setMood('خوب'); // بازنشانی حالت احساسی به حالت پیش‌فرض
      setEntries((prevEntries) => [data.entry, ...prevEntries]); // اضافه کردن یادداشت جدید به لیست
    } catch (error) {
      console.error('خطا:', error);
      alert('خطا در ذخیره یادداشت'); // موقتاً برای debug
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-1 flex-col gap-2 rounded-md p-4">
      <Header onSave={handleSave} isLoading={isLoading} />
      <div className="flex flex-1 gap-2">
        <div className="flex flex-3 flex-col">
          <MoodSelector mood={mood} onMoodChange={setMood} />
          <EntryForm
            className="flex-1"
            content={content}
            onContentChange={setContent}
            aiResult={aiResult}
            isLoading={isLoading}
          />
        </div>
        <div className="bg-card flex flex-1 flex-col gap-8 rounded-md p-2">
          <StateCards entries={entries} />
          <MoodChart />
          <RecentEntries entries={entries} />
        </div>
      </div>
    </main>
  );
}
