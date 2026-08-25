'use client';

import CalendarGrid from '@/components/history/CalendarGrid';
import EntryList from '@/components/history/EntryList';
import MonthNavigator from '@/components/history/MonthNavigator';
import { Entry } from '@/types/index';
import moment from 'jalali-moment';
import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => moment());

  useEffect(() => {
    fetch('/api/entries')
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.entries ?? []);
      });
  }, []);

  const goToPrevMonth = () =>
    setCurrentMonth((prevMonth) => prevMonth.clone().subtract(1, 'month'));
  const goToNextMonth = () =>
    setCurrentMonth((prevMonth) => prevMonth.clone().add(1, 'month'));

  const isCurrentMonth = currentMonth.isSame(moment(), 'month');

  const monthEntries = entries.filter((entry) => {
    const date = moment(entry.createdAt).locale('fa');

    return (
      date.format('MM') === currentMonth.locale('fa').format('MM') &&
      date.format('YYYY') === currentMonth.locale('fa').format('YYYY')
    );
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <MonthNavigator
        currentMonth={currentMonth}
        goToPrevMonth={goToPrevMonth}
        goToNextMonth={goToNextMonth}
        isCurrentMonth={isCurrentMonth}
      />
      <CalendarGrid />
      <EntryList />
    </main>
  );
}
