import { z } from 'zod';
export declare const MessageSenderSchema: z.ZodEnum<["user", "ai"]>;
export type MessageSender = z.infer<typeof MessageSenderSchema>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodString;
    chatId: z.ZodString;
    sender: z.ZodEnum<["user", "ai"]>;
    content: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    chatId: string;
    sender: "user" | "ai";
    content: string;
}, {
    id: string;
    createdAt: Date;
    chatId: string;
    sender: "user" | "ai";
    content: string;
}>;
export declare const MessagesSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    chatId: z.ZodString;
    sender: z.ZodEnum<["user", "ai"]>;
    content: z.ZodString;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    chatId: string;
    sender: "user" | "ai";
    content: string;
}, {
    id: string;
    createdAt: Date;
    chatId: string;
    sender: "user" | "ai";
    content: string;
}>, "many">;
export type Message = z.infer<typeof MessageSchema>;
