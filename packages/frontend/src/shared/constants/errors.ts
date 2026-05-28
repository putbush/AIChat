export const ERROR_MESSAGES = {
  AUTH_INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  AUTH_EMAIL_IN_USE: 'Email already in use. Please choose a different email.',
  UNAUTHORIZED_RELOGIN: 'Unauthorized. Please log in again.',
  UNEXPECTED: 'An unexpected error occurred. Please try again later.',
  INTERNAL_SERVER: 'Internal server error',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
  UNKNOWN_URL: 'Unknown URL',
  STREAM_REQUEST_NO_BODY: 'Backend stream response body is empty',
  INVALID_API_RESPONSE: (url: string) => `Invalid API response for ${url}`,
  STREAM_REQUEST_FAILED: (status: number) => `Stream request failed with status ${status}`,
  STREAM_REQUEST_FAILED_AFTER_REFRESH: (status: number) =>
    `Stream request failed after refresh with status ${status}`,
} as const;
