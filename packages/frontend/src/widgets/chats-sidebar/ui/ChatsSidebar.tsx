'use client';

import { SidebarHeader } from './SidebarHeader';
import { ToggleSidebar } from './ToggleSidebar';
import { CreateChatButton, HistoryList } from '@features/chats-history';
import { UserProfile } from '@features/auth';
import { SidebarFooter } from './SidebarFooter';
import { observer } from 'mobx-react';
import { sidebarStore } from '../model/chats-sidebar.store';
import styles from './ChatsSidebar.module.scss';

export const ChatsSidebar = observer(() => {
  const { isOpen, toggleSidebar } = sidebarStore;

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
      {isOpen ? (
        <>
          <SidebarHeader toggleSidebar={toggleSidebar} />

          <CreateChatButton />
          <HistoryList />
          <UserProfile isOpen={isOpen} />

          <SidebarFooter />
        </>
      ) : (
        <>
          <ToggleSidebar closed onClick={toggleSidebar} />
          <UserProfile isOpen={isOpen} />
        </>
      )}
    </aside>
  );
});
