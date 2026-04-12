import { AuthTokens, AuthTokensSchema } from '@aichat/shared';
import { buildApiResponse, requestWithRefresh } from '@shared/api';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const POST = async (req: Request) => {
  return handleApiRoute<AuthTokens>(
    async () => {
      const body = await req.json();
      const response = await requestWithRefresh(
        {
          method: 'POST',
          url: BACKEND_API_PATHS.AUTH.REGISTER,
          data: body,
        },
        AuthTokensSchema,
      );
      response.tokens = response.data;
      return response;
    },
    async (response) => await buildApiResponse<AuthTokens>(response),
  );
};
