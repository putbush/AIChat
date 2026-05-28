import {
  CreateMessage,
  MessageStreamEvent,
  MessageStreamEventSchema,
  MessageStreamEventType,
} from '@aichat/shared';
import { ERROR_MESSAGES } from '@shared/constants/errors';
import { FRONTEND_API_PATHS } from '@shared/constants/routes';

type StreamMessageParams = {
  payload: CreateMessage;
  onEvent: (event: MessageStreamEvent) => void;
};

const parseNdjsonLine = (line: string): MessageStreamEvent => {
  const data = JSON.parse(line);
  const parsed = MessageStreamEventSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(ERROR_MESSAGES.UNEXPECTED);
  }

  return parsed.data;
};

const handleStreamLine = (line: string, onEvent: (event: MessageStreamEvent) => void): boolean => {
  const event = parseNdjsonLine(line);

  onEvent(event);

  if (event.type === MessageStreamEventType.Error) {
    throw new Error(event.message);
  }

  return event.type === MessageStreamEventType.Done;
};

const readStreamEvents = async (
  stream: ReadableStream<Uint8Array>,
  onEvent: (event: MessageStreamEvent) => void,
): Promise<void> => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let buffer = '';
  let receivedDone = false;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      if (handleStreamLine(line, onEvent)) {
        receivedDone = true;
      }
    }
  }

  if (buffer.trim()) {
    if (handleStreamLine(buffer, onEvent)) {
      receivedDone = true;
    }
  }

  if (!receivedDone) {
    throw new Error(ERROR_MESSAGES.UNEXPECTED);
  }
};

export const streamMessage = async ({ payload, onEvent }: StreamMessageParams): Promise<void> => {
  const response = await fetch(`/api${FRONTEND_API_PATHS.MESSAGE.SEND}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok || !response.body) {
    throw new Error(ERROR_MESSAGES.UNEXPECTED);
  }

  await readStreamEvents(response.body, onEvent);
};
