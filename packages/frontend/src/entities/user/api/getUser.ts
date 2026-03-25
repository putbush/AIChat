'use server';

import type { User } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api';

export const getUser = async (): Promise<User | null> => {
  try {
    const response = await requestWithRefresh<User>({
    method: 'GET',
    url: '/user/profile',
  });

  return response.data;
  } catch {
    return null;
  }
};
