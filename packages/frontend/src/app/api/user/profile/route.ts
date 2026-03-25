import { User } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api';
import { buildApiResponse } from '@shared/api/buildApiResponse';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const GET = async () => {
  return handleApiRoute<User>(
    async () => {
      const response = await requestWithRefresh<User>({
        method: 'GET',
        url: '/user/profile',
      });
      return response;
    },
    async (response) => await buildApiResponse<User>(response),
  );
};
