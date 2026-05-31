'use client';

import { useGetMessages } from '@features/chat/api';
import styles from './MessageList.module.scss';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Message } from '@entities/message';
import { Spin } from 'antd';
import Link from 'next/link';
import { Button } from '@shared/ui';
import InfiniteScroll from 'react-infinite-scroller';

type MessageListProps = {
  chatId: string;
};

export const MessageList = (props: MessageListProps) => {
  const { chatId } = props;
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMessages(chatId);

  const messages = useMemo(() => {
    return data ? [...data.pages].reverse().flatMap((page) => page.items) : [];
  }, [data]);

  const containerRef = useRef<HTMLDivElement>(null);
  const didInitialScrollRef = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container || didInitialScrollRef.current || messages.length === 0) {
      return;
    }

    container.scrollTop = container.scrollHeight;
    didInitialScrollRef.current = true;
  }, [messages.length]);

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
          <Button className={styles.errorButton} variant="secondary">
            Go back
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.scrollArea} ref={containerRef}>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (!isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
        hasMore={hasNextPage && !isFetchingNextPage}
        useWindow={false}
        getScrollParent={() => containerRef.current}
        isReverse
        initialLoad={false}
      >
        <div className={styles.list}>
          {messages.map((message) => (
            <Message
              key={message.id}
              sender={message.sender}
            >
              {message.content ? (
                message.content
              ) : message.sender === 'ai' ? (
                <Spin className={styles.loadingSpinner} size="small" />
              ) : null}
            </Message>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
