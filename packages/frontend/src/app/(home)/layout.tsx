import styles from './layout.module.scss';
import { getQueryClient } from '@app/providers/query-client';
import { getUser } from '@entities/user';
// import { getChatsHistory } from '@entities/chat/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { UpgradePlanModal } from '@widgets/upgrade-plan-modal';
import { ChatsSidebar } from '@widgets/chats-sidebar';

export default async function ChatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  // await queryClient.prefetchQuery({
  //   queryKey: ['chats'],
  //   queryFn: getChatsHistory,
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles.layout}>
        <UpgradePlanModal />
        <ChatsSidebar />
        {children}
      </div>
    </HydrationBoundary>
  );
}
