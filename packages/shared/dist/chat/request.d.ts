import { z } from 'zod';
export declare const ChatCreateRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    message: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    userId: string;
    message: {
        id: string;
        chatId: string;
        sender: "user" | "ai";
        content: string;
        timestamp: Date;
    };
}, {
    userId: string;
    message: {
        id: string;
        chatId: string;
        sender: "user" | "ai";
        content: string;
        timestamp: Date;
    };
}>;
export type ChatCreateRequest = z.infer<typeof ChatCreateRequestSchema>;
