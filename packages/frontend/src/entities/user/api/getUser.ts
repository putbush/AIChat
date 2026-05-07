'use server';

import { UserSchema, type User } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { BACKEND_API_PATHS } from '@shared/constants/routes';

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await requestWithRefresh(
      {
        method: 'GET',
        url: BACKEND_API_PATHS.USER.PROFILE,
      },
      UserSchema,
    );

    return response.data;
  } catch {
    return null;
  }
};
