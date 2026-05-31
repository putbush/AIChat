import Link from 'next/link';
import { Button } from '@shared/ui';
import styles from './not-found.module.scss';

export default function ChatNotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.content}>
        <h1>This chat is unavailable</h1>
        <p>It may have been deleted, moved, or you may not have access to it.</p>

        <Link href="/">
          <Button variant="primary">Back to chats</Button>
        </Link>
      </div>
    </main>
  );
}
