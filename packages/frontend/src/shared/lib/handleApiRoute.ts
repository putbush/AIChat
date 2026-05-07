import { ResultRequest } from '@shared/api/server/requestWithRefresh';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { ERROR_MESSAGES } from '@shared/constants/errors';

export const handleApiRoute = async <T>(
  request: () => Promise<ResultRequest<T>>,
  build: (response: ResultRequest<T>) => Promise<NextResponse>,
): Promise<NextResponse> => {
  try {
    const response = await request();
    return await build(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ??
            ERROR_MESSAGES.INTERNAL_SERVER,
          details: error.response?.data?.details,
        },
        { status: error.response?.status ?? 500 },
      );
    }
    return NextResponse.json(
      { message: ERROR_MESSAGES.INTERNAL_SERVER },
      { status: 500 },
    );
  }
}
