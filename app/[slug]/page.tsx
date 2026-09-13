import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CmsBlock, RESERVED_SLUGS } from '@/lib/cms-types';
import { PublicBlockRenderer } from '@/components/cms/PublicBlockRenderer';

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;

  if (RESERVED_SLUGS.includes(slug)) {
    return { title: 'Page Not Found' };
  }

  const page = await prisma.cmsPage.findUnique({
    where: { slug },
  });

  if (!page || page.status !== 'published') {
    return { title: 'Page Not Found | Shuyi Numerology' };
  }

  return {
    title: `${page.title} | Shuyi Numerology`,
    description: `Read ${page.title} on Shuyi Numerology & Tarot insights platform.`,
  };
}

export default async function PublicCmsPage({ params }: PageProps) {
  const { slug } = params;

  // Protect system/reserved routes from falling through to CMS
  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const page = await prisma.cmsPage.findUnique({
    where: { slug },
  });

  // Only render if page exists AND is published (otherwise 404)
  if (!page || page.status !== 'published') {
    notFound();
  }

  let blocks: CmsBlock[] = [];
  try {
    const parsed = JSON.parse(page.blocks || '[]');
    if (Array.isArray(parsed)) {
      blocks = parsed;
    }
  } catch (err) {
    blocks = [];
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-background">
      {/* Page Hero Header */}
      <section className="relative py-16 sm:py-24 border-b border-border/60 bg-gradient-to-b from-secondary/40 via-background to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <span>✨</span>
            <span>Editorial Feature</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
            {page.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans">
            Published on{' '}
            {new Date(page.updatedAt).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* Main Page Blocks Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <PublicBlockRenderer blocks={blocks} previewMode={false} />
      </main>
    </div>
  );
}
