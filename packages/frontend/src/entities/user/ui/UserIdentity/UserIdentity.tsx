'use client';

import Image from 'next/image';
import styles from './UserIdentity.module.scss';
import { memo } from 'react';
import classNames from 'classnames';
import { Dropdown, MenuProps } from 'antd';
import { createUserIdentityMenuItems, USER_IDENTITY_MENU_KEYS } from './UserIdentityMenuItems';
import { getImageUrl } from '@shared/lib/imageUrl';
import { User } from '@aichat/shared';
import { ASSETS } from '@shared/constants/assets';

type UserIdentityUser = Pick<User, 'avatarUrl' | 'name' | 'email' | 'updatedAt'>;

type UserIdentityProps = {
  user: UserIdentityUser;
  isOpen: boolean;
  onProfileClick?: () => void;
  onLogout?: () => void;
  className?: string;
};

const UserIdentityComponent = (props: UserIdentityProps) => {
  const { user, isOpen, onProfileClick, onLogout, className } = props;
  const { avatarUrl, name, email, updatedAt } = user;

  const avatarSrc: string = avatarUrl ? getImageUrl(avatarUrl, updatedAt) : ASSETS.AVATARS.DEFAULT_USER;

  const items = createUserIdentityMenuItems();

  const handleDropdownClick: NonNullable<MenuProps['onClick']> = ({ key }) => {
    if (key === USER_IDENTITY_MENU_KEYS.Profile) {
      onProfileClick?.();
    }

    if (key === USER_IDENTITY_MENU_KEYS.Logout) {
      onLogout?.();
    }
  };

  return (
    <Dropdown
      menu={{ items: items, onClick: handleDropdownClick, className: styles.dropdown }}
      placement="top"
    >
      <div className={classNames(styles.userButton, className)}>
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
      </div>
    </Dropdown>
  );
};

export const UserIdentity = memo(UserIdentityComponent);
