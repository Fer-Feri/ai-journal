"use client';";

import EntryForm from '@/components/journal/EntryForm';
import MoodSelector from '@/components/journal/MoodSelector';
import StateCards from '@/components/journal/StateCards';
import MoodChart from '@/components/journal/MoodChart';
import RecentEntries from '@/components/journal/RecentEntries';
import { useState } from 'react';

export default function DashboardPage() {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('خوب');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    score: number;
    summary: string;
  } | null>(null);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsLoading(true);

    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, mood }),
    });

    const data = await response.json();
    setAiResult(data.aiResult);
    setIsLoading(false);
  };
  return (
    <main className="flex flex-1 gap-2 rounded-md p-4">
      <div className="flex flex-3 flex-col">
        <MoodSelector />
        <EntryForm className="flex-1" />
      </div>
      <div className="bg-card flex flex-1 flex-col gap-8 rounded-md p-2">
        <StateCards />
        <MoodChart />
        <RecentEntries />
      </div>
    </main>
  );
}
