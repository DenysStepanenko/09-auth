import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session');
  const isAuthenticated = !!sessionCookie?.value;

  // Define route types
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // Redirect unauthenticated users from private routes to sign-in
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Redirect authenticated users from auth routes to profile
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

