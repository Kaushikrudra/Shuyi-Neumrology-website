import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isEditorOrAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

// GET all banners (Admin/Editor)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

// POST create a banner (Admin/Editor)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !isEditorOrAdmin(session)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, message, isActive = true } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Banner title is required.' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Banner message is required.' },
        { status: 400 }
      );
    }

    const newBanner = await prisma.banner.create({
      data: {
        title: title.trim(),
        message: message.trim(),
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Banner created successfully.',
        banner: newBanner,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    );
  }
}
