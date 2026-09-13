import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isEditorOrAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { title, message, isActive } = body;

    const existing = await prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    const updateData: { title?: string; message?: string; isActive?: boolean } = {};
    if (typeof title === 'string' && title.trim()) {
      updateData.title = title.trim();
    }
    if (typeof message === 'string' && message.trim()) {
      updateData.message = message.trim();
    }
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }

    const updatedBanner = await prisma.banner.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Banner updated successfully.',
      banner: updatedBanner,
    });
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const existing = await prisma.banner.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    await prisma.banner.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    );
  }
}
