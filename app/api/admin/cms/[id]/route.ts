import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isEditorOrAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { RESERVED_SLUGS, slugify } from '@/lib/cms-types';

interface RouteContext {
  params: {
    id: string;
  };
}

// GET single CMS page by ID (Admin/Editor)
export async function GET(req: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const page = await prisma.cmsPage.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, page });
  } catch (error) {
    console.error('Error fetching CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CMS page' },
      { status: 500 }
    );
  }
}

// PATCH update CMS page (Admin/Editor)
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const page = await prisma.cmsPage.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Record<string, any> = {};

    if (body.title !== undefined) {
      if (!body.title.trim()) {
        return NextResponse.json(
          { error: 'Title cannot be empty.' },
          { status: 400 }
        );
      }
      updateData.title = body.title.trim();
    }

    if (body.slug !== undefined) {
      const cleanSlug = slugify(body.slug);
      if (!cleanSlug) {
        return NextResponse.json(
          { error: 'Valid slug is required.' },
          { status: 400 }
        );
      }
      if (RESERVED_SLUGS.includes(cleanSlug)) {
        return NextResponse.json(
          { error: `The slug "${cleanSlug}" is reserved for system routes.` },
          { status: 400 }
        );
      }
      if (cleanSlug !== page.slug) {
        const slugConflict = await prisma.cmsPage.findUnique({
          where: { slug: cleanSlug },
        });
        if (slugConflict) {
          return NextResponse.json(
            { error: `Slug "${cleanSlug}" is already taken.` },
            { status: 400 }
          );
        }
        updateData.slug = cleanSlug;
      }
    }

    if (body.blocks !== undefined) {
      updateData.blocks =
        typeof body.blocks === 'string'
          ? body.blocks
          : JSON.stringify(body.blocks);
    }

    if (body.status !== undefined) {
      if (body.status !== 'draft' && body.status !== 'published') {
        return NextResponse.json(
          { error: 'Status must be either "draft" or "published".' },
          { status: 400 }
        );
      }
      updateData.status = body.status;
    }

    const updatedPage = await prisma.cmsPage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Page updated successfully.',
      page: updatedPage,
    });
  } catch (error) {
    console.error('Error updating CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to update CMS page' },
      { status: 500 }
    );
  }
}

// DELETE CMS page (Admin/Editor)
export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const page = await prisma.cmsPage.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    await prisma.cmsPage.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting CMS page:', error);
    return NextResponse.json(
      { error: 'Failed to delete CMS page' },
      { status: 500 }
    );
  }
}
