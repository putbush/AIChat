import type { SubscriptionResponse, SubscriptionType } from '@aichat/shared';
import { Subscription } from '@prisma/client';

export class SubscriptionMapper {
  static toPrisma(subscription: SubscriptionType): Subscription {
    return subscription as Subscription;
  }

  static toDto(subscription: Subscription): SubscriptionType {
    return subscription as SubscriptionType;
  }

  static toResponse(subscription: SubscriptionType): SubscriptionResponse {
    return {
      subscription,
    };
  }
}
