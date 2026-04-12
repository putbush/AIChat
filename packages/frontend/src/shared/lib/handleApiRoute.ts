import { ResultRequest } from '@shared/api/requestWithRefresh';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

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
          message: error.response?.data?.message ?? 'Internal server error',
          details: error.response?.data?.details,
        },
        { status: error.response?.status ?? 500 },
      );
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
