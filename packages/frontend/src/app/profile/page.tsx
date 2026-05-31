import { getQueryClient } from '@app/providers/query-client';
import { getUser } from '@entities/user';
import { ProfileInfo } from '@features/profile';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ProfilePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileInfo />
    </HydrationBoundary>
  );
}
