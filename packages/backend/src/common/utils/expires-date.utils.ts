export const expiresDate = (ttl: number): Date => {
  return new Date(Date.now() + ttl);
};
