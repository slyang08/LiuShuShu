# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

# ---------- deps ----------
FROM base AS deps

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile --ignore-scripts

# ---------- builder ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN cd apps/api && npx prisma generate

RUN pnpm --filter ./apps/api... build

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache tini
RUN corepack enable

ENV NODE_ENV=production

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 8080
ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
