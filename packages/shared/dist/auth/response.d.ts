import { z } from 'zod';
export declare const AuthTokensSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accessToken: string;
    refreshToken: string;
}, {
    accessToken: string;
    refreshToken: string;
}>;
export type AuthTokens = z.infer<typeof AuthTokensSchema>;
