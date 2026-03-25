import { z } from 'zod';

export const SubscriptionLevel = z.enum(['free', 'plus', 'pro']);

export type SubscriptionType = z.infer<typeof SubscriptionLevel>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(40),
  avatarUrl: z.string().url().optional().nullable(),
  subscription: SubscriptionLevel,
});

export type User = z.infer<typeof UserSchema>;
