import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json({ error: 'Помилка оновлення статті' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Статтю успішно видалено' });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка видалення статті' }, { status: 500 });
  }
}