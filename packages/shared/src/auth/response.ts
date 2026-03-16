import { z } from 'zod';

export const AuthResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
