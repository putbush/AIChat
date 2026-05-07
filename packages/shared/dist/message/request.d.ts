import { z } from 'zod';
export declare const CreateMessageSchema: z.ZodObject<{
    chatId: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    chatId?: string | undefined;
}, {
    content: string;
    chatId?: string | undefined;
}>;
export type CreateMessage = z.infer<typeof CreateMessageSchema>;
