import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtPayload } from './jwt.payload';
import { AuthTokens } from '@aichat/shared';

export interface IAuthService {
  register(name: string, email: string, password: string): Promise<AuthTokens>;
  login(email: string, password: string): Promise<AuthTokens>;
  refresh(req: Request): Promise<AuthTokens>;

  validateUser(payload: JwtPayload): Promise<User>;
}
