import { NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGES } from '@common/constants';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  const prisma = {
    chat: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const service = new ChatService(prisma as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns user chats ordered from newest to oldest', async () => {
    const chats = [{ id: 'chat-1' }, { id: 'chat-2' }];
    prisma.chat.findMany.mockResolvedValue(chats);

    await expect(service.getAllChats('user-id')).resolves.toBe(chats);
    expect(prisma.chat.findMany).toHaveBeenCalledWith({
      where: {
        userID: 'user-id',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

  it('throws when requested chat does not belong to the user', async () => {
    prisma.chat.findFirst.mockResolvedValue(null);

    await expect(
      service.getUserChatOrThrow('user-id', 'chat-id'),
    ).rejects.toBeInstanceOf(NotFoundException);
    await expect(
      service.getUserChatOrThrow('user-id', 'chat-id'),
    ).rejects.toThrow(ERROR_MESSAGES.CHAT_NOT_FOUND);
  });

  it('creates a new chat when chat id is not provided', async () => {
    const chat = { id: 'chat-id', userID: 'user-id', title: 'Hello there' };
    prisma.chat.create.mockResolvedValue(chat);

    await expect(
      service.getOrCreateForUser('user-id', 'Hello there from tests'),
    ).resolves.toEqual({ chat, isCreated: true });
    expect(prisma.chat.create).toHaveBeenCalledWith({
      data: {
        userID: 'user-id',
        title: 'Hello there from tests',
      },
    });
  });

  it('returns an existing chat when chat id is provided', async () => {
    const chat = { id: 'chat-id', userID: 'user-id' };
    prisma.chat.findFirst.mockResolvedValue(chat);

    await expect(
      service.getOrCreateForUser('user-id', 'Ignored title', 'chat-id'),
    ).resolves.toEqual({ chat, isCreated: false });
    expect(prisma.chat.findFirst).toHaveBeenCalledWith({
      where: { id: 'chat-id', userID: 'user-id' },
    });
  });
});
