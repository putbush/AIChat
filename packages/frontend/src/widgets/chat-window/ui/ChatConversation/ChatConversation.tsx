import { MessageList } from '@features/chat';
import styles from './ChatConversation.module.scss';
import { ChatWindowLayout } from '../ChatWindowLayout';

type ChatConversationProps = {
  chatId: string;
  title: string;
};

export const ChatConversation = (props: ChatConversationProps) => {
  const { chatId, title } = props;

  return (
    <ChatWindowLayout chatId={chatId}>
      <div className={styles.header}>{title}</div>

      <MessageList chatId={chatId} />
    </ChatWindowLayout>
  );
};
