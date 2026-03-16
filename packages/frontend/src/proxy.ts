import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const proxy = (request: NextRequest) => {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;
  
  const authPages = ['/login', '/register'];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register'],
};