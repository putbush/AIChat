export const BACKEND_API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  CHATS: {
    LIST: '/chats',
  },
  USER: {
    PROFILE: '/user/profile',
    SUBSCRIPTION: '/user/subscription',
  },
} as const;

export const FRONTEND_API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  CHATS: {
    LIST: '/chats',
  },
  USER: {
    PROFILE: '/user/profile',
    SUBSCRIPTION: '/user/subscription',
  },
} as const;
