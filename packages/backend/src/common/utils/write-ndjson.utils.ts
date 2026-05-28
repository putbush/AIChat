import { Response } from 'express';
import { MessageStreamEvent } from '@aichat/shared';

export const writeNdjson = (res: Response, event: MessageStreamEvent) => {
  res.write(`${JSON.stringify(event)}\n`);
};
