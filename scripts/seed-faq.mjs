import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
  const existingFaqsCount = await prisma.faqItem.count();
  if (existingFaqsCount === 0) {
    await prisma.faqItem.createMany({
      data: INITIAL_FAQS,
    });
    console.log(`✅ Seeded ${INITIAL_FAQS.length} default FAQ items into SQLite database.`);
  } else {
    console.log(`ℹ️ FAQ items already exist (${existingFaqsCount} items found in database). Skipping.`);
  }

  const existingBanners = await prisma.banner.count();
  if (existingBanners === 0) {
    await prisma.banner.create({
      data: {
        title: 'Welcome to Shuyi',
        message: 'Experience archetypal numerology and tarot insights with our live preview tools.',
        isActive: true,
      },
    });
    console.log('✅ Created sample welcome banner.');
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
