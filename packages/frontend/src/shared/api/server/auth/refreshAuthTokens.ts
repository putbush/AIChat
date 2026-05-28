import 'server-only';

import { AuthTokensSchema, type AuthTokens } from '@aichat/shared';
import { BACKEND_API_PATHS } from '@shared/constants/routes';
import { apiServer } from '../core/axios';
import { validateResponseData } from '../core/validateResponseData';

export const refreshAuthTokens = async (refreshToken: string): Promise<AuthTokens> => {
  const response = await apiServer.post(
    BACKEND_API_PATHS.AUTH.REFRESH,
    {},
    {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    },
  );

  return validateResponseData(AuthTokensSchema, response.data, response.config);
};
