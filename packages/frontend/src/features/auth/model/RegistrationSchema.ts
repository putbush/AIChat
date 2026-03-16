import { RegistrationDataSchema } from '@aichat/shared';
import { z } from 'zod';

export const RegistrationSchema = RegistrationDataSchema.extend({
  confirmPassword: RegistrationDataSchema.shape.password,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegistrationDTO = z.infer<typeof RegistrationSchema>;
