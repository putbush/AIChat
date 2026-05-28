import {
  MessagesPage,
  MessageStreamEventType,
  type Message,
  type MessageStreamEvent,
} from '@aichat/shared';
import { ERROR_MESSAGES } from '@shared/constants/errors';
import { LINK_PATHS } from '@shared/constants/routes';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { STREAMING_AI_MESSAGE_ID } from './constants';

type MessagesInfiniteData = InfiniteData<MessagesPage>;

const createTempMessage = (
  chatId: string,
  sender: Message['sender'],
  content: string,
): Message => ({
  id: crypto.randomUUID(),
  chatId,
  sender,
  content,
  createdAt: new Date(),
});

const createStreamingAiMessage = (chatId: string): Message => ({
  id: STREAMING_AI_MESSAGE_ID,
  chatId,
  sender: 'ai',
  content: '',
  createdAt: new Date(),
});

const createFailedMessage = () => 'failed-' + crypto.randomUUID();

export const useStreamingMessage = (chatId?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const activeChatIdRef = useRef<string | undefined>(chatId);
  const pendingContentRef = useRef('');
  const tempUserMessageIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    activeChatIdRef.current = chatId;
  }, [chatId]);

  const getActiveQueryKey = () => {
    const activeChatId = activeChatIdRef.current;

    return activeChatId ? [activeChatId] : null;
  };

  const updateNewestMessagesPage = (
    queryKey: string[],
    updater: (messages: Message[]) => Message[],
  ) => {
    queryClient.setQueryData<MessagesInfiniteData>(queryKey, (old) => {
      if (!old) {
        return old;
      }

      return {
        ...old,
        pages: old.pages.map((page, index) => {
          if (index !== 0) {
            return page;
          }

          return {
            ...page,
            items: updater(page.items),
          };
        }),
      };
    });
  };

  const replaceMessageId = (oldId: string | undefined, newId: string, content?: string) => {
    const queryKey = getActiveQueryKey();

    if (!queryKey || !oldId) {
      return;
    }
    updateNewestMessagesPage(queryKey, (messages) =>
      messages.map((message) =>
        message.id === oldId
          ? { ...message, id: newId, ...(content !== undefined ? { content } : {}) }
          : message,
      ),
    );
  };

  const addOptimisticMessages = (chatId: string, content: string) => {
    const userMessage = createTempMessage(chatId, 'user', content);
    const aiMessage = createStreamingAiMessage(chatId);

    tempUserMessageIdRef.current = userMessage.id;

    queryClient.setQueryData<MessagesInfiniteData>([chatId], (old) => {
      const optimisticMessages = [userMessage, aiMessage];

      if (!old) {
        return {
          pages: [
            {
              items: optimisticMessages,
              nextCursor: null,
            },
          ],
          pageParams: [undefined],
        };
      }

      const firstPage = old.pages[0];

      if (!firstPage) {
        return {
          ...old,
          pages: [
            {
              items: optimisticMessages,
              nextCursor: null,
            },
          ],
        };
      }

      return {
        ...old,
        pages: old.pages.map((page, index) => {
          if (index !== 0) {
            return page;
          }

          return {
            ...page,
            items: [...page.items, userMessage, aiMessage],
          };
        }),
      };
    });
  };

  const appendChunk = (chunk: string) => {
    const queryKey = getActiveQueryKey();

    if (!queryKey) {
      return;
    }
    updateNewestMessagesPage(queryKey, (messages) =>
      messages.map((message) =>
        message.id === STREAMING_AI_MESSAGE_ID
          ? {
              ...message,
              content: message.content + chunk,
            }
          : message,
      ),
    );
  };

  const finish = async () => {
    const queryKey = getActiveQueryKey();

    if (!queryKey) {
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ['chats'] });
  };

  const error = (errorMessage: string = ERROR_MESSAGES.UNEXPECTED) => {
    const queryKey = getActiveQueryKey();

    if (!queryKey) {
      return;
    }

    updateNewestMessagesPage(queryKey, (messages) =>
      messages.map((message) =>
        message.id === STREAMING_AI_MESSAGE_ID
          ? {
              ...message,
              id: createFailedMessage(),
              content: errorMessage,
            }
          : message,
      ),
    );
  };

  const start = (content: string) => {
    pendingContentRef.current = content;

    if (!chatId) {
      return;
    }

    activeChatIdRef.current = chatId;
    addOptimisticMessages(chatId, content);
  };

  const handleChatEvent = (
    event: Extract<MessageStreamEvent, { type: typeof MessageStreamEventType.Chat }>,
  ) => {
    activeChatIdRef.current = event.chatId;

    if (!event.isCreated) {
      return;
    }

    router.push(LINK_PATHS.CHAT(event.chatId));
    addOptimisticMessages(event.chatId, pendingContentRef.current);
  };

  const handleEvent = (event: MessageStreamEvent) => {
    switch (event.type) {
      case MessageStreamEventType.Chat:
        handleChatEvent(event);
        break;

      case MessageStreamEventType.UserMessage:
        replaceMessageId(tempUserMessageIdRef.current, event.messageId);
        break;

      case MessageStreamEventType.AIMessage:
        replaceMessageId(STREAMING_AI_MESSAGE_ID, event.messageId, event.content);
        break;

      case MessageStreamEventType.Chunk:
        appendChunk(event.text);
        break;

      case MessageStreamEventType.Done:
        void finish();
        break;

      case MessageStreamEventType.Error:
        error();
        void finish();
        break;
    }
  };

  return {
    start,
    handleEvent,
    appendChunk,
    finish,
    error,
  };
};
