import {
  type LoginDataDTO,
  type RegistrationDataDTO,
  LoginCredentialsSchema,
  RegistrationDataSchema,
} from '@aichat/shared';
import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ZodExceptionPipe } from '@common/pipes';
import type { Request, Response } from 'express';
import type { IAuthService } from './interfaces/auth.interface';
import type { AuthTokens } from '@aichat/shared';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
  ) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body(new ZodExceptionPipe(RegistrationDataSchema))
    registrationDto: RegistrationDataDTO,
  ): Promise<AuthTokens> {
    const { name, email, password } = registrationDto;

    return await this.authService.register(res, name, email, password);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body(new ZodExceptionPipe(LoginCredentialsSchema))
    loginDto: LoginDataDTO,
  ): Promise<AuthTokens> {
    const { email, password } = loginDto;

    return await this.authService.login(res, email, password);
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokens> {
    return await this.authService.refresh(req, res);
  }

  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // logout(@Res({ passthrough: true }) res: Response) {
  //   return this.authService.logout(res);
  // }
}
