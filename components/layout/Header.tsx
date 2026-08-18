export default function Header() {
  return (
    <header className="border-b-border bg-card flex h-16 items-center justify-between border-b px-6 py-4">
      {/* عنوان */}
      <div className="text-lg font-medium">
        <p>یادداشت امروز</p>
      </div>
      {/* 2 */}
      <div className="">
        <button className="">🌙/☀️</button>
        <button className="text-primary">ذخیره</button>
        <p className="text-muted-foreground text-sm">تاریخ امروز</p>
      </div>
    </header>
  );
}
