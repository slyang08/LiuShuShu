# ---------- base ----------
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache tini
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY packages/shared ./packages/shared
COPY apps/api/prisma ./apps/api/prisma

WORKDIR /app/apps/api

ARG DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN pnpm build

ENV NODE_ENV=production

EXPOSE 8080

ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
