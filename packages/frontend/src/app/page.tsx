import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getUser } from '@entities/user/api/';
import { getChatsHistory } from '@entities/chat/api';
import { ChatsSidebar } from '@widgets/chats-sidebar';
import { ChatWindow } from '@widgets/chat-window';
import { getQueryClient } from './providers/query-client';
import styles from './page.module.scss';
import { UpgradePlanModal } from '@widgets/upgrade-plan-modal/';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  await queryClient.prefetchQuery({
    queryKey: ['chatsHistory'],
    queryFn: getChatsHistory
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.page}>
        <UpgradePlanModal />
        <ChatsSidebar />
        <ChatWindow />
      </div>
    </HydrationBoundary>
  );
}
