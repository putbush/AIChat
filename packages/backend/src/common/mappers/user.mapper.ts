import { User } from '@prisma/client';
import { User as UserDto } from '@aichat/shared';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      subscription: user.subscription as UserDto['subscription'],
      avatarUrl: user.avatarUrl ?? null,
    };
  }
}
