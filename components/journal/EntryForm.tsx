'use client';
import { Textarea } from '../ui/textarea';

type Props = {
  className?: string;
  content: string;
  onContentChange: (content: string) => void;
  aiResult: { score: number; summary: string } | null;
  isLoading: boolean;
};

export default function EntryForm({
  className,
  content,
  onContentChange,
  aiResult,
  isLoading,
}: Props) {
  return (
    <div
      className={`bg-card flex flex-col gap-4 rounded-sm p-4 ${className ?? ''}`}
    >
      <p className="text-muted-foreground text-sm">یادداشت امروز</p>

      <Textarea
        value={content}
        onChange={(event) => onContentChange(event.target.value)}
        placeholder="امروز چه حسی داشتی؟ اینجا بنویس..."
        className="flex-1 resize-none"
      />

      {/* باکس نتیجه AI — فعلاً placeholder */}
      <div className="border-border bg-muted rounded-lg border p-4 text-sm">
        {isLoading ? (
          <span className="text-muted-foreground">⏳ در حال تحلیل...</span>
        ) : aiResult ? (
          <div className="flex flex-col gap-2">
            <span className="text-primary font-medium">
              ✨ {aiResult.summary}
            </span>
            <span className="text-succes text-sm">
              📜 امتیاز: {aiResult.score} از ۱۰
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">
            ✨ تحلیل AI اینجا نمایش داده می‌شه...
          </span>
        )}
      </div>
    </div>
  );
}
