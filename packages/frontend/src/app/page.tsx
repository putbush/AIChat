import { ChatsSidebar } from '@widgets/chats-sidebar';
import { ChatWindow } from '@widgets/chat-window';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <ChatsSidebar />
      <ChatWindow />
    </div>
  );
}
