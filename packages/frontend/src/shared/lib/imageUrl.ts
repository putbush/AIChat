export const getImageUrl = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith('/') ? path : '/' + path}`;
};