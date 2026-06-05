import type { SubscriptionType } from '@aichat/shared';
import { PrismaService } from '@infra/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { ERROR_MESSAGES } from '@common/constants';
import {
  AVATAR_IMAGE_SIZE,
  AVATAR_WEBP_EFFORT,
  AVATAR_WEBP_QUALITY,
  AVATARS_PUBLIC_PATH,
  AVATARS_UPLOAD_DIR,
} from './user.constants';
import { hash } from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });
  }

  async setSubscription(
    id: string,
    subscriptionData: SubscriptionType,
  ): Promise<SubscriptionType> {
    const { subscription } = await this.prisma.user.update({
      where: { id },
      data: { subscription: subscriptionData },
    });

    return subscription;
  }

  async setAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ avatarUrl: string }> {
    if (!file) {
      throw new BadRequestException(ERROR_MESSAGES.USER_NO_AVATAR);
    }

    const filePath = await this.uploadAvatar(id, file);

    await this.prisma.user.update({
      where: { id },
      data: { avatarUrl: filePath },
    });

    return { avatarUrl: filePath };
  }

  private async uploadAvatar(id: string, file: Express.Multer.File) {
    const fileName = `${id}.webp`;
    const filePath = path.join(AVATARS_UPLOAD_DIR, fileName);

    if (!fs.existsSync(AVATARS_UPLOAD_DIR)) {
      fs.mkdirSync(AVATARS_UPLOAD_DIR, { recursive: true });
    }

    await sharp(file.buffer)
      .rotate()
      .resize(AVATAR_IMAGE_SIZE, AVATAR_IMAGE_SIZE, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true,
      })
      .webp({
        quality: AVATAR_WEBP_QUALITY,
        effort: AVATAR_WEBP_EFFORT,
      })
      .toFile(filePath);

    return `${AVATARS_PUBLIC_PATH}/${fileName}`;
  }
}
