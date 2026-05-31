export const getImageUrl = (path: string, updatedAt?: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith('/') ? path : `/${path}`}`;

  if (!updatedAt) {
    return url;
  }

  return `${url}?updatedAt=${updatedAt}`;
};
