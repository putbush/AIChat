import { SubscriptionType } from '@aichat/shared';
import { User } from '@prisma/client';

export interface IUserService {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(name: string, email: string, password: string);
  setSubscription(
    id: string,
    subscriptionData: SubscriptionType,
  ): Promise<SubscriptionType>;
  setAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ avatarUrl: string }>;
}
