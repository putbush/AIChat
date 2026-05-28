'use client';

import { MessageSender } from '@aichat/shared';
import styles from './Message.module.scss';
import classNames from 'classnames';
import { MarkdownContent } from './MarkdownContent';
import { memo } from 'react';

type MessageProps = {
  sender: MessageSender;
  children: React.ReactNode;
};

const MessageComponent = (props: MessageProps) => {
  const { sender, children } = props;

  const senderClass = sender === 'user' ? styles.user : styles.ai;

  return (
    <div className={classNames(styles.message, senderClass)}>
      {typeof children === 'string' ? <MarkdownContent>{children}</MarkdownContent> : children}
    </div>
  );
};

export const Message = memo(MessageComponent);
