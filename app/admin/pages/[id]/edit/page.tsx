import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CmsBlockEditor } from '@/components/admin/CmsBlockEditor';

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await prisma.cmsPage.findUnique({
    where: { id: params.id },
  });

  return {
    title: page ? `Edit: ${page.title} | Shuyi Admin` : 'Edit Page | Shuyi Admin',
  };
}

export default async function AdminEditCmsPage({ params }: PageProps) {
  const page = await prisma.cmsPage.findUnique({
    where: { id: params.id },
  });

  if (!page) {
    notFound();
  }

  const serializablePage = {
    id: page.id,
    slug: page.slug,
    title: page.title,
    status: page.status,
    blocks: page.blocks,
    createdAt: page.createdAt.toISOString(),
    updatedAt: page.updatedAt.toISOString(),
  };

  return <CmsBlockEditor initialPage={serializablePage} />;
}
