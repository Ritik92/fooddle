import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define which paths are considered public (don't need authentication)
  const publicPaths = [ '/api/auth/signin']
  const isPublicPath = publicPaths.includes(path)

  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // If the path is public or the user has a valid token, allow the request
  if (isPublicPath || token) {
    return NextResponse.next()
  }

  // If the user doesn't have a token and the path isn't public, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url))
  }
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}