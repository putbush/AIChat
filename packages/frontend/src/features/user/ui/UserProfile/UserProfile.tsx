'use client';

import Link from 'next/link';
import { useUser, UserIdentity } from '@entities/user';
import { Button } from '@shared/ui';
import styles from './UserProfile.module.scss';
import { getImageUrl } from '@shared/lib/imageUrl';
import Image from 'next/image';

type UserProfileProps = { isOpen: boolean; toggleUpgradeModal: () => void }

export const UserProfile = (props: UserProfileProps) => {
  const { isOpen, toggleUpgradeModal } = props;
  const { data, error } = useUser();

  // if (isPending) {
  //   return <UserProfileSkeleton isOpen={isOpen} />;
  // }

  if (error || !data) {
    return (
      <Link href="/login" className={styles.profile}>
        Login
      </Link>
    );
  }

  const { name, email, subscription, avatarUrl } = data;

  const avatarSrc = avatarUrl ? getImageUrl(avatarUrl) : 'avatars/default.png';

  if (!isOpen) {
    return (
      <div className={styles.profile}>
        <UserIdentity
          href="/profile"
          avatarSrc={avatarSrc}
          name={name}
          email={email}
          isOpen={false}
        />
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <UserIdentity
          href="/profile"
          avatarSrc={avatarSrc}
          name={name}
          email={email}
          isOpen
          className={styles.userIdentity}
        />
        <span className={styles.subscriptionBadge}>{subscription.toUpperCase()}</span>
      </div>

      <Button className={styles.upgrade} onClick={toggleUpgradeModal}>
        <Image src="/upgrade.svg" alt="Upgrade Icon" width={20} height={20} />
        <span className={styles.upgradeTitle}>Upgrade Plan</span>
      </Button>
    </div>
  );
};
