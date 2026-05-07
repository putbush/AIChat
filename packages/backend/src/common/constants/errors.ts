export const ERROR_MESSAGES = {
  AUTH_USER_EXISTS: 'User with this email already exists',
  AUTH_INVALID_CREDENTIALS: 'User not found or invalid credentials',
  AUTH_REFRESH_TOKEN_MISSING: 'Refresh token is missing',
  AUTH_USER_NOT_FOUND: 'User not found',
  CHAT_NOT_FOUND: 'Chat not found',
  MESSAGE_LIMIT_OUT_OF_RANGE:
    'Limit must be greater than 0 and less than or equal to 100',
  USER_NO_AVATAR: 'No avatar uploaded',
  TIME_INVALID_FORMAT: 'Invalid time format',
  TIME_INVALID_UNIT: 'Invalid time unit',
  AVATAR_INVALID_FILE_TYPE:
    'Only image files are allowed (jpg, jpeg, png, webp)',
  AVATAR_FILE_TOO_LARGE: 'File size should not exceed 5MB',
  AI_PROVIDER_UNSUPPORTED: (provider: string = 'provider not specified') =>
    `Unsupported AI provider: ${provider}`,
} as const;
