import { User } from '@prisma/client';
import { User as UserDto } from '@aichat/shared';
import { SubscriptionMapper } from './subscription.mapper';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      subscription: SubscriptionMapper.toDto(user.subscription),
      avatarUrl: user.avatarUrl ?? null,
    };
  }
}
