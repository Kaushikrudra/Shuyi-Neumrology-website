import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export async function Footer() {
  let publishedPages: { id: string; title: string; slug: string }[] = [];
  try {
    publishedPages = await prisma.cmsPage.findMany({
      where: { status: 'published' },
      take: 6,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, slug: true },
    });
  } catch {
    publishedPages = [];
  }

  return (
    <footer className="w-full border-t border-border/60 bg-background py-8 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-6">
        {publishedPages.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground border-b border-border/40 pb-5">
            <span className="font-semibold text-foreground">Featured Pages:</span>
            {publishedPages.map((p) => (
              <Link
                key={p.id}
                href={`/${p.slug}`}
                className="hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                {p.title}
              </Link>
            ))}
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Shuyi. Personal / Portfolio Project.</p>
          <p>Phase 7: Dynamic Drag-and-Drop CMS & Editorial Publishing</p>
        </div>
      </div>
    </footer>
  );
}
