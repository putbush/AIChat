'use client';

import Link from 'next/link';
import { useUser } from '@features/auth/api';
import styles from './UserProfile.module.scss';
import Image from 'next/image';
import { Button } from '@shared/ui';

export const UserProfile = ({ isOpen }: { isOpen: boolean }) => {
  const { id, name, email, subscription } = useUser();

  if (!isOpen) {
    return (
      <Link href="/profile" className={styles.profile}>
        <Image src={`/avatars/${id}.png`} alt="User Avatar" width={30} height={30} />
      </Link>
    );
  }

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <Link href="/profile" className={styles.userButton}>
          <Image src={`/avatars/${id}.png`} alt="User Avatar" width={30} height={30} />
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.email}>{email}</span>
          </div>
        </Link>
        <div className={styles.subscription}>{subscription}</div>
      </div>

      <Button className={styles.upgrade}>
        <Image src="/upgrade.svg" alt="Upgrade Icon" width={20} height={20} />
        <span className={styles.upgradeTitle}>Upgrade to Pro</span>
      </Button>
    </div>
  );
};
