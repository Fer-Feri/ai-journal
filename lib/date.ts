import moment from 'jalali-moment';

export function getThisMonthEntries<T extends { createdAt: string }>(
  entries: T[],
): T[] {
  const currentMonth = moment().locale('fa').format('MM');
  const currentYear = moment().locale('fa').format('YYYY');

  return entries.filter((entry) => {
    const d = moment(entry.createdAt).locale('fa');
    return d.format('MM') === currentMonth && d.format('YYYY') === currentYear;
  });
}

export function formatJalaliDate(date: string): string {
  return moment(date).locale('fa').format('dddd، D MMMM YYYY');
}
