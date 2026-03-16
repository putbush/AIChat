import {
  Controller,
  FileTypeValidator,
  Get,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Authorizated, Authorization } from '@common/decorators';
import { UserMapper } from '@common/mappers';
import type { User } from '@prisma/client';
import type { User as UserResponse, AvatarUrlResponse } from '@aichat/shared';
import type { IProfileService } from './interfaces/profile.interface';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject('IProfileService') private readonly profileService: IProfileService,
  ) {}

  @Authorization()
  @Get()
  getProfile(@Authorizated() user: User): UserResponse {
    return UserMapper.toDto(user);
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
            errorMessage: 'Only image files are allowed (jpg, jpeg, png, webp)',
          }),
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            errorMessage: 'File size should not exceed 5MB',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Authorizated('id') id: string,
  ): Promise<AvatarUrlResponse> {
    return await this.profileService.setAvatar(id, file);
  }
}
