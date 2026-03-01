import type { Chat } from '@entities/chat';
import styles from './HistoryItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export const HistoryItem = (props: Chat) => {
  const { title } = props;
  return (
    <li>
      <Link href="" className={styles.item}>
        <Image src="/chat-icon.svg" alt="Chat icon" width={18} height={18} />
        <span className={styles.title}>{title}</span>
      </Link>
    </li>
  );
};
