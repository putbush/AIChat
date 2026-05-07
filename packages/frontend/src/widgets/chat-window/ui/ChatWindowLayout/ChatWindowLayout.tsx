import styles from './ChatWindowLayout.module.scss';
import { PromptInput } from '@features/chat';

type ChatWindowLayoutProps = {
  chatId?: string;
  children: React.ReactNode;
};

export const ChatWindowLayout = (props: ChatWindowLayoutProps) => {
  const { chatId, children } = props;

  return (
    <div className={styles.window}>
      <div className={styles.bottomBackdrop} aria-hidden />
      {children}
      <PromptInput chatId={chatId} />
      <div className={styles.disclaimer}>AI-generated, for reference only</div>
    </div>
  );
};
