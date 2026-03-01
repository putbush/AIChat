'use client';

import { HistoryItem } from '../HistoryItem';
import { Chat } from '@entities/chat';
import { useGetChats } from '@features/chats-history/api';
import styles from './HistoryList.module.scss';

export const HistoryList = () => {
  const chats: Chat[] = useGetChats();

  return (
    <div className={styles.history}>
      <span className={styles.title}>Recent</span>
      <ul className={styles.list}>
        {chats.map((chat) => (
          <HistoryItem key={chat.id} title={chat.title} id={chat.id} />
        ))}
      </ul>
    </div>
  );
};
