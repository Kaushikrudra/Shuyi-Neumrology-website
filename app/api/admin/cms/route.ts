import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isEditorOrAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { RESERVED_SLUGS, slugify } from '@/lib/cms-types';

// GET all CMS pages (Admin/Editor)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pages = await prisma.cmsPage.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error('Error fetching CMS pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CMS pages' },
      { status: 500 }
    );
  }
}

// POST create a new CMS page (Admin/Editor)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug: rawSlug, status = 'draft', blocks = '[]' } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Page title is required.' },
        { status: 400 }
      );
    }

    const cleanSlug = slugify(rawSlug && rawSlug.trim() ? rawSlug : title);

    if (!cleanSlug) {
      return NextResponse.json(
        { error: 'A valid slug is required.' },
        { status: 400 }
      );
    }

    if (RESERVED_SLUGS.includes(cleanSlug)) {
      return NextResponse.json(
        { error: `The slug "${cleanSlug}" is reserved for system routes.` },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.cmsPage.findUnique({
      where: { slug: cleanSlug },
    });

    if (existing) {
      return NextResponse.json(
        { error: `A page with slug "${cleanSlug}" already exists.` },
        { status: 400 }
      );
    }

    const blocksString =
      typeof blocks === 'string' ? blocks : JSON.stringify(blocks);

    const newPage = await prisma.cmsPage.create({
      data: {
        title: title.trim(),
        slug: cleanSlug,
        blocks: blocksString,
        status: status === 'published' ? 'published' : 'draft',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Page created successfully.',
        page: newPage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to create CMS page' },
      { status: 500 }
    );
  }
}
