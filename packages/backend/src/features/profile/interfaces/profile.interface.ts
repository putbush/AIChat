export interface IProfileService {
  setAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<{ avatarUrl: string }>;
}
