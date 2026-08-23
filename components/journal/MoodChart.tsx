'use client';

import { Entry } from '@/types/index';
import moment from 'jalali-moment';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = { entries: Entry[] };

const colors = [
  'var(--primary)',
  'var(--secondary)',
  'var(--accent)',
  '#8b5cf6',
  '#f43f5e',
  '#14b8a6',
  '#f59e0b',
];

const dayNames: Record<string, string> = {
  Saturday: 'شنبه',
  Sunday: 'یکشنبه',
  Monday: 'دوشنبه',
  Tuesday: 'سه‌شنبه',
  Wednesday: 'چهارشنبه',
  Thursday: 'پنجشنبه',
  Friday: 'جمعه',
};

const shortDay: Record<string, string> = {
  Saturday: 'ش',
  Sunday: 'ی',
  Monday: 'د',
  Tuesday: 'س',
  Wednesday: 'چ',
  Thursday: 'پ',
  Friday: 'ج',
};

export default function MoodChart({ entries }: Props) {
  // ۷ روز اخیر رو بساز
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = moment().subtract(i, 'days');
    const dayKey = date.format('dddd'); // Saturday, Sunday...
    return {
      dateStr: date.format('YYYY-MM-DD'),
      day: dayNames[dayKey] ?? dayKey,
      shortDay: shortDay[dayKey] ?? '?',
      score: 0,
    };
  }).reverse();

  // یادداشت‌ها رو روی روزها map کن
  const data = last7Days.map((day) => {
    const entry = entries.find((e) => {
      const entryDate = moment(e.createdAt).format('YYYY-MM-DD');
      return entryDate === day.dateStr;
    });
    return {
      ...day,
      score: entry?.aiScore ?? 0,
    };
  });

  return (
    <div className="bg-muted border-border flex flex-col gap-2 rounded-md border p-2">
      <p className="text-muted-foreground text-xs">روند ۷ روز اخیر</p>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={data}>
          <XAxis dataKey="shortDay" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 10]} hide />
          <Tooltip
            formatter={(value) => [
              value === 0 ? 'ثبت نشده' : `${value}`,
              'امتیاز',
            ]}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.day ?? ''}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  item.score === 0
                    ? 'var(--muted-foreground)'
                    : colors[index % colors.length]
                }
                opacity={item.score === 0 ? 0.3 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
