'use server';

import { ChatsSchema, type Chat } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { BACKEND_API_PATHS } from '@shared/constants/routes';

export const getChatsHistory = async (): Promise<Chat[] | null> => {
  try {
    const response = await requestWithRefresh(
      {
        method: 'GET',
        url: BACKEND_API_PATHS.CHAT.LIST,
      },
      ChatsSchema,
    );

    return response.data;
  } catch {
    return null;
  }
};
