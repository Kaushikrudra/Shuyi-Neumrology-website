import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isAdmin } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Authentication and Admin authorization check
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: 'Forbidden: Only administrators can update user roles.' },
        { status: 403 }
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { role } = body;

    const validRoles = ['user', 'editor', 'admin'];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "user", "editor", or "admin".' },
        { status: 400 }
      );
    }

    // Check target user existence
    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Role for ${updatedUser.email} updated to "${role}".`,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role.' },
      { status: 500 }
    );
  }
}
