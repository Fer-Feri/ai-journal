export const moodMap: Record<string, { emoji: string; label: string }> = {
  خوب: { emoji: '😊', label: 'خوب' },
  معمولی: { emoji: '😐', label: 'معمولی' },
  بد: { emoji: '😔', label: 'بد' },
  عالی: { emoji: '🤩', label: 'عالی' },
};

export function getMoodEmoji(mood: string): string {
  return moodMap[mood]?.emoji ?? '😐';
}
