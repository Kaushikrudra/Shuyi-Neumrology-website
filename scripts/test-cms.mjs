import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing CMS Page creation and publishing...');

  const sampleSlug = 'tarot-fundamentals';

  // Cleanup existing test page if any
  await prisma.cmsPage.deleteMany({
    where: { slug: sampleSlug },
  });

  const sampleBlocks = [
    {
      id: 'block_text_1',
      type: 'text',
      content: {
        heading: 'The Sacred Architecture of Tarot & Numerology',
        body: 'Tarot and numerology are complementary facets of the same ancient esoteric wisdom. Every tarot card in the Major Arcana corresponds directly to a root vibration from numbers 1 through 22.\n\nBy understanding both your personal Life Path and the universal card cycles, you uncover archetypal patterns guiding your destiny, relationships, and professional milestones.',
      },
      order: 0,
    },
    {
      id: 'block_img_1',
      type: 'image',
      content: {
        imageUrl: '/hero-poster.webp',
        altText: 'Tarot and mystical celestial artwork',
        caption: 'Figure 1: The archetypal symbolism connecting numerology with tarot arcana.',
      },
      order: 1,
    },
    {
      id: 'block_cta_1',
      type: 'cta',
      content: {
        headline: 'Discover Your Life Path & Core Numbers Today',
        buttonText: 'Calculate Free Numerology Reading',
        buttonLink: '/preview',
      },
      order: 2,
    },
  ];

  const page = await prisma.cmsPage.create({
    data: {
      title: 'Tarot Fundamentals & Numerological Harmony',
      slug: sampleSlug,
      status: 'published',
      blocks: JSON.stringify(sampleBlocks),
    },
  });

  console.log('✓ Successfully created test CMS page:');
  console.log('  ID:', page.id);
  console.log('  Title:', page.title);
  console.log('  Slug:', page.slug);
  console.log('  Status:', page.status);
  console.log('  Blocks count:', JSON.parse(page.blocks).length);

  const fetched = await prisma.cmsPage.findUnique({
    where: { slug: sampleSlug },
  });

  if (fetched && fetched.status === 'published') {
    console.log('✓ Database verification passed! Page is published and queryable.');
  } else {
    throw new Error('Verification failed!');
  }
}

main()
  .catch((e) => {
    console.error('Error testing CMS:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
