'use client';

import Image from 'next/image';
import styles from './UserIdentity.module.scss';
import { memo } from 'react';
import classNames from 'classnames';
import { Dropdown, MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

type UserIdentityProps = {
  href: string;
  avatarSrc: string;
  name: string;
  email: string;
  isOpen: boolean;
  onLogout?: () => void;
  className?: string;
};

const DROPDOWN_KEYS = {
  Profile: 'profile',
  Logout: 'logout',
} as const;

const UserIdentityComponent = (props: UserIdentityProps) => {
  const { href, avatarSrc, name, email, isOpen, onLogout, className } = props;

  const router = useRouter();

  const dropdownItems: MenuProps['items'] = [
    {
      key: DROPDOWN_KEYS.Profile,
      label: 'Profile',
      icon: <UserOutlined style={{ color: 'white' }} />,
    },
    {
      type: 'divider',
    },
    {
      key: DROPDOWN_KEYS.Logout,
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleDropdownClick: NonNullable<MenuProps['onClick']> = ({ key }) => {
    if (key === DROPDOWN_KEYS.Profile) {
      router.push(href);
    }

    if (key === DROPDOWN_KEYS.Logout) {
      onLogout?.();
    }
  };

  return (
    <Dropdown
      menu={{ items: dropdownItems, onClick: handleDropdownClick, className: styles.dropdown }}
      placement="top"
      arrow
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
