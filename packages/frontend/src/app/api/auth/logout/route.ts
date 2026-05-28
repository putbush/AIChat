import { clearAuthCookies } from '@shared/lib/cookies';
import { NextResponse } from 'next/server';

export const POST = async () => {
    const response = NextResponse.json({ ok: true });

    clearAuthCookies(response.cookies);

    return response;
};
