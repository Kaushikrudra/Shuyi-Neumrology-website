import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { FaqManagement } from '@/components/admin/FaqManagement';

export const metadata: Metadata = {
  title: 'Content & FAQ Management | Shuyi Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  // Fetch existing FAQs from database
  const rawFaqs = await prisma.faqItem.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  const faqs = rawFaqs.map((f) => ({
    ...f,
    createdAt: f.createdAt.toISOString(),
    updatedAt: f.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border mb-2">
          <span>Editor & Admin</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Content & FAQ Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create, modify, reorder, and remove dynamic FAQ items displayed on the public FAQ page.
        </p>
      </div>

      <FaqManagement initialFaqs={faqs} />
    </div>
  );
}
