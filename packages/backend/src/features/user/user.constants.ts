import path from 'path';
import { PUBLIC_DIR, PUBLIC_SERVE_ROOT } from '@common/constants';

export const AVATARS_UPLOAD_DIR = path.join(PUBLIC_DIR, 'avatars');
export const AVATARS_PUBLIC_PATH = `${PUBLIC_SERVE_ROOT}/avatars`;

export const AVATAR_IMAGE_SIZE = 512;
export const AVATAR_WEBP_QUALITY = 90;
export const AVATAR_WEBP_EFFORT = 3;
