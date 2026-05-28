import { NextResponse } from 'next/server';
import { setAuthCookies } from '@shared/lib/cookies';
import { STREAM_HEADERS } from '../core/headers';
import { ResultRequest, StreamRequestResult } from '../core/types';
import { AuthTokens } from '@aichat/shared';

const applyAuthCookies = async (
  response: NextResponse,
  tokens?: AuthTokens,
): Promise<NextResponse> => {
  if (tokens) {
    await setAuthCookies(response.cookies, tokens);
  }

  return response;
};

export const buildApiResponse = async <T>(result: ResultRequest<T>) => {
  const response = NextResponse.json(result.data, {
    status: result.status,
  });

  return applyAuthCookies(response, result.tokens);
};

export const buildApiStreamResponse = async (result: StreamRequestResult) => {
  const response = new NextResponse(result.stream, {
    status: result.status,
    headers: STREAM_HEADERS,
  });

  return applyAuthCookies(response, result.tokens);
};
