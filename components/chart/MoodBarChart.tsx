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

type Props = {
  entries: Entry[];
  currentMonth: moment.Moment;
};

export default function MoodBarChart({ entries, currentMonth }: Props) {
  const daysInMonth = currentMonth.clone().locale('fa').daysInMonth();

  const data = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;

    const dateStr = currentMonth
      .clone()
      .locale('fa')
      .date(dayNum)
      .format('YYYY/MM/DD');

    const entry = entries.find(
      (e) => moment(e.createdAt).locale('fa').format('YYYY/MM/DD') === dateStr,
    );

    return {
      day: dayNum,
      score: entry?.aiScore ?? 0,
      hasEntry: !!entry,
    };
  });

  return (
    <div className="bg-card border-border flex flex-col gap-2 rounded-md border p-3 sm:p-4">
      <p className="text-muted-foreground text-xs sm:text-sm">
        نمودار روزانه این ماه
      </p>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 4, left: 4, bottom: 5 }}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10 }}
            interval={2}
            tickLine={false}
            axisLine={false}
          />

          <YAxis domain={[0, 10]} hide />

          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--foreground)',
              fontFamily: 'var(--font)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            labelStyle={{
              color: 'var(--foreground)',
              fontWeight: 500,
              marginBottom: '4px',
            }}
            itemStyle={{
              color: 'var(--muted-foreground)',
            }}
            formatter={(value) => [
              value === 0 ? 'ثبت نشده' : `${value} از ۱۰`,
              'امتیاز',
            ]}
            labelFormatter={(label) => `روز ${label}`}
          />

          <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={12}>
            {data.map((item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  item.hasEntry ? 'var(--primary)' : 'var(--muted-foreground)'
                }
                opacity={item.hasEntry ? 1 : 0.15}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
