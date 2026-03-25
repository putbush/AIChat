import { Module } from '@nestjs/common';
import { ChatModule } from '@features/chat/chat.module';
import { AuthModule } from '@features/auth/auth.module';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import config from '@common/config';
import { UserModule } from '@features/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', '..', '..', 'public/'),
      serveRoot: '/public',
    }),
    ChatModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
