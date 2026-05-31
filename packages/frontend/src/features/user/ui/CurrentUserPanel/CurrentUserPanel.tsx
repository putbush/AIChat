'use client';

import Link from 'next/link';
import { useUser, UserIdentity } from '@entities/user';
import { Button } from '@shared/ui';
import styles from './CurrentUserPanel.module.scss';
import Image from 'next/image';
import type { SidebarVariant } from '@shared/lib/sidebar/sidebarVariant';
import classNames from 'classnames';
import { LINK_PATHS } from '@shared/constants/routes';
import { useLogout } from '@features/auth/api';
import { useRouter } from 'next/navigation';
import { UNKNOWN_USER_ICON_SRC, UPGRADE_ICON_SRC } from './constants';

type CurrentUserPanelProps = { variant: SidebarVariant; toggleUpgradeModal: () => void };

export const CurrentUserPanel = (props: CurrentUserPanelProps) => {
  const { variant, toggleUpgradeModal } = props;

  const { data, error } = useUser();
  const logout = useLogout();
  const router = useRouter();

  const isExpanded = variant === 'expanded';

  if (error || !data) {
    return (
      <Link
        href={LINK_PATHS.LOGIN}
        className={classNames(styles.profile, styles.login, {
          [styles.compact]: !isExpanded,
        })}
      >
        {!isExpanded ? (
          <>
            <Image
              src={UNKNOWN_USER_ICON_SRC}
              className={styles.avatar}
              alt="Default Avatar"
              width={24}
              height={24}
            />
          </>
        ) : (
          <span>Login</span>
        )}
      </Link>
    );
  }

  const { name, email, subscription, avatarUrl, updatedAt } = data;

  return (
    <div
      className={classNames(styles.profile, {
        [styles.compact]: !isExpanded,
      })}
    >
      <div className={styles.header}>
        <UserIdentity
          user={{ avatarUrl, name, email, updatedAt }}
          isOpen={isExpanded}
          onProfileClick={() => router.push(LINK_PATHS.PROFILE)}
          onLogout={logout}
          className={styles.userIdentity}
        />
        {isExpanded && (
          <span className={styles.subscriptionBadge}>{subscription.toUpperCase()}</span>
        )}
      </div>

      {isExpanded && (
        <Button className={styles.upgrade} variant="secondary" onClick={toggleUpgradeModal}>
          <Image src={UPGRADE_ICON_SRC} alt="Upgrade Icon" width={20} height={20} />
          <span className={styles.upgradeTitle}>Upgrade Plan</span>
        </Button>
      )}
    </div>
  );
};
