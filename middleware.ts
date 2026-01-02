import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Always use /frontend-crypto as basePath since that's where the app is hosted
  const basePath = '/frontend-crypto';
  
  // Check if this is the root path
  const isRoot = pathname === '/' || pathname === '/frontend-crypto';
  
  if (isRoot) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `${basePath}/home`;
    return NextResponse.redirect(redirectUrl, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)).*)',
  ],
};

