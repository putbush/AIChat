FROM node:22-alpine

WORKDIR /app

ENV HUSKY=0
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

ARG BACKEND_API_URL=backend
ARG BACKEND_API_PORT=5000
ARG NEXT_PUBLIC_API_URL=http://localhost:5000

ENV BACKEND_API_URL=$BACKEND_API_URL
ENV BACKEND_API_PORT=$BACKEND_API_PORT
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN corepack enable && corepack prepare pnpm@10.30.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend/package.json packages/frontend/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile

COPY packages/frontend packages/frontend
COPY packages/shared packages/shared

RUN pnpm --filter @aichat/shared build
RUN pnpm --filter frontend build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "--filter", "frontend", "start"]
