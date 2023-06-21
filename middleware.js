import { NextResponse } from 'next/server';

export async function middleware(req) {

  let cookie = req.cookies.get('session')

  console.log(`[Middleware]: ${cookie}, ${req.url}`)

  if (cookie && cookie != "")
  	return NextResponse.next();
  else 
    return NextResponse.redirect(new URL('/dashboard/login', req.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - fonts (various font files)
     * - login page
     * - signup page
     */
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|dashboard/login|dashboard/signup|dashboard/logout).*)',
  ],
}