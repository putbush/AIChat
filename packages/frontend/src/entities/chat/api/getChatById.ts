'use server';

import { ChatSchema, type Chat } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api/server';
import { BACKEND_API_PATHS } from '@shared/constants/routes';

export const getChatById = async (chatId: string): Promise<Chat | null> => {
  try {
    const response = await requestWithRefresh(
      {
        method: 'GET',
        url: BACKEND_API_PATHS.CHAT.GET(chatId),
      },
      ChatSchema,
    );

    return response.data;
  } catch {
    return null;
  }
};
