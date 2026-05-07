'use client';

import { HistoryItem } from '@entities/chat/ui/HistoryItem';
import styles from './ChatsHistory.module.scss';
import { useChatsHistory } from '@features/chats-history/api';
import type { SidebarVariant } from '@shared/lib/sidebar/sidebarVariant';
import { ChatsHistorySkeleton } from './ChatsHistorySkeleton';
import classNames from 'classnames';

type ChatsHistoryProps = {
  variant: SidebarVariant;
};

export const ChatsHistory = (props: ChatsHistoryProps) => {
  const { variant } = props;
  const { data, error, isPending } = useChatsHistory();
  const chats = Array.isArray(data) ? data : [];
  const isExpanded = variant === 'expanded';

  const hasChats = chats.length > 0;

  if (!isExpanded && !hasChats) {
    return null;
  }

  return (
    <section
      className={classNames(styles.history, {
        [styles.historyCompact]: !isExpanded,
      })}
      aria-label="Recent chats"
    >
      {isExpanded && <h3 className={styles.title}>Recent</h3>}

      {isPending && isExpanded && <ChatsHistorySkeleton isOpen={isExpanded} />}

      {!isPending && (error || !hasChats) && isExpanded && (
        <p className={styles.empty}>Create your first chat</p>
      )}

      {hasChats && (
        <ul className={styles.list}>
          {chats.map((chat) => (
            <HistoryItem key={chat.id} chat={chat} isOpen={isExpanded} />
          ))}
        </ul>
      )}
    </section>
  );
};
