import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtPayload } from './jwt.payload';
import { AuthResponse } from '@aichat/shared';

export interface IAuthService {
  register(
    res: Response,
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse>;
  login(res: Response, email: string, password: string): Promise<AuthResponse>;
  refresh(req: Request, res: Response): Promise<AuthResponse>;
  // logout(res: Response): void;
  validateUser(payload: JwtPayload): Promise<User>;
}
