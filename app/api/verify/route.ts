import { NextRequest, NextResponse } from 'next/server';
import tempUsersStore from '@/lib/tempuserstore';
import prisma from '@/lib/prisma';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
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
    
    const user = await prisma.user.create({
      data: {
        email: username,
        password: password, // Use a hashed password in practice
      },
    });
        
    // Redirect with the Set-Cookie header
    const response = NextResponse.redirect(new URL('/dashboard', req.url));
    return response;

  } catch (error) {
    console.error('Error saving user to database:', error);
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}
