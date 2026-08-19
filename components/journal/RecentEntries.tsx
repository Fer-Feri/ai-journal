import { Badge } from '../ui/badge';

const fakeEntries = [
  {
    id: 1,
    mood: '😊',
    date: 'پنجشنبه، ۲۲ مرداد',
    text: 'جلسه خوبی داشتم...',
    badge: 'شاد',
  },
  {
    id: 2,
    mood: '😐',
    date: 'چهارشنبه، ۲۱ مرداد',
    text: 'روز معمولی بود...',
    badge: 'خنثی',
  },
  {
    id: 3,
    mood: '😔',
    date: 'سه‌شنبه، ۲۰ مرداد',
    text: 'کمی خسته بودم...',
    badge: 'ناراحت',
  },
  {
    id: 4,
    mood: '😊',
    date: 'چهارشنبه، ۲۰ مرداد',
    text: 'کمی خسته بودم...',
    badge: 'خوب',
  },
];

export default function RecentEntries() {
  return (
    <div className="border-primary-border no-scrollbar flex max-h-120 flex-col gap-4 overflow-y-auto rounded-md border px-2 py-4">
      <p className="text-muted-foreground text-xs">یادداشت‌های اخیر</p>
      {fakeEntries.slice(0, 7).map((item) => (
        <div
          key={item.id}
          className="bg-muted flex shrink-0 flex-col gap-6 rounded-md px-2 py-4"
        >
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-xs">{item.date}</p>
            <span>{item.mood}</span>
          </div>
          <p>{item.text}</p>
          <Badge>{item.badge}</Badge>
        </div>
      ))}
    </div>
  );
}
