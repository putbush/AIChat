import { z } from 'zod';

export const SubscriptionLevel = z.enum(['free', 'plus', 'pro']);
export type SubscriptionType = z.infer<typeof SubscriptionLevel>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(40),
  avatarUrl: z.string().optional().nullable(),
  subscription: SubscriptionLevel,
  updatedAt: z.string().datetime(),
});

export const SubscriptionResponseSchema = z.object({
  subscription: SubscriptionLevel,
});

export type User = z.infer<typeof UserSchema>;
export type SubscriptionResponse = z.infer<typeof SubscriptionResponseSchema>;
