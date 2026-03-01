import { Button } from '@shared/ui';
import styles from './CreateChatButton.module.scss';
import Image from 'next/image';

export const CreateChatButton = () => {
  return (
    <Button className={styles.button}>
      <Image src="/plus.svg" alt="Create chat" width={24} height={24} />
      <span className={styles.buttonText}>New Chat</span>
      <div className={styles.hotkey}>ctrl + j</div>
    </Button>
  );
};
