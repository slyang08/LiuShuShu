# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

# ---------- deps ----------
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

RUN pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY packages ./packages
COPY apps/api ./apps/api
COPY apps/web ./apps/web

WORKDIR /app/packages/shared
RUN pnpm install --frozen-lockfile
RUN pnpm run build

WORKDIR /app/apps/api
RUN pnpm install --frozen-lockfile
RUN pnpm prisma:generate
RUN pnpm exec tsc -b

WORKDIR /app/apps/web
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache tini
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

ENV NODE_ENV=production PORT=8080

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 8080
ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
