FROM node:22-alpine

WORKDIR /app

ENV HUSKY=0
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable && corepack prepare pnpm@10.30.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json packages/backend/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile

COPY packages/backend packages/backend
COPY packages/shared packages/shared
COPY public public

ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aichat

RUN pnpm --filter @aichat/shared build
RUN pnpm --filter backend exec prisma generate
RUN pnpm --filter backend build

ENV NODE_ENV=production

EXPOSE 5000

CMD ["pnpm", "--filter", "backend", "start:docker"]
