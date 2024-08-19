import { NextRequest, NextResponse } from 'next/server';
import tempUsersStore from '@/lib/tempuserstore';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  const tempUser = tempUsersStore.get(token);

  if (!tempUser || tempUser.expires < Date.now()) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  const { username, password } = tempUser;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: username,
        password: password,
      },
    });

    // Clean up the temporary user data
    tempUsersStore.delete(token);

    return NextResponse.json({ email: user.email, password: password });
  } catch (error) {
    console.error('Error saving user to database:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}