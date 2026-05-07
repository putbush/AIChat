export const BACKEND_API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  CHAT: {
    LIST: '/chats',
    GET: (chatId: string) => `/chats/${chatId}`,
  },
  USER: {
    PROFILE: '/user/profile',
    SUBSCRIPTION: '/user/subscription',
  },
  MESSAGE: {
    SEND: '/message',
    LIST: (chatId: string) => `/message/${chatId}`,
  },
} as const;

export const FRONTEND_API_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  CHAT: {
    LIST: '/chats',
    GET: (chatId: string) => `/chats/${chatId}`,
  },
  USER: {
    PROFILE: '/user/profile',
    SUBSCRIPTION: '/user/subscription',
  },
  MESSAGE: {
    SEND: '/message',
    LIST: (chatId: string) => `/message/${chatId}`,
  },
} as const;

export const LINK_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  CHAT: (chatId: string) => `/chats/${chatId}`,
} as const;
