import { Chat } from '@entities/chat';

export function useGetChats(): Chat[] {
  // Todo use fetching from backend react query

  return [
    { id: 1, title: 'Chat 1' },
    { id: 2, title: 'Chat 2' },
    { id: 3, title: 'Chat 3' },
  ];
}
