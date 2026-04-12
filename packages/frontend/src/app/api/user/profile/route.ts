import { User, UserSchema } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api';
import { buildApiResponse } from '@shared/api/buildApiResponse';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const GET = async () => {
  return handleApiRoute<User>(
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
    async (response) => await buildApiResponse<User>(response),
  );
};
