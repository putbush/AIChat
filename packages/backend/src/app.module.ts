import { Module } from '@nestjs/common';
import { ChatModule } from '@features/chat/chat.module';
import { AuthModule } from '@features/auth/auth.module';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@features/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MessageModule } from '@features/message/message.module';
import config from '@common/config';
import { PUBLIC_DIR, PUBLIC_SERVE_ROOT } from '@common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: PUBLIC_DIR,
      serveRoot: PUBLIC_SERVE_ROOT,
    }),
    ChatModule,
    UserModule,
    PrismaModule,
    MessageModule,
  ],
})
export class AppModule {}
