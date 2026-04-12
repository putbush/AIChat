'use server';

import { TOKEN_KEYS } from '@shared/constants/auth';
import { cookies } from 'next/headers';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { AuthTokens } from '@aichat/shared';

enum SameSite {
  Lax = 'lax',
  Strict = 'strict',
  None = 'none',
}

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: SameSite.Lax,
  path: '/',
};

const setTokens = async (
  cookies: ResponseCookies,
  tokens: Record<string, { value: string; maxAge: number }>,
) => {
  for (const [key, { value, maxAge }] of Object.entries(tokens)) {
    cookies.set(key, value, {
      ...baseCookieOptions,
      maxAge,
    });
  }
};

export const setAuthCookies = async (
  cookies: ResponseCookies,
  tokens: AuthTokens,
) => {
  await setTokens(cookies, {
    [TOKEN_KEYS.ACCESS_TOKEN]: { value: tokens.accessToken, maxAge: 60 * 60 * 2 },
    [TOKEN_KEYS.REFRESH_TOKEN]: { value: tokens.refreshToken, maxAge: 60 * 60 * 24 * 30 },
  });
};

export const getAuthTokensFromCookies = async (): Promise<Partial<AuthTokens>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_KEYS.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(TOKEN_KEYS.REFRESH_TOKEN)?.value;
  return { accessToken, refreshToken };
};

export const getAccessTokenFromCookies = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEYS.ACCESS_TOKEN)?.value ?? null;
};

export const clearAuthCookies = async (cookies: ResponseCookies) => {
  cookies.delete(TOKEN_KEYS.ACCESS_TOKEN);
  cookies.delete(TOKEN_KEYS.REFRESH_TOKEN);
};
