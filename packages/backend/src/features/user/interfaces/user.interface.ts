import { SubscriptionType } from '@aichat/shared';
import type { Express } from 'express';

export interface IUserService {
  setSubscription(
    id: string,
    subscriptionData: SubscriptionType,
  ): Promise<SubscriptionType>;
  setAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ avatarUrl: string }>;
}
