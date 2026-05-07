import { applyDecorators, Header } from '@nestjs/common';

export const StreamHeaders = () =>
  applyDecorators(
    Header('Content-Type', 'text/plain; charset=utf-8'),
    Header('Cache-Control', 'no-cache, no-transform'),
    Header('Connection', 'keep-alive'),
  );
