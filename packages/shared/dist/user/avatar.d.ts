import { z } from 'zod';
export declare const AvatarUrlResponseSchema: z.ZodObject<{
    avatarUrl: z.ZodString;
}, "strip", z.ZodTypeAny, {
    avatarUrl: string;
}, {
    avatarUrl: string;
}>;
export type AvatarUrlResponse = z.infer<typeof AvatarUrlResponseSchema>;
