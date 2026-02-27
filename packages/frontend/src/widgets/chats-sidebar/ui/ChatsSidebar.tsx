import { HistoryList } from '@features/chat-history';
import styles from './ChatsSidebar.module.scss';

export const ChatsSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <HistoryList />
    </div>
  );
};
