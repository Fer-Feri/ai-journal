export default function StateCards() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="border-primary bg-muted flex flex-col items-center justify-center gap-4 rounded-md border p-4">
        <p className="text-muted-foreground text-center text-xs">
          روزهای ثبت شده
        </p>
        <p className="text-secondary text-2xl font-bold">21</p>
        <p className="text-muted-foreground text-xs font-bold">این ماه</p>
      </div>
      <div className="border-primary bg-muted flex flex-col items-center justify-center gap-4 rounded-md border p-4">
        <p className="text-muted-foreground text-center text-xs">
          میانگین خوشحالی
        </p>
        <p className="text-succes text-2xl font-bold">6.9</p>
        <p className="text-muted-foreground text-xs font-bold">از 10</p>
      </div>
    </div>
  );
}
