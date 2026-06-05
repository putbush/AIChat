import {
  type LoginDataDTO,
  type RegistrationDataDTO,
  LoginCredentialsSchema,
  RegistrationDataSchema,
} from '@aichat/shared';
import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ZodExceptionPipe } from '@common/pipes';
import type { Request } from 'express';
import type { IAuthService } from './interfaces/auth.interface';
import type { AuthTokens } from '@aichat/shared';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  @Post('register')
  async register(
    @Body(new ZodExceptionPipe(RegistrationDataSchema))
    registrationDto: RegistrationDataDTO,
  ): Promise<AuthTokens> {
    const { name, email, password } = registrationDto;

    return await this.authService.register(name, email, password);
  }

  @Post('login')
  async login(
    @Body(new ZodExceptionPipe(LoginCredentialsSchema))
    loginDto: LoginDataDTO,
  ): Promise<AuthTokens> {
    const { email, password } = loginDto;

    return await this.authService.login(email, password);
  }

  @Post('refresh')
  async refresh(@Req() req: Request): Promise<AuthTokens> {
    return await this.authService.refresh(req);
  }
}
