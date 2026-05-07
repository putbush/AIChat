import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import type { Request, Response } from 'express';
import { ERROR_MESSAGES, RESRESH_TOKEN_COOKIE_NAME } from '@common/constants';
import { JwtPayload } from './interfaces/jwt.payload';
import { User } from '@prisma/client';
import { AuthTokens } from '@aichat/shared';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: number;
  private readonly JWT_REFRESH_TOKEN_TTL: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwt: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL =
      this.configService.getOrThrow<number>('jwt.accessTokenTtl');
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<number>(
      'jwt.refreshTokenTtl',
    );
  }

  async register(
    res: Response,
    name: string,
    email: string,
    password: string,
  ): Promise<AuthTokens> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.AUTH_USER_EXISTS);
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });

    return this.auth(res, user.id);
  }

  async login(
    res: Response,
    email: string,
    password: string,
  ): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS);
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS);
    }

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response): Promise<AuthTokens> {
    const refreshToken = req.cookies[RESRESH_TOKEN_COOKIE_NAME] as string;

    if (!refreshToken) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH_REFRESH_TOKEN_MISSING,
      );
    }

    const payload: JwtPayload = await this.jwt.verifyAsync(refreshToken);
    console.log('payload', payload.id);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH_USER_NOT_FOUND);
    }

    return this.auth(res, user.id);
  }

  private auth(res: Response, id: string): AuthTokens {
    const { accessToken, refreshToken } = this.generateTokens(id);
    return { accessToken, refreshToken };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwt.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });
    return { accessToken, refreshToken };
  }
}
