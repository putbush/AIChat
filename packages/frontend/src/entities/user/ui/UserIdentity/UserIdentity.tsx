'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './UserIdentity.module.scss';
import { memo } from 'react';

type UserIdentityProps = {
  href: string;
  avatarSrc: string;
  name: string;
  email: string;
  isOpen: boolean;
  className?: string;
};

const UserIdentityComponent = ({
  href,
  avatarSrc,
  name,
  email,
  isOpen,
  className,
}: UserIdentityProps) => {
  return (
    <Link href={href} className={`${styles.userButton} ${className ?? ''}`.trim()}>
      <Image
        src={avatarSrc}
        className={styles.avatar}
        alt="User Avatar"
        width={30}
        height={30}
        unoptimized
      />
      {isOpen && (
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.email}>{email}</span>
        </div>
      )}
    </Link>
  );
};

export const UserIdentity = memo(UserIdentityComponent);