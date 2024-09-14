import { NextRequest, NextResponse } from 'next/server';
import tempUsersStore from '@/lib/redisStore';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    const tempUser = await tempUsersStore.get(token);

    if (!tempUser) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const { username, password } = tempUser;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: username },
    });

    if (existingUser) {
      // User already exists, handle accordingly
      await tempUsersStore.delete(token);
      return NextResponse.json({ message: 'User already exists', userId: existingUser.id }, { status: 200 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email: username,
        password: password,
        isVendor: false,
      },
    });

    // Clean up the temporary user data
    await tempUsersStore.delete(token);

    return NextResponse.json({ email: username, password: password });
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json({ error: 'Failed to verify and create user' }, { status: 500 });
  }
}