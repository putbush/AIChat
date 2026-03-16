import { z } from 'zod';

export const AvatarUrlResponseSchema = z.object({
  avatarUrl: z.string().min(1),
});

export type AvatarUrlResponse = z.infer<typeof AvatarUrlResponseSchema>;
