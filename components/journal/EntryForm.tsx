'use client';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

export default function EntryForm({ className }: { className?: string }) {
  const [content, setContent] = useState('');
  return (
    <div
      className={`bg-card flex flex-col gap-4 rounded-sm p-4 ${className ?? ''}`}
    >
      <p className="text-muted-foreground text-sm">یادداشت امروز</p>

      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="امروز چه حسی داشتی؟ اینجا بنویس..."
        className="flex-1 resize-none"
      />

      {/* باکس نتیجه AI — فعلاً placeholder */}
      <div className="border-border bg-muted rounded-lg border p-4 text-sm">
        <span className="text-muted-foreground">
          ✨ تحلیل AI اینجا نمایش داده می‌شه...
        </span>
      </div>
    </div>
  );
}
