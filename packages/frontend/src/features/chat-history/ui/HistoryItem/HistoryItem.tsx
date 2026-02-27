'use client';

import type { Chat } from "@entities/chat";
import styles from './HistoryItem.module.scss';

export const HistoryItem = (props: Chat) => {
  const { id, title } = props;
  return (
    <li>
      <a href='' className={styles.item}>
        <span className={styles.title}>{id} | {title}</span>
      </a>
    </li>
  );
};

