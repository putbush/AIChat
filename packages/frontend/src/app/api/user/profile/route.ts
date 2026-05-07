import { UserSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { buildApiResponse } from '@shared/api/server/buildApiResponse';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const GET = async () => {
  return handleApiRoute(
    async () => {
      const response = await requestWithRefresh(
        {
          method: 'GET',
          url: BACKEND_API_PATHS.USER.PROFILE,
        },
        UserSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse(response),
  );
};
