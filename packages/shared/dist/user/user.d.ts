import { z } from 'zod';
export declare const SubscriptionLevel: z.ZodEnum<["free", "plus", "pro"]>;
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
export type User = z.infer<typeof UserSchema>;
