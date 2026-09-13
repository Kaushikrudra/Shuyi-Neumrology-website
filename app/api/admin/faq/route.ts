import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isEditorOrAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

const INITIAL_FAQS = [
  {
    question: 'How do the Numerology calculations work?',
    answer:
      'Shuyi utilizes standard Pythagorean numerological reduction. For birth dates, numbers are summed across day, month, and year until reduced to a single digit (1–9) or preserved as master numbers (11, 22, 33). For names, letters are mapped to their traditional numeric vibration values.',
    order: 1,
  },
  {
    question: 'What is the difference between Life Path, Destiny, and Soul Urge?',
    answer:
      'Your Life Path number reflects your core life journey and primary lessons derived from your birth date. The Destiny (Expression) number reveals your natural talents based on all letters of your full name. The Soul Urge (Heart’s Desire) number is calculated from vowels, uncovering subconscious motivations.',
    order: 2,
  },
  {
    question: 'How are Tarot cards drawn in the preview tool?',
    answer:
      'Tarot draws are based on the traditional 78-card archetypes (Major and Minor Arcana). The preview tool randomly draws archetypal symbols accompanied by upright and reversed contemplative interpretations.',
    order: 3,
  },
  {
    question: 'Is my personal birth date and name data stored on any server?',
    answer:
      'No. In this Phase 2 foundation, all calculations and preview features are strictly client-side. Your inputs stay entirely within your browser session and are not transmitted to any external server or database.',
    order: 4,
  },
  {
    question: 'How does the Light / Dark mode theme preference work?',
    answer:
      'The theme toggle in the header adapts to your preference using Tailwind CSS class-based switching. Your chosen mode is saved in localStorage and persists across page reloads. If no preference is selected, it defaults to your operating system’s theme.',
    order: 5,
  },
  {
    question: 'What features are planned for future phases?',
    answer:
      'Phase 3 will introduce interactive calculation tools for Life Path and Tarot card spreads. Phase 4 will introduce detailed PDF/printable reports, and Phase 5 will add advanced compatibility algorithms.',
    order: 6,
  },
];

// GET all FAQs (Admin/Editor)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const faqs = await prisma.faqItem.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return NextResponse.json({ success: true, faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQ items' },
      { status: 500 }
    );
  }
}

// POST create FAQ item or seed defaults (Admin/Editor)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Check if request is to seed initial FAQs
    if (body.action === 'seed') {
      const existingCount = await prisma.faqItem.count();
      if (existingCount > 0) {
        return NextResponse.json(
          { error: 'FAQs already exist in database.' },
          { status: 400 }
        );
      }

      await prisma.faqItem.createMany({
        data: INITIAL_FAQS,
      });

      const seededFaqs = await prisma.faqItem.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });

      return NextResponse.json({
        success: true,
        message: 'Successfully seeded 6 default FAQs.',
        faqs: seededFaqs,
      });
    }

    const { question, answer, order } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question text is required.' },
        { status: 400 }
      );
    }

    if (!answer || !answer.trim()) {
      return NextResponse.json(
        { error: 'Answer text is required.' },
        { status: 400 }
      );
    }

    const parsedOrder = typeof order === 'number' ? order : parseInt(order, 10) || 0;

    const newFaq = await prisma.faqItem.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        order: parsedOrder,
      },
    });

    return NextResponse.json(
      { success: true, message: 'FAQ item created successfully.', faq: newFaq },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ item' },
      { status: 500 }
    );
  }
}
