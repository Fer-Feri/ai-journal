import moment from 'jalali-moment';
import { Badge } from '../ui/badge';
import { Entry } from '@/types/index';

// const fakeEntries = [
//   {
//     id: 1,
//     mood: '😊',
//     date: 'پنجشنبه، ۲۲ مرداد',
//     text: 'جلسه خوبی داشتم...',
//     badge: 'شاد',
//   },
//   {
//     id: 2,
//     mood: '😐',
//     date: 'چهارشنبه، ۲۱ مرداد',
//     text: 'روز معمولی بود...',
//     badge: 'خنثی',
//   },
//   {
//     id: 3,
//     mood: '😔',
//     date: 'سه‌شنبه، ۲۰ مرداد',
//     text: 'کمی خسته بودم...',
//     badge: 'ناراحت',
//   },
//   {
//     id: 4,
//     mood: '😊',
//     date: 'چهارشنبه، ۲۰ مرداد',
//     text: 'کمی خسته بودم...',
//     badge: 'خوب',
//   },
// ];

export default function RecentEntries({ entries }: { entries: Entry[] }) {
  // ماه و سال شمسی فعلی
  const currentMonth = moment().locale('fa').format('MM');
  const currentYear = moment().locale('fa').format('YYYY');

  // فیلتر یادداشت‌های این ماه شمسی
  const thisMonthEntries = entries.filter((entry) => {
    const entryDate = moment(entry.createdAt).locale('fa');
    return (
      entryDate.format('MM') === currentMonth &&
      entryDate.format('YYYY') === currentYear
    );
  });
  return (
    <div className="border-primary-border no-scrollbar flex max-h-120 flex-col gap-4 overflow-y-auto rounded-md border px-2 py-4">
      <p className="text-muted-foreground text-xs">یادداشت‌های اخیر</p>
      {thisMonthEntries.slice(0, 7).map((entry) => {
        const entryDate = moment(entry.createdAt)
          .locale('fa')
          .format('dddd، D MMMM YYYY');
        return (
          <div
            key={entry.id}
            className="bg-muted flex shrink-0 flex-col gap-6 rounded-md px-2 py-4"
          >
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-xs">{entryDate}</p>
              <span className="text-muted-foreground text-xs">
                {entry.mood}
              </span>
            </div>
            <p>{entry.content}</p>
            <Badge>{entry.mood}</Badge>
          </div>
        );
      })}
    </div>
  );
}
