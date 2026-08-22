import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// *۱ ===> تحلیل AI
async function analyzeWithAi(content: string, mood: string) {
  const response = await fetch('https://api.gapgpt.app/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GAPGPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content: `تو یه روانشناس هستی که یادداشت‌های روزانه رو تحلیل می‌کنی.
فقط JSON برگردون با این ساختار دقیق:
{
  "score": عدد بین 1 تا 10,
  "summary": "یک جمله فارسی درباره احساس کاربر"
}
  با کاربر سعی کن راحت ولی مودبانه جملتو بگی. مثلا با کلمه شما باهاش حرف بزنی .اگر حالش بده اروزی بهتر شدن یا امیدوارم روز های آینده بهتر بشی و ... از این قبیل حرف ها بگی بهش. اگر عالیه جمله ای شبیه اینکه امیدوارم همیشه اینطوری باشی و ... . لازم نیست حتما جمله های منو بگی ، میتونی خلاقیت به خرج بدی تو جمله هایی که به کاربر میگی.
  وقتی حس کاربر رو میگی، در نهایت جمله، حس کاربر رو بگو و بعد یه جمله امید بخش یا مثبت بهش بگو. مثلا اگر حسش خوبه بگو امیدوارم همیشه اینطوری باشی و ... اگر حسش بد بود بگو امیدوارم روز های آینده بهتر بشه و ... و ... . لازم نیست حتما جمله های منو بگی ، میتونی خلاقیت به خرج بدی تو جمله هایی که به کاربر میگی.
`,
        },
        {
          role: 'user',
          content: `mood انتخابی: ${mood}\n\nمتن یادداشت:\n${content}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? '{}';

  try {
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return { score: 5, summary: 'تحلیل انجام نشد' };
  }
}

// *۲ ===> POST — ذخیره یادداشت جدید
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: 'کاربر وارد نشده است' },
        { status: 401 },
      );

    const { content, mood } = await req.json();

    if (!content.trim() || !mood)
      return NextResponse.json(
        { error: 'محتوا و حالت احساسی الزامی است' },
        { status: 400 },
      );

    // *!چک کن امروز یادداشت داری یا نه
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.entry.findFirst({
      where: {
        userId,
        createdAt: { gte: today },
      },
    });

    if (existing)
      return NextResponse.json(
        { error: 'امروز قبلاً یادداشت ثبت کردی' },
        { status: 409 },
      );

    // ===============================

    // تحلیل AI
    const aiResult = await analyzeWithAi(content, mood);

    // ذخیره تو دیتابیس
    const entry = await prisma.entry.create({
      data: {
        userId,
        content: content.trim(),
        mood,
        aiScore: aiResult.score ?? 5,
        aiSummary: aiResult.summary ?? '',
      },
    });

    return NextResponse.json({ entry, aiResult });
  } catch (error) {
    console.error('❌ Entry save error:', error);
    return NextResponse.json(
      { error: 'خطا در ذخیره یادداشت' },
      { status: 500 },
    );
  }
}

// *۳ ===> GET — گرفتن یادداشت‌های کاربر
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const entries = await prisma.entry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error('❌ Entries fetch error:', error);
    return NextResponse.json({ error: 'خطای داخلی سرور' }, { status: 500 });
  }
}
