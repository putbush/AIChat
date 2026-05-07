import { RegistrationDataSchema } from '@aichat/shared';
import { z } from 'zod';
import { ERROR_MESSAGES } from '@shared/constants/errors';

export const RegistrationSchema = RegistrationDataSchema.extend({
  confirmPassword: RegistrationDataSchema.shape.password,
}).refine((data) => data.password === data.confirmPassword, {
  message: ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH,
  path: ['confirmPassword'],
});

export type RegistrationDTO = z.infer<typeof RegistrationSchema>;
