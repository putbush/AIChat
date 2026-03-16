import { z } from 'zod';
export declare const AuthResponseSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
    refreshToken: string;
}, {
    accessToken: string;
    refreshToken: string;
}>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
