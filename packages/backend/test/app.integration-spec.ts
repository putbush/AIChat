import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import type { Request } from 'express';
import { AuthController } from '@features/auth/auth.controller';
import { ChatController } from '@features/chat/chat.controller';
import { JwtGuard } from '@common/guards';
import { User } from '@prisma/client';

describe('Backend controllers (integration)', () => {
  let app: INestApplication<App>;
  const authService = {
    login: jest.fn(),
    refresh: jest.fn(),
    register: jest.fn(),
  };
  const chatService = {
    getAllChats: jest.fn(),
    getUserChatOrThrow: jest.fn(),
  };

  const user: User = {
    id: '11111111-1111-4111-8111-111111111111',
    email: 'user@example.com',
    name: 'Test User',
    password: 'hashed-password',
    avatarUrl: null,
    subscription: 'free',
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController, ChatController],
      providers: [
        {
          provide: 'IAuthService',
          useValue: authService,
        },
        {
          provide: 'IChatService',
          useValue: chatService,
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context
            .switchToHttp()
            .getRequest<Request & { user: User }>();
          req.user = user;
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /auth/register validates request body', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'A',
        email: 'not-email',
        password: 'bad!',
      })
      .expect(400);

    expect(authService.register).not.toHaveBeenCalled();
  });

  it('POST /auth/register returns auth tokens for valid data', async () => {
    const tokens = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };
    authService.register.mockResolvedValue(tokens);

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'user@example.com',
        password: 'Secret123',
      })
      .expect(201)
      .expect(tokens);

    expect(authService.register).toHaveBeenCalledWith(
      expect.any(Object),
      'Test User',
      'user@example.com',
      'Secret123',
    );
  });

  it('GET /chats returns authorized user chats', async () => {
    const chat = {
      id: '22222222-2222-4222-8222-222222222222',
      userID: user.id,
      title: 'First chat',
      createdAt: new Date('2026-01-03T00:00:00.000Z'),
      updatedAt: new Date('2026-01-04T00:00:00.000Z'),
    };
    chatService.getAllChats.mockResolvedValue([chat]);

    await request(app.getHttpServer())
      .get('/chats')
      .expect(200)
      .expect([
        {
          id: chat.id,
          userId: user.id,
          title: chat.title,
          createdAt: chat.createdAt.toISOString(),
          updatedAt: chat.updatedAt.toISOString(),
        },
      ]);

    expect(chatService.getAllChats).toHaveBeenCalledWith(user.id);
  });
});
