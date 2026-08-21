import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true, plan: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile/plan:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Please log in to upgrade your membership.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { plan } = body;

    const validPlans = ['free', 'premium', 'lifetime'];
    if (!plan || !validPlans.includes(plan.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid plan selected. Must be free, premium, or lifetime.' },
        { status: 400 }
      );
    }

    const targetPlan = plan.toLowerCase();

    // Update user plan in SQLite database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { plan: targetPlan },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully updated to ${targetPlan} membership!`,
      user: updatedUser,
      plan: updatedUser.plan,
    });
  } catch (error) {
    console.error('Error upgrading plan:', error);
    return NextResponse.json(
      { error: 'Failed to process upgrade. Please try again.' },
      { status: 500 }
    );
  }
}
