import 'server-only';

export const getBackendBaseUrl = () => {
  const host = process.env.BACKEND_API_URL;
  const port = process.env.BACKEND_API_PORT;

  if (!host || !port) {
    throw new Error('BACKEND_API_URL or BACKEND_API_PORT is not defined');
  }

  return `http://${host}:${port}`;
};

export const getBackendUrl = (path: string) => {
  return new URL(path, getBackendBaseUrl()).toString();
};
