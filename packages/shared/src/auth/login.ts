import { z } from 'zod';

export const LoginCredentialsSchema = z.object({
  email: z.string().email("Please, input a valid email address"),
  password: z.string().regex(/^[A-Za-z0-9]+$/, 'Password must contain only letters and numbers').min(6),
});

export type LoginDataDTO = z.infer<typeof LoginCredentialsSchema>;
