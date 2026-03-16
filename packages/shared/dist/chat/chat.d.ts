import { z } from 'zod';
export declare const ChatSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    title: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export type Chat = z.infer<typeof ChatSchema>;
