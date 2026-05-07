import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authorizated, Authorization } from '@common/decorators';
import { SubscriptionMapper, UserMapper } from '@common/mappers';
import type { User } from '@prisma/client';
import type {
  User as UserResponse,
  AvatarUrlResponse,
  SubscriptionResponse,
  SubscriptionType,
} from '@aichat/shared';
import type { Express } from 'express';
import type { IUserService } from './interfaces/user.interface';
import { ERROR_MESSAGES } from '@common/constants';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @Authorization()
  @Get('profile')
  getProfile(@Authorizated() user: User): UserResponse {
    return UserMapper.toDto(user);
  }

  @Authorization()
  @Post('subscription')
  async setSubscription(
    @Authorizated('id') id: string,
    @Body('subscription')
    subscriptionData: SubscriptionType,
  ): Promise<SubscriptionResponse> {
    return SubscriptionMapper.toResponse(
      await this.userService.setSubscription(id, subscriptionData),
    );
  }

  @Authorization()
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('avatar')
  async setAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(jpg|jpeg|png|webp)$/,
            errorMessage: ERROR_MESSAGES.AVATAR_INVALID_FILE_TYPE,
          }),
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            errorMessage: ERROR_MESSAGES.AVATAR_FILE_TOO_LARGE,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Authorizated('id') id: string,
  ): Promise<AvatarUrlResponse> {
    return this.userService.setAvatar(id, file);
  }
}
