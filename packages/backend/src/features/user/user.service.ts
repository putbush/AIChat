import type { SubscriptionType } from '@aichat/shared';
import { PrismaService } from '@infra/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Subscription } from '@prisma/client';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async setSubscription(
    id: string,
    subscriptionData: SubscriptionType,
  ): Promise<{ subscription: SubscriptionType }> {
    const { subscription } = await this.prisma.user.update({
      where: { id },
      data: { subscription: subscriptionData as Subscription },
    });

    return { subscription };
  }

  async setAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ avatarUrl: string }> {
    if (!file) {
      throw new BadRequestException('No avatar uploaded');
    }

    const filePath = this.uploadAvatar(id, file);

    await this.prisma.user.update({
      where: { id },
      data: { avatarUrl: filePath },
    });

    return { avatarUrl: filePath };
  }

  private uploadAvatar(id: string, file: Express.Multer.File) {
    const uploadDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      '..',
      'public',
      'avatars',
    );
    const filePath = path.join(uploadDir, `${id}.webp`);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.buffer);
    return `/public/avatars/${id}.webp`;
  }
}
