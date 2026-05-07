'use client';

import { useGetMessages } from '@features/chat/api';
import styles from './MessageList.module.scss';
import { useEffect, useMemo, useRef } from 'react';
import { Message } from '@entities/message';
import { Spin } from 'antd';
import Link from 'next/link';
import { Button } from '@shared/ui';

type MessageListProps = {
  chatId: string;
};

export const MessageList = (props: MessageListProps) => {
  const { chatId } = props;
  const { data, isLoading, isError, error } = useGetMessages(chatId);
  const messages = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin className={styles.loadingSpinner} size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <p className={styles.errorMessage}>{error?.message}</p>
        <Link href="/">
          <Button className={styles.errorButton}>Go back</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.scrollArea} ref={containerRef}>
      <div className={styles.list}>
        {messages.map((message) => (
          <Message key={message.id} sender={message.sender}>
            {message.content}
          </Message>
        ))}
      </div>
    </div>
  );
};
