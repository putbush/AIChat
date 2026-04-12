'use client';

import { Button } from '@shared/ui';
import styles from './CreateChatButton.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import type { SidebarVariant } from '@shared/lib/sidebar/sidebarVariant';
import classNames from 'classnames';

type CreateChatButtonProps = {
  variant: SidebarVariant;
};

export const CreateChatButton = (props: CreateChatButtonProps) => {
  const { variant } = props;
  const router = useRouter();
  const isExpanded = variant === 'expanded';

  const onSubmit = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const keyCode = event.code
      const target = event.target as HTMLElement | null;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (!event.ctrlKey || keyCode !== 'Slash' || isEditable) {
        return;
      }

      event.preventDefault();
      onSubmit();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onSubmit]);

  return (
    <Button
      type="button"
      className={classNames(styles.button, {
        [styles.compact]: !isExpanded,
      })}
      onClick={onSubmit}
      aria-keyshortcuts="Control+K"
    >
      <Image src="/icons/plus.svg" alt="" width={24} height={24} />
      {isExpanded && (
        <>
          <span className={styles.buttonText}>New Chat</span>
          <p className={styles.hotkey}>ctrl + /</p>
        </>
      )}
    </Button>
  );
};
