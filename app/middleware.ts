// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the user's session from the cookies
  const session = request.cookies.get('session');

  // If there's no session, redirect the user to the sign-in page
  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }
  
  // If the user has a session, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Apply this middleware to all routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
