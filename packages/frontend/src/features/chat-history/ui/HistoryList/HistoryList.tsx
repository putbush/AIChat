'use client';

import { HistoryItem } from '../HistoryItem';
import { Chat } from '@entities/chat';
import { useGetChats } from '@features/chat-history/api';
import styles from './HistoryList.module.scss';

export const HistoryList = () => {
  const chats: Chat[] = useGetChats();

  return (
    <ul className={styles.list}>
      {chats.map((chat) => (
        <HistoryItem key={chat.id} title={chat.title} id={chat.id} />
      ))}
    </ul>
  );
};
