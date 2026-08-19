'use client';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { day: 'شنبه', shortDay: 'ش', score: 6 },
  { day: 'یکشنبه', shortDay: 'ی', score: 8 },
  { day: 'دوشنبه', shortDay: 'د', score: 5 },
  { day: 'سه‌شنبه', shortDay: 'س', score: 9 },
  { day: 'چهارشنبه', shortDay: 'چ', score: 7 },
  { day: 'پنجشنبه', shortDay: 'پ', score: 8 },
  { day: 'جمعه', shortDay: 'ج', score: 7.5 },
];

const colors = [
  'var(--primary)',
  'var(--secondary)',
  'var(--accent)',
  'var(--success)',
  '#8b5cf6',
  '#f43f5e',
  '#14b8a6',
];

export default function MoodChart() {
  return (
    <div className="bg-muted border-secondary-bg text-primary flex flex-col gap-2 rounded-md border p-2">
      <p className="text-muted-foreground text-xs">روند ۷ روز اخیر</p>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={data}>
          <XAxis dataKey="shortDay" />
          <YAxis domain={[0, 10]} hide />
          <Tooltip
            formatter={(value) => [`${value}`, 'امتیاز']}
            labelFormatter={(label, payload) => {
              return payload?.[0]?.payload?.day ?? label;
            }}
          />
          <Bar dataKey="score">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
