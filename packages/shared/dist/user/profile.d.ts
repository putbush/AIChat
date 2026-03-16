import { z } from 'zod';
export declare const UserProfileSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    subscription: z.ZodEnum<["free", "plus", "pro"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "id" | "email" | "name" | "avatarUrl" | "subscription">, "strip", z.ZodTypeAny, {
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
export type UserProfile = z.infer<typeof UserProfileSchema>;
