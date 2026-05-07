import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LINK_PATHS } from '@shared/constants/routes';
import { TOKEN_KEYS } from '@shared/constants/auth';

export const proxy = (request: NextRequest) => {
  const token = request.cookies.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  const authPages: string[] = [LINK_PATHS.LOGIN, LINK_PATHS.REGISTER];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL(LINK_PATHS.HOME, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/login', '/register', '/chats/:id'],
};
