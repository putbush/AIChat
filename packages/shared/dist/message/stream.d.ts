import { z } from 'zod';
export declare const MessageStreamEventType: {
    readonly Chat: "chat";
    readonly UserMessage: "userMessage";
    readonly AIMessage: "aiMessage";
    readonly Chunk: "chunk";
    readonly Done: "done";
    readonly Error: "error";
};
export declare const MessageStreamEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"chat">;
    chatId: z.ZodString;
    isCreated: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: "chat";
    chatId: string;
    isCreated: boolean;
}, {
    type: "chat";
    chatId: string;
    isCreated: boolean;
}>, z.ZodObject<{
    type: z.ZodLiteral<"userMessage">;
    messageId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "userMessage";
    messageId: string;
}, {
    type: "userMessage";
    messageId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"aiMessage">;
    messageId: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "aiMessage";
    content: string;
    messageId: string;
}, {
    type: "aiMessage";
    content: string;
    messageId: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"chunk">;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "chunk";
    text: string;
}, {
    type: "chunk";
    text: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"done">;
}, "strip", z.ZodTypeAny, {
    type: "done";
}, {
    type: "done";
}>, z.ZodObject<{
    type: z.ZodLiteral<"error">;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "error";
}, {
    message: string;
    type: "error";
}>]>;
export type MessageStreamEvent = z.infer<typeof MessageStreamEventSchema>;
