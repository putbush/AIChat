import { NextResponse } from 'next/server';
import { setAuthCookies } from '@shared/lib/cookies';
import { ResultRequest } from '@shared/api/requestWithRefresh';

export const buildApiResponse = async <T>(result: ResultRequest<T>) => {
  const response = NextResponse.json(result.data, {
    status: result.status,
  });

  if (result.tokens) {
    await setAuthCookies(response, result.tokens);
  }

  return response;
};