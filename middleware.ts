import { NextRequest, NextResponse } from 'next/server';

const BASE_DOMAIN = 'leadersdojo.co';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, and thank-you page
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/thank-you') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get the original host — check x-forwarded-host first (nginx proxy),
  // then fall back to host header
  const host = (
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    ''
  ).split(':')[0]; // Strip port

  // Extract subdomain: "espada.leadersdojo.co" → "espada"
  if (!host.endsWith(BASE_DOMAIN)) {
    return NextResponse.next();
  }

  const subdomain = host.replace(`.${BASE_DOMAIN}`, '');
  if (!subdomain || subdomain === host) {
    // Bare domain (leadersdojo.co) or couldn't extract — pass through
    return NextResponse.next();
  }

  // If already on the correct path, pass through
  if (pathname.startsWith(`/${subdomain}`)) {
    return NextResponse.next();
  }

  // Rewrite: espada.leadersdojo.co/ → /espada
  const url = request.nextUrl.clone();
  url.pathname = `/${subdomain}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
