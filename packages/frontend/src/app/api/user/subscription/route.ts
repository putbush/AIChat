import { SubscriptionType } from '@aichat/shared';
import { buildApiResponse, requestWithRefresh } from '@shared/api';
import { handleApiRoute } from '@shared/lib/handleApiRoute';

export const POST = async (req: Request) => {
  return handleApiRoute<SubscriptionType>(
    async () => {
      const body = await req.json();
      const response = await requestWithRefresh<SubscriptionType>({
        method: 'POST',
        url: '/user/subscription',
        data: body,
      });
      return response;
    },
    async (response) => await buildApiResponse<SubscriptionType>(response),
  );
};
