import { NextResponse } from 'next/server';
import { getErrorResponse } from './createApiErrorResponse';
import { ResultRequest, StreamRequestResult } from '@shared/api/server/core/types';

const handleRoute = async <TResponse>(
  request: () => Promise<TResponse>,
  build: (response: TResponse) => Promise<NextResponse>,
): Promise<NextResponse> => {
  try {
    const response = await request();
    return await build(response);
  } catch (error) {
    const { body, status } = getErrorResponse(error);

    return NextResponse.json(body, { status });
  }
};

export const handleApiRoute = async <T>(
  request: () => Promise<ResultRequest<T>>,
  build: (response: ResultRequest<T>) => Promise<NextResponse>,
): Promise<NextResponse> => {
  return handleRoute(request, build);
};

export const handleStreamApiRoute = async (
  request: () => Promise<StreamRequestResult>,
  build: (response: StreamRequestResult) => Promise<NextResponse>,
): Promise<NextResponse> => {
  return handleRoute(request, build);
};
