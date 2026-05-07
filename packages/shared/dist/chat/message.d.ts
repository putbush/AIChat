import { z } from 'zod';
export declare const MessageSenderSchema: z.ZodEnum<["user", "ai"]>;
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
export declare const MessageSchema: z.ZodObject<{
    chatId: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
} & {
    id: z.ZodString;
    sender: z.ZodEnum<["user", "ai"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    content: string;
    sender: "user" | "ai";
    chatId?: string | undefined;
}, {
    id: string;
    content: string;
    sender: "user" | "ai";
    chatId?: string | undefined;
}>;
export type CreateMessage = z.infer<typeof CreateMessageSchema>;
export type Message = z.infer<typeof MessageSchema>;
