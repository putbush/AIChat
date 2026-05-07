import { z } from 'zod';
export declare const ChatCreateRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    message: z.ZodObject<{
        chatId: z.ZodOptional<z.ZodString>;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        content: string;
        chatId?: string | undefined;
    }, {
        content: string;
        chatId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    message: {
        content: string;
        chatId?: string | undefined;
    };
}, {
    userId: string;
    message: {
        content: string;
        chatId?: string | undefined;
    };
}>;
export type ChatCreateRequest = z.infer<typeof ChatCreateRequestSchema>;
