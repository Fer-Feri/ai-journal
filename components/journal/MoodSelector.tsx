'use client';

import { useState } from 'react';

type MoodBtnType = { id: number; label: string; sticker: string };

const moodBtn: MoodBtnType[] = [
  { id: 1, label: 'خوب', sticker: '😊' },
  { id: 2, label: 'معمولی', sticker: '😐' },
  { id: 3, label: 'بد', sticker: '😔' },
  { id: 4, label: 'عالی', sticker: '🤩' },
];

export default function MoodSelector() {
  const [selectMood, setSelectMood] = useState<number | null>(null);
  return (
    <div className="flex flex-col justify-center gap-6">
      <p className="bg-primary w-max rounded-sm px-6 py-2 text-white">
        حال امروزت چطوره؟
      </p>
      <div className="flex items-center gap-2">
        {moodBtn.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSelectMood(btn.id)}
            className={`cursor-pointer rounded-sm px-4 py-2 ${selectMood === btn.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
          >
            {btn.label} {btn.sticker}
          </button>
        ))}
      </div>
    </div>
  );
}
