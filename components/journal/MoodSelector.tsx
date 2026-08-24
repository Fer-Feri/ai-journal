'use client';

type MoodBtnType = { id: number; label: string; sticker: string };

const moodBtn: MoodBtnType[] = [
  { id: 1, label: 'خوب', sticker: '😊' },
  { id: 2, label: 'معمولی', sticker: '😐' },
  { id: 3, label: 'بد', sticker: '😔' },
  { id: 4, label: 'عالی', sticker: '🤩' },
];

type Props = {
  mood: string;
  onMoodChange: (mood: string) => void;
};

export default function MoodSelector({ mood, onMoodChange }: Props) {
  return (
    <div className="bg-card flex w-full min-w-0 flex-col gap-4 rounded-sm p-3 sm:gap-6 sm:p-4">
      <p className="bg-primary w-fit rounded-sm px-4 py-2 text-sm text-white sm:px-6">
        حال امروزت چطوره؟
      </p>
      <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:flex sm:items-center">
        {moodBtn.map((btn) => (
          <button
            key={btn.id}
            onClick={() => onMoodChange(btn.label)}
            className={`flex min-w-0 items-center justify-center gap-1.5 rounded-sm px-2 py-2 text-sm transition-colors sm:px-4 ${
              mood === btn.label
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {btn.label} {btn.sticker}
          </button>
        ))}
      </div>
    </div>
  );
}
