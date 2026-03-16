import { z } from 'zod';

export const RegistrationDataSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Please, input a valid email address"),
  password: z.string().regex(/^[A-Za-z0-9]+$/, 'Password must contain only letters and numbers').min(6),
});

export type RegistrationDataDTO = z.infer<typeof RegistrationDataSchema>;
