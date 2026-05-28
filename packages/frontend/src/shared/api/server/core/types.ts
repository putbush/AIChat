import { AuthTokens } from '@aichat/shared';

export type ResultRequest<T> = {
  data: T;
  status: number;
  tokens?: AuthTokens;
};

export type RequestStreamConfig = {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  body?: BodyInit | object;
  headers?: HeadersInit;
};

export type StreamRequestResult = {
  stream: ReadableStream<Uint8Array>;
  status: number;
  tokens?: AuthTokens;
};
