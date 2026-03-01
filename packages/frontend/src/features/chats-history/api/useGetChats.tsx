import { Chat } from '@entities/chat';

export function useGetChats(): Chat[] {
  // Todo use fetching from backend react query

  return [
    { id: 1, title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate dolores repellat deserunt beatae fuga reiciendis mollitia pariatur neque nobis illum, error quas rem animi voluptas ipsam nam earum dolorem facilis.' },
    { id: 2, title: 'Chat 2' },
    { id: 3, title: 'Chat 3' },
    { id: 4, title: 'Chat 4' },
    { id: 5, title: 'Chat 5' },
    { id: 6, title: 'Chat 6' },
    { id: 7, title: 'Chat 7' },
    { id: 8, title: 'Chat 8' },
    { id: 9, title: 'Chat 9' },
    { id: 10, title: 'Chat 10' },
    { id: 11, title: 'Chat 11' },
    { id: 12, title: 'Chat 12' },
    { id: 13, title: 'Chat 13' },
    { id: 14, title: 'Chat 14' },
    { id: 15, title: 'Chat 15' },
    { id: 16, title: 'Chat 16' },
  ];
}
