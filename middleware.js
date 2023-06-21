import { NextResponse } from 'next/server';

export async function middleware(req) {

  let cookie = req.cookies.get('session')

  if (cookie && cookie != "") {
    console.log(`[Middleware]: ${cookie}, ${req.nextUrl}`)
  	return NextResponse.next();
  }
  else if (req.url.includes(".svg") || req.url.includes(".png"))
    return NextResponse.next()
  else {
    console.log(`[Middleware]: Redirect ${JSON.stringify(cookie)}, ${req.nextUrl}`)
    return NextResponse.redirect(new URL('/dashboard/login', req.nextUrl))
  }
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
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|dashboard/login|dashboard/signup|dashboard/logout|callback/oauth).*)',
  ],
}