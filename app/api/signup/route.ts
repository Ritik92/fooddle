// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import tempUsersStore from '@/lib/redisStore';
import { sendVerificationEmail } from '../../../lib/mail';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const username = email;
    // Generate a verification token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Store the temporary user data
    await tempUsersStore.set(token, { username, password });
    
    // Send the verification email
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;
    
    await sendVerificationEmail(username, verificationLink);

    return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
  } catch (error) {
    console.error('Sign up failed:', error);
    return NextResponse.json({ error: 'Sign up failed' }, { status: 500 });
  }
}