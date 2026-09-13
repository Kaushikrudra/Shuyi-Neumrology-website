import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { PagesManagement } from '@/components/admin/PagesManagement';

export const metadata: Metadata = {
  title: 'Pages & Block CMS | Shuyi Admin',
  description: 'Manage custom landing pages, block-based layouts, and publish workflows.',
};

export const dynamic = 'force-dynamic';

export default async function AdminPagesListPage() {
  const rawPages = await prisma.cmsPage.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  const pages = rawPages.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border mb-2">
          <span>Editor & Admin</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Pages & CMS
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create, edit, drag-and-drop reorder blocks, and manage publish/draft workflows for dynamic landing pages.
        </p>
      </div>

      <PagesManagement initialPages={pages} />
    </div>
  );
}
