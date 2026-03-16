'use client';

import { HistoryItem } from '@entities/chat/ui/HistoryItem';
import styles from './HistoryList.module.scss';
import { useChatsHistory } from '@features/chats-history/api';

export const HistoryList = () => {
  const { data, error } = useChatsHistory();

  let component;

  if (error || !data || data.length === 0) {
    component = (
        <p className={styles.empty}>Create your first chat</p>
    );
  } else {
    component = (
      <ul className={styles.list}>
        {data.map((chat) => (
          <HistoryItem key={chat.id} chat={chat} />
        ))}
      </ul>
    );
  }

  return (
    <section className={styles.history}>
      <h3 className={styles.title}>Recent</h3>
      {component}
    </section>
  );
};
