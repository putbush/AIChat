import type { Chat } from '@aichat/shared';
import { DEFAULT_CHAT_NAME } from '@entities/chat/constants';
import styles from './HistoryItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';
import { Tooltip } from 'antd';
import { LINK_PATHS } from '@shared/constants/routes';

type HistoryItemProps = {
  chat: Chat;
  isOpen: boolean;
};

const HistoryItemComponent = (props: HistoryItemProps) => {
  const { chat, isOpen } = props;

  const link = (
    <Link href={LINK_PATHS.CHAT(chat.id)} className={styles.item}>
      <Image src="/icons/chat-icon.svg" alt="Chat icon" width={18} height={18} />
      {isOpen && <span className={styles.title}>{chat.title || DEFAULT_CHAT_NAME}</span>}
    </Link>
  );

  return (
    <li>
      {isOpen ? (
        link
      ) : (
        <Tooltip title={chat.title || DEFAULT_CHAT_NAME} placement="right" mouseEnterDelay={0.15}>
          {link}
        </Tooltip>
      )}
    </li>
  );
};

export const HistoryItem = memo(HistoryItemComponent);
