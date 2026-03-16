import { z } from 'zod';
export declare const MessageSenderSchema: z.ZodEnum<["user", "ai"]>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    chatId: z.ZodString;
    sender: z.ZodEnum<["user", "ai"]>;
    content: z.ZodString;
    timestamp: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    chatId: string;
    sender: "user" | "ai";
    content: string;
    timestamp: Date;
}, {
    id: string;
    chatId: string;
    sender: "user" | "ai";
    content: string;
    timestamp: Date;
}>;
export type Message = z.infer<typeof MessageSchema>;
