'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './UserIdentity.module.scss';
import { memo } from 'react';
import classNames from 'classnames';

type UserIdentityProps = {
  href: string;
  avatarSrc: string;
  name: string;
  email: string;
  isOpen: boolean;
  className?: string;
};

const UserIdentityComponent = (props: UserIdentityProps) => {
  const { href, avatarSrc, name, email, isOpen, className } = props;

  return (
    <Link href={href} className={classNames(styles.userButton, className)}>
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
