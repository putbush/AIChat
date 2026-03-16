import { z } from 'zod';
export declare const IdSchema: z.ZodString;
export type Id = z.infer<typeof IdSchema>;
