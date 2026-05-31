import type { MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

export const USER_IDENTITY_MENU_KEYS = {
  Profile: 'profile',
  Logout: 'logout',
} as const;

export const createUserIdentityMenuItems = (): MenuProps['items'] => [
  {
    key: USER_IDENTITY_MENU_KEYS.Profile,
    label: 'Profile',
    icon: <UserOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: USER_IDENTITY_MENU_KEYS.Logout,
    label: 'Logout',
    icon: <LogoutOutlined />,
    danger: true,
  },
];