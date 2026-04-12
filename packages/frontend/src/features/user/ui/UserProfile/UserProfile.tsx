'use client';

import Link from 'next/link';
import { useUser, UserIdentity } from '@entities/user';
import { Button } from '@shared/ui';
import styles from './UserProfile.module.scss';
import { getImageUrl } from '@shared/lib/imageUrl';
import Image from 'next/image';
import type { SidebarVariant } from '@shared/lib/sidebar/sidebarVariant';
import classNames from 'classnames';

type UserProfileProps = { variant: SidebarVariant; toggleUpgradeModal: () => void };

export const UserProfile = (props: UserProfileProps) => {
  const { variant, toggleUpgradeModal } = props;
  const { data, error } = useUser();
  const isExpanded = variant === 'expanded';

  if (error || !data) {
    return (
      <Link
        href="/login"
        className={classNames(styles.profile, styles.login, {
          [styles.compact]: !isExpanded,
        })}
      >
        {!isExpanded ? (
          <>
            <Image
              src="/icons/unknown-user.svg"
              className={styles.avatar}
              alt="Default Avatar"
              width={24}
              height={24}
            />
          </>
        ) : <span>Login</span>}
      </Link>
    );
  }

  const { name, email, subscription, avatarUrl } = data;

  const avatarSrc = avatarUrl ? getImageUrl(avatarUrl) : 'avatars/default.png';

  return (
    <div
      className={classNames(styles.profile, {
        [styles.compact]: !isExpanded,
      })}
    >
      <div className={styles.header}>
        <UserIdentity
          href="/profile"
          avatarSrc={avatarSrc}
          name={name}
          email={email}
          isOpen={isExpanded}
          className={styles.userIdentity}
        />
        {isExpanded && (
          <span className={styles.subscriptionBadge}>{subscription.toUpperCase()}</span>
        )}
      </div>

      {isExpanded && (
        <Button className={styles.upgrade} onClick={toggleUpgradeModal}>
          <Image src="/icons/upgrade.svg" alt="Upgrade Icon" width={20} height={20} />
          <span className={styles.upgradeTitle}>Upgrade Plan</span>
        </Button>
      )}
    </div>
  );
};
