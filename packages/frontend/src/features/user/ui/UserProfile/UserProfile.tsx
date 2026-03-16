'use client';

import Link from 'next/link';
import { useUser, UserIdentity } from '@entities/user';
import { Button } from '@shared/ui';
import styles from './UserProfile.module.scss';
import { getImageUrl } from '@shared/lib/imageUrl';
import Image from 'next/image';

export const UserProfile = ({ isOpen }: { isOpen: boolean }) => {
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
        <div className={styles.subscription}>{subscription.toUpperCase()}</div>
      </div>

      <Button className={styles.upgrade}>
        <Image src="/upgrade.svg" alt="Upgrade Icon" width={20} height={20} />
        <span className={styles.upgradeTitle}>Upgrade to Pro</span>
      </Button>
    </div>
  );
};
