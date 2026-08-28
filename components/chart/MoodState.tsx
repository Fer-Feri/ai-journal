import { Entry } from '@/types/index';

export default function MoodState({ entries }: { entries: Entry[] }) {
  const avg =
    entries.length > 0
      ? (entries.reduce((s, e) => s + e.aiScore, 0) / entries.length).toFixed(1)
      : '—';

  const best =
    entries.length > 0
      ? Math.max(...entries.map((e) => e.aiScore)).toFixed(1)
      : '—';

  const worst =
    entries.length > 0
      ? Math.min(...entries.map((e) => e.aiScore)).toFixed(1)
      : '—';

  const stats = [
    { label: 'میانگین خوشحالی', value: avg, color: 'text-primary' },
    { label: 'بهترین روز', value: best, color: 'text-success' },
    { label: 'بدترین روز', value: worst, color: 'text-destructive' },
    {
      label: 'روزهای ثبت‌شده',
      value: entries.length.toString(),
      color: 'text-secondary',
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((state) => (
        <div
          key={state.label}
          className="bg-card border-border flex flex-col gap-2 rounded-xl border p-4"
        >
          <p className="text-muted-foreground text-xs">{state.label}</p>
          <p className={`text-2xl font-bold ${state.color}`}>{state.value}</p>
        </div>
      ))}
    </div>
  );
}
