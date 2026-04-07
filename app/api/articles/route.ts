import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Отримати всі статті
export async function GET() {
  try {
    const articles = await prisma.article.findMany();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Помилка отримання статей' }, { status: 500 });
  }
}

// POST: Створити нову статтю
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка створення статті' }, { status: 500 });
  }
}