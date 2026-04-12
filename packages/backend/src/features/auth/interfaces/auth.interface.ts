import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtPayload } from './jwt.payload';
import { AuthTokens } from '@aichat/shared';

export interface IAuthService {
  register(
    res: Response,
    name: string,
    email: string,
    password: string,
  ): Promise<AuthTokens>;
  login(res: Response, email: string, password: string): Promise<AuthTokens>;
  refresh(req: Request, res: Response): Promise<AuthTokens>;
  // logout(res: Response): void;
  validateUser(payload: JwtPayload): Promise<User>;
}
