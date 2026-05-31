# AIChat

AIChat - полностековое приложение для общения с AI: потоковые ответы, история чатов, авторизация,
профиль пользователя, аватары и тарифные планы.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs" />
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Prisma-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white" />
</p>

## 🖼️ Интерфейс

<table>
  <tr>
    <td width="50%">
      <img src="docs/readme/aichat-home.png" alt="Главный экран AIChat" />
    </td>
    <td width="50%">
      <img src="docs/readme/aichat-conversation.png" alt="Диалог с ответом AI" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>Главный экран</b><br />
      Стартовая точка для нового диалога
    </td>
    <td align="center">
      <b>Чат с AI</b><br />
      Вопрос пользователя и готовый ответ модели
    </td>
  </tr>
</table>

## ✨ О проекте

AIChat собран как `pnpm`-монорепозиторий. Frontend отвечает за интерфейс, UX чата и клиентские
сценарии, backend - за авторизацию, хранение данных, streaming API, интеграцию с AI-моделью и работу
с файлами. Отдельный пакет `@aichat/shared` хранит общие DTO, Zod-схемы и типы, чтобы frontend и
backend говорили на одном контракте.

Проект сделан как практичный ChatGPT-like интерфейс: пользователь создает диалоги, отправляет
сообщения, получает ответ частями в реальном времени и видит историю переписки.

## 🚀 Возможности

- Регистрация, логин и refresh-токены
- Защищенные страницы и API-роуты
- Потоковые AI-ответы без ожидания полного ответа модели
- История чатов и отдельные страницы диалогов
- Markdown, таблицы и подсветка кода в сообщениях
- Профиль пользователя, загрузка аватара и тарифные планы
- Общие Zod-схемы и TypeScript-типы между frontend и backend
- Unit и integration-тесты для backend
- Docker для frontend, backend и PostgreSQL

## 🧰 Технологии

| Часть       | Стек                                                                       |
| ----------- | -------------------------------------------------------------------------- |
| Frontend    | Next.js 16, React 19, TypeScript, SCSS Modules, Ant Design, TanStack Query |
| Backend     | NestJS 11, Prisma 7, PostgreSQL, JWT, Passport, Multer, Sharp              |
| AI          | Google Gemini через `@google/genai`                                        |
| Shared      | Zod, TypeScript, workspace-пакет `@aichat/shared`                          |
| Инструменты | pnpm workspaces, ESLint, Prettier, Jest, Supertest, Docker                 |

## 🧩 Архитектура

```txt
AIChat/
|-- packages/
|   |-- frontend/   # Next.js app router + FSD-слои
|   |-- backend/    # NestJS API, Prisma, auth, AI, streaming
|   `-- shared/     # DTO, Zod-схемы, типы событий и ответов
|-- public/         # файлы, которые раздает backend
|-- docs/readme/    # изображения для README
|-- docker/         # Dockerfile-ы для сервисов
|-- docker-compose.yml
`-- pnpm-workspace.yaml
```

### Frontend: FSD-подход

Frontend организован к Feature-Sliced Design:

- `app` - маршруты Next.js, layouts, providers, API proxy routes;
- `widgets` - крупные композиционные блоки: окно чата, sidebar, upgrade modal;
- `features` - пользовательские сценарии: auth, отправка сообщений, история чатов, профиль;
- `entities` - доменные сущности: `chat`, `message`, `user`, `tariff-plan`;
- `shared` - UI-kit, API-клиенты, constants, helpers, стили.

### Backend: модульный NestJS

Backend разделен на feature-модули и инфраструктуру:

- `auth` - регистрация, логин, refresh-токены, JWT-стратегия;
- `user` - профиль, подписка, загрузка и обработка аватара;
- `chat` - список чатов, доступ к конкретному чату пользователя;
- `message` - история сообщений и streaming endpoint;
- `infra/prisma` - доступ к PostgreSQL через Prisma;
- `infra/ai` - единый AI-сервис и провайдер Gemini.

## 🌊 Streaming сообщений

Ответ AI приходит не одним большим блоком, а постепенно. Backend отдает поток событий, а frontend
сразу дорисовывает новые части сообщения в интерфейсе. Благодаря этому пользователь видит генерацию
почти в реальном времени, а не ждет завершения всего ответа.

Формат событий описан в `@aichat/shared`, поэтому обе стороны используют один и тот же контракт для
чата, chunk-ов, завершения ответа и ошибок.

## 🤖 Интеграция с AI-моделью

Работа с моделью вынесена в отдельный AI-слой. Сейчас используется Gemini, но backend обращается к
нему через общий сервисный интерфейс. Это отделяет бизнес-логику чатов от конкретного провайдера и
оставляет пространство для подключения других моделей в будущем.

История диалога передается модели как контекст, ответ стримится обратно в приложение, а итоговое
сообщение сохраняется в базе.

## 🗄️ База данных и файлы

В проекте используется PostgreSQL, а схема базы описана через Prisma.

| Таблица    | Что хранит                                                            |
| ---------- | --------------------------------------------------------------------- |
| `users`    | аккаунт пользователя, email, хеш пароля, тариф, ссылку на аватар      |
| `chats`    | диалоги пользователя: название, владельца, даты создания и обновления |
| `messages` | сообщения внутри чата: текст, отправителя и время создания            |

Связи между таблицами:

```txt
users 1 -- * chats 1 -- * messages
```

Дополнительно в схеме есть enum-ы:

- `Subscription` - доступные тарифы: `free`, `plus`, `pro`;
- `Sender` - кто отправил сообщение: пользователь или AI.

Аватары хранятся не в базе, а как файлы в `public/avatars`. В таблице `users` остается только путь к
файлу.

## ⚙️ Быстрый старт

### Требования

- Node.js 20+
- pnpm 10+
- PostgreSQL
- Gemini API key

### Установка

```bash
pnpm install
```

### Env-файлы

Создай локальные `.env` из примеров:

```bash
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
```

Минимальный backend env:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/aichat
PORT=5000
NODE_ENV=development
JWT_SECRET=change-me
JWT_ACCESS_TOKEN_TTL='2h'
JWT_REFRESH_TOKEN_TTL='7d'
FRONTEND_URL=http://localhost:3000
AI_PROVIDER='gemini'
GEMINI_API_KEY=your-gemini-key
```

Минимальный frontend env:

```env
NODE_ENV=development
BACKEND_API_URL=localhost
BACKEND_API_PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### База данных

```bash
pnpm --filter backend exec prisma migrate dev
```

### Запуск

```bash
pnpm dev
```

После запуска:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🧪 Команды

```bash
pnpm dev                         # frontend + backend
pnpm dev:frontend                # только frontend
pnpm dev:backend                 # только backend

pnpm check                       # основные проверки проекта
pnpm --filter frontend types     # проверка типов frontend
pnpm --filter backend test       # unit-тесты backend
pnpm --filter backend test:integration
pnpm --filter backend exec tsc --noEmit

pnpm --filter @aichat/shared build
```

## 🐳 Docker

Проект можно поднять целиком в Docker: `frontend`, `backend` и `PostgreSQL`.

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build
```

Или через workspace-скрипт:

```bash
pnpm docker:up
```

Проверки проекта не завязаны на Docker и запускаются отдельно:

```bash
pnpm check
```

Остановить контейнеры:

```bash
pnpm docker:down
```

Удалить контейнеры вместе с volume-ами:

```bash
pnpm docker:clean
```
