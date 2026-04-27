import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Неавторизовано" }, { status: 401 });

  const { oldPassword, newPassword } = await request.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user || !user.password) return NextResponse.json({ error: "Пароль не встановлено" }, { status: 400 });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return NextResponse.json({ error: "Старий пароль невірний" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "Пароль змінено" });
}