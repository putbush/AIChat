import { z } from 'zod';
import { SHARED_VALIDATION_ERRORS } from '../common/errors';

export const LoginCredentialsSchema = z.object({
  email: z.string().email(SHARED_VALIDATION_ERRORS.INVALID_EMAIL),
  password: z
    .string()
    .regex(/^[A-Za-z0-9]+$/, SHARED_VALIDATION_ERRORS.PASSWORD_ALNUM_ONLY)
    .min(6),
});

export type LoginDataDTO = z.infer<typeof LoginCredentialsSchema>;
