import { z } from 'zod';
export declare const CreateMessageSchema: z.ZodObject<{
    content: z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>;
    chatId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content: string;
    chatId?: string | undefined;
}, {
    content: string;
    chatId?: string | undefined;
}>;
export type CreateMessage = z.infer<typeof CreateMessageSchema>;
