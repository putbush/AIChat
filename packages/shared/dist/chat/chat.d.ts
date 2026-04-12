import { z } from 'zod';
export declare const ChatSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    userId: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const ChatsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    title: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    userId: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
}>, "many">;
export type Chat = z.infer<typeof ChatSchema>;
