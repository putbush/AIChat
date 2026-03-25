import { SubscriptionType } from '@aichat/shared';

export interface IUserService {
  setSubscription(
    id: string,
    subscriptionData: SubscriptionType,
  ): Promise<{ subscription: SubscriptionType }>;
  setAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ avatarUrl: string }>;
}
