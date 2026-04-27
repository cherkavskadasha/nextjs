import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "../../../../lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Неавторизовано" }, { status: 401 });

  const body = await request.json();
  const { name, age } = body;

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: { name, age: parseInt(age) || null },
  });

  return NextResponse.json(updatedUser);
}