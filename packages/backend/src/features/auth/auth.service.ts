import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import type { Request, Response } from 'express';
import {
  CONFIG_KEYS,
  ERROR_MESSAGES,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@common/constants';
import { JwtPayload } from './interfaces/jwt.payload';
import { User } from '@prisma/client';
import { AuthTokens } from '@aichat/shared';
import { UserService } from '@features/user/user.service';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: number;
  private readonly JWT_REFRESH_TOKEN_TTL: number;

  constructor(
    private readonly configService: ConfigService,
    @Inject('IUserService') private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<number>(
      CONFIG_KEYS.JWT.ACCESS_TOKEN_TTL,
    );
    this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<number>(
      CONFIG_KEYS.JWT.REFRESH_TOKEN_TTL,
    );
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthTokens> {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.AUTH_USER_EXISTS);
    }

    const user = await this.userService.createUser(name, email, password);

    return this.auth(user.id);
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS);
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS);
    }

    return this.auth(user.id);
  }

  async refresh(req: Request): Promise<AuthTokens> {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] as string;

    if (!refreshToken) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH_REFRESH_TOKEN_MISSING,
      );
    }

    try {
      const payload: string = await this.jwt.verifyAsync(refreshToken);

      const user = await this.userService.findById(payload.id);

      if (!user) {
        throw new UnauthorizedException(ERROR_MESSAGES.USER_NOT_FOUND);
      }

      return this.auth(user.id);
    } catch {
      throw new UnauthorizedException(
        ERROR_MESSAGES.AUTH_INVALID_REFRESH_TOKEN,
      );
    }
  }

  private auth(id: string): AuthTokens {
    const { accessToken, refreshToken } = this.generateTokens(id);
    return { accessToken, refreshToken };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER_NOT_FOUND);
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
