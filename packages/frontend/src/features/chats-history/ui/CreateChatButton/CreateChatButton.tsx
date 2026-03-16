'use client';

import { Button } from '@shared/ui';
import styles from './CreateChatButton.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const CreateChatButton = () => {
  const router = useRouter();

  const onSubmit = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const target = event.target as HTMLElement | null;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (!event.ctrlKey || key !== '/' || isEditable) {
        return;
      }

      event.preventDefault();
      onSubmit();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onSubmit]);

  return (
    <Button type="button" className={styles.button} onClick={onSubmit} aria-keyshortcuts="Control+K">
      <Image src="/plus.svg" alt="" width={24} height={24} />
      <span className={styles.buttonText}>New Chat</span>
      <p className={styles.hotkey}>ctrl + /</p>
    </Button>
  );
};
