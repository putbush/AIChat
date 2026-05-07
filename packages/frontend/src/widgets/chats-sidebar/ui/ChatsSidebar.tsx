'use client';

import { useEffect } from 'react';
import { SidebarHeader } from './SidebarHeader';
import { ToggleSidebar } from './ToggleSidebar';
import { CreateChatButton, ChatsHistory } from '@features/chats-history';
import { UserProfile } from '@features/user';
import { SidebarFooter } from './SidebarFooter';
import { sidebarStore } from '../model';
import { upgradePlanModalStore } from '@widgets/upgrade-plan-modal/model';
import { observer } from 'mobx-react';
import type { SidebarVariant } from '@shared/lib/sidebar/sidebarVariant';
import styles from './ChatsSidebar.module.scss';
import classNames from 'classnames';

export const ChatsSidebar = observer(() => {
  const { isOpen, toggleSidebar, setIsOpen } = sidebarStore;
  const { toggleModal } = upgradePlanModalStore;
  const variant: SidebarVariant = isOpen ? 'expanded' : 'compact';

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 767.98px)');

    if (mobileMediaQuery.matches) {
      setIsOpen(false);
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    mobileMediaQuery.addEventListener('change', handleChange);
    return () => mobileMediaQuery.removeEventListener('change', handleChange);
  }, [setIsOpen]);

  return (
    <>
      <aside
        className={classNames(styles.sidebar, {
          [styles.closed]: !isOpen,
        })}
      >
        <SidebarHeader variant={variant} toggleSidebar={toggleSidebar} />

        <CreateChatButton variant={variant} />
        <ChatsHistory variant={variant} />
        <UserProfile variant={variant} toggleUpgradeModal={toggleModal} />

        {isOpen && <SidebarFooter />}
      </aside>
      {!isOpen && (
        <div className={styles.mobileBurger}>
          <ToggleSidebar onClick={toggleSidebar} />
        </div>
      )}
    </>
  );
});
