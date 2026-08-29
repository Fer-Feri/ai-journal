'use client';

import MoodBarChart from '@/components/chart/MoodBarChart';
import MoodDistribution from '@/components/chart/MoodDistribution';
import MoodState from '@/components/chart/MoodState';
import MonthNavigator from '@/components/history/MonthNavigator';
import PageSkeleton from '@/components/ui/page-skeleton';
import { Entry } from '@/types/index';
import moment from 'jalali-moment';
import { useEffect, useState } from 'react';

export default function ChartPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => moment());
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    fetch('/api/entries')
      .then((response) => response.json())
      .then((data) => {
        setEntries(data.entries ?? []);
        setIsPageLoading(false);
      });
  }, []);

  const goToPrevMonth = () =>
    setCurrentMonth((prev) => prev.clone().subtract(1, 'month'));
  const goToNextMonth = () =>
    setCurrentMonth((prev) => prev.clone().add(1, 'month'));

  const isCurrentMonth = currentMonth.isSame(moment(), 'month');

  const monthEntries = entries.filter((entry) => {
    const date = moment(entry.createdAt).locale('fa');

    return (
      date.format('MM') === currentMonth.locale('fa').format('MM') &&
      date.format('YYYY') === currentMonth.locale('fa').format('YYYY')
    );
  });

  if (isPageLoading) return <PageSkeleton hasChart />;

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <MonthNavigator
        title="نمودار احساسات"
        currentMonth={currentMonth}
        goToPrevMonth={goToPrevMonth}
        goToNextMonth={goToNextMonth}
        isCurrentMonth={isCurrentMonth}
        entryCount={monthEntries.length}
      />
      <MoodState entries={monthEntries} />
      <MoodBarChart entries={entries} currentMonth={currentMonth} />
      <MoodDistribution entries={entries} />
    </main>
  );
}
