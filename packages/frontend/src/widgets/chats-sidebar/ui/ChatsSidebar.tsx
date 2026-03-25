'use client';

import { useEffect } from 'react';
import { SidebarHeader } from './SidebarHeader';
import { ToggleSidebar } from './ToggleSidebar';
import { CreateChatButton, HistoryList } from '@features/chats-history';
import { UserProfile } from '@features/user';
import { SidebarFooter } from './SidebarFooter';
import { sidebarStore } from '../model';
import { upgradePlanModalStore } from '@widgets/upgrade-plan-modal/model';
import { observer } from 'mobx-react';
import styles from './ChatsSidebar.module.scss';

export const ChatsSidebar = observer(() => {
  const { isOpen, toggleSidebar, setIsOpen } = sidebarStore;
  const { toggleModal } = upgradePlanModalStore;

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
      <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
        {isOpen ? (
          <>
            <SidebarHeader toggleSidebar={toggleSidebar} />

            <CreateChatButton />
            <HistoryList />
            <UserProfile isOpen={isOpen} toggleUpgradeModal={toggleModal} />

            <SidebarFooter />
          </>
        ) : (
          <>
            <ToggleSidebar onClick={toggleSidebar} />
            <UserProfile isOpen={isOpen} toggleUpgradeModal={toggleModal} />
          </>
        )}
      </aside>
      {!isOpen && (
        <div className={styles.mobileBurger}>
          <ToggleSidebar onClick={toggleSidebar} />
        </div>
      )}
    </>
  );
});
