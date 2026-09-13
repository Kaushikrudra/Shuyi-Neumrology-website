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
    const { question, answer, order } = body;

    const existing = await prisma.faqItem.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 });
    }

    const updateData: { question?: string; answer?: string; order?: number } = {};
    if (typeof question === 'string' && question.trim()) {
      updateData.question = question.trim();
    }
    if (typeof answer === 'string' && answer.trim()) {
      updateData.answer = answer.trim();
    }
    if (order !== undefined) {
      updateData.order = typeof order === 'number' ? order : parseInt(order, 10) || 0;
    }

    const updatedFaq = await prisma.faqItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'FAQ item updated successfully.',
      faq: updatedFaq,
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ item' },
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

    const existing = await prisma.faqItem.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 });
    }

    await prisma.faqItem.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'FAQ item deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ item' },
      { status: 500 }
    );
  }
}
