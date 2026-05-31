import { AvatarUrlResponseSchema } from '@aichat/shared';
import { buildApiResponse, requestWithRefresh } from '@shared/api/server';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const PATCH = async (req: Request) => {
  return handleApiRoute(
    async () => {
      const body = await req.formData();
      const response = await requestWithRefresh(
        {
          method: 'PATCH',
          url: BACKEND_API_PATHS.USER.UPDATE_AVATAR,
          data: body,
        },
        AvatarUrlResponseSchema,
      );
      return response;
    },
    async (response) => await buildApiResponse(response),
  );
};
