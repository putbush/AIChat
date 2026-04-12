import { z } from 'zod';
export declare const SubscriptionLevel: z.ZodEnum<["free", "plus", "pro"]>;
export type SubscriptionType = z.infer<typeof SubscriptionLevel>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    subscription: z.ZodEnum<["free", "plus", "pro"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    subscription: "free" | "plus" | "pro";
    avatarUrl?: string | null | undefined;
}, {
    id: string;
    email: string;
    name: string;
    subscription: "free" | "plus" | "pro";
    avatarUrl?: string | null | undefined;
}>;
export declare const SubscriptionResponseSchema: z.ZodObject<{
    subscription: z.ZodEnum<["free", "plus", "pro"]>;
}, "strip", z.ZodTypeAny, {
    subscription: "free" | "plus" | "pro";
}, {
    subscription: "free" | "plus" | "pro";
}>;
export type User = z.infer<typeof UserSchema>;
export type SubscriptionResponse = z.infer<typeof SubscriptionResponseSchema>;
