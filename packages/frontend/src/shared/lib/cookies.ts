'use server';

import type { NextResponse } from 'next/server';
import { TOKENS_KEYS } from './constants';
import { cookies } from 'next/headers';

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export const setAuthCookies = async (
  response: NextResponse,
  tokens: {
    accessToken?: string;
    refreshToken?: string;
  },
) => {
  if (tokens.accessToken) {
    response.cookies.set(TOKENS_KEYS.ACCESS_TOKEN, tokens.accessToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 2,
    });
  }

  if (tokens.refreshToken) {
    response.cookies.set(TOKENS_KEYS.REFRESH_TOKEN, tokens.refreshToken, {
      ...baseCookieOptions,
      maxAge: 60 * 60 * 24 * 30,
    });
  }
};

export const getAuthTokensFromCookies = async (): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKENS_KEYS.ACCESS_TOKEN)?.value ?? null;
  const refreshToken = cookieStore.get(TOKENS_KEYS.REFRESH_TOKEN)?.value ?? null;
  return { accessToken, refreshToken };
};

export const getAccessTokenFromCookies = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKENS_KEYS.ACCESS_TOKEN)?.value ?? null;
};

export const clearAuthCookies = async (response: NextResponse) => {
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
};
