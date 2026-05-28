import 'server-only';

export const getBackendBaseUrl = () => {
  const baseUrl = process.env.BACKEND_API_URL;

  if (!baseUrl) {
    throw new Error('BACKEND_API_URL is not defined');
  }

  return baseUrl;
};

export const getBackendUrl = (path: string) => {
  return new URL(path, getBackendBaseUrl()).toString();
};
