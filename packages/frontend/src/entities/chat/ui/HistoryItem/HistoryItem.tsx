import type { Chat } from '@aichat/shared';
import { DEFAULT_CHAT_NAME  } from '@shared/lib/constants';
import styles from './HistoryItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';


const HistoryItemComponent = (props: { chat: Chat }) => {
  const { chat } = props;
  return (
    <li>
      <Link href="" className={styles.item}>
        <Image src="/chat-icon.svg" alt="Chat icon" width={18} height={18} />
        <span className={styles.title}>{chat.title || DEFAULT_CHAT_NAME}</span>
      </Link>
    </li>
  );
}

export const HistoryItem = memo(HistoryItemComponent);
