import { AuthResponse } from '@aichat/shared';
import { buildApiResponse, requestWithRefresh } from '@shared/api';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const POST = async (req: Request) => {
  return handleApiRoute<AuthResponse>(
    async () => {
      const body = await req.json();
      const response = await requestWithRefresh<AuthResponse>({
        method: 'POST',
        url: '/auth/register',
        data: body,
      });
      response.tokens = response.data;
      return response;
    },
    async (response) => await buildApiResponse<AuthResponse>(response),
  );
};
