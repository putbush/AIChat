'use server';

import type { Chat } from '@aichat/shared';
import { requestWithRefresh } from '@shared/api';

export const getChatsHistory = async (): Promise<Chat[] | null> => {
  try {
    const response = await requestWithRefresh<Chat[]>({
      method: 'GET',
      url: '/chats',
    });

  return response.data;
  } catch {
    return null;
  }
};
