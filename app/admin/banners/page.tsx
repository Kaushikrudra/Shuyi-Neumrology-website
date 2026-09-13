import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { BannerManagement } from '@/components/admin/BannerManagement';

export const metadata: Metadata = {
  title: 'Banner Management | Shuyi Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminBannersPage() {
  const rawBanners = await prisma.banner.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const banners = rawBanners.map((b) => ({
    ...b,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="border-b border-border/70 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border mb-2">
          <span>Editor & Admin</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Announcement Banners
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create, edit, toggle, or retire sitewide announcement banners displayed prominently above the homepage hero.
        </p>
      </div>

      <BannerManagement initialBanners={banners} />
    </div>
  );
}
