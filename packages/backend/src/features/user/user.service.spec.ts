import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ERROR_MESSAGES } from '@common/constants';
import { UserService } from './user.service';
import {
  AVATAR_IMAGE_SIZE,
  AVATAR_WEBP_EFFORT,
  AVATAR_WEBP_QUALITY,
  AVATARS_PUBLIC_PATH,
  AVATARS_UPLOAD_DIR,
} from './user.constants';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

jest.mock('sharp', () => jest.fn());

describe('UserService', () => {
  const existsSyncMock = jest.mocked(fs.existsSync);
  const mkdirSyncMock = jest.mocked(fs.mkdirSync);
  const sharpMock = jest.mocked(sharp);
  const rotateMock = jest.fn();
  const resizeMock = jest.fn();
  const webpMock = jest.fn();
  const toFileMock = jest.fn();

  const prisma = {
    user: {
      update: jest.fn(),
    },
  };

  const service = new UserService(prisma as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setSubscription', () => {
    it('updates user subscription and returns the saved value', async () => {
      prisma.user.update.mockResolvedValue({ subscription: 'plus' });

      await expect(service.setSubscription('user-id', 'plus')).resolves.toBe(
        'plus',
      );
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-id' },
        data: { subscription: 'plus' },
      });
    });
  });

  describe('setAvatar', () => {
    beforeEach(() => {
      existsSyncMock.mockReturnValue(false);
      mkdirSyncMock.mockImplementation();
      toFileMock.mockResolvedValue(undefined);
      webpMock.mockReturnValue({ toFile: toFileMock });
      resizeMock.mockReturnValue({ webp: webpMock });
      rotateMock.mockReturnValue({ resize: resizeMock });
      sharpMock.mockReturnValue({ rotate: rotateMock } as never);
    });

    it('throws when avatar file is missing', async () => {
      const result = service.setAvatar('user-id', undefined as never);

      await expect(result).rejects.toBeInstanceOf(BadRequestException);
      await expect(result).rejects.toThrow(ERROR_MESSAGES.USER_NO_AVATAR);
    });

    it('stores avatar file and persists its public path', async () => {
      const buffer = Buffer.from('avatar');
      const file = { buffer } as Express.Multer.File;
      const avatarUrl = `${AVATARS_PUBLIC_PATH}/user-id.webp`;

      prisma.user.update.mockResolvedValue({ avatarUrl });

      await expect(service.setAvatar('user-id', file)).resolves.toEqual({
        avatarUrl,
      });
      expect(mkdirSyncMock).toHaveBeenCalledWith(AVATARS_UPLOAD_DIR, {
        recursive: true,
      });
      expect(sharpMock).toHaveBeenCalledWith(buffer);
      expect(rotateMock).toHaveBeenCalled();
      expect(resizeMock).toHaveBeenCalledWith(
        AVATAR_IMAGE_SIZE,
        AVATAR_IMAGE_SIZE,
        {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: true,
        },
      );
      expect(webpMock).toHaveBeenCalledWith({
        quality: AVATAR_WEBP_QUALITY,
        effort: AVATAR_WEBP_EFFORT,
      });
      expect(toFileMock).toHaveBeenCalledWith(
        path.join(AVATARS_UPLOAD_DIR, 'user-id.webp'),
      );
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-id' },
        data: { avatarUrl },
      });
    });
  });
});
