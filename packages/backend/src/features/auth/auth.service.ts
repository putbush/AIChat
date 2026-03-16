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
import { RESRESH_TOKEN_COOKIE_NAME } from '@common/constants';
import { JwtPayload } from './interfaces/jwt.payload';
import { User } from '@prisma/client';
import { AuthResponse } from '@aichat/shared';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: number;
  private readonly JWT_REFRESH_TOKEN_TTL: number;
  private readonly COOKIE_DOMAIN: string;

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
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('cookie.domain');
  }

  async register(
    res: Response,
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
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
  ): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found or invalid credentials');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User not found or invalid credentials');
    }

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response): Promise<AuthResponse> {
    const refreshToken = req.cookies[RESRESH_TOKEN_COOKIE_NAME] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const payload: JwtPayload = await this.jwt.verifyAsync(refreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.auth(res, user.id);
  }

  // logout(res: Response): void {
  //   this.setCookie(res, RESRESH_TOKEN_COOKIE_NAME, new Date(0));
  // }

  private auth(res: Response, id: string): AuthResponse {
    const { accessToken, refreshToken } = this.generateTokens(id);

    // this.setCookie(res, refreshToken, expiresDate(this.JWT_REFRESH_TOKEN_TTL));

    return { accessToken, refreshToken };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
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

  // private setCookie(res: Response, value: string, expires: Date) {
  //   res.cookie(RESRESH_TOKEN_COOKIE_NAME, value, {
  //     httpOnly: true,
  //     ...(isDev(this.configService) ? {} : { domain: this.COOKIE_DOMAIN }),
  //     secure: !isDev(this.configService),
  //     sameSite: 'lax',
  //     expires,
  //   });
  // }
}
