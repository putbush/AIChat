import path from 'path';

export const WORKSPACE_ROOT_DIR = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
);

export const PUBLIC_DIR = path.join(WORKSPACE_ROOT_DIR, 'public');

export const PUBLIC_SERVE_ROOT = '/public';
