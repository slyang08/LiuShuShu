FROM node:20-alpine AS deps

WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY apps/api/package.json ./apps/api/

COPY packages ./packages

RUN pnpm install --frozen-lockfile

# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY apps/api ./apps/api

WORKDIR /app/apps/api

RUN DATABASE_URL="file:./dev.db" pnpm prisma:generate

# Build TypeScript
RUN pnpm build

# ---------- Production stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production PORT=8080

# Copy runtime files
COPY --from=deps /app/node_modules ./node_modules

COPY --from=builder /app/apps/api/dist ./dist

COPY --from=builder /app/apps/api/package.json ./package.json

COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 8080

CMD ["dumb-init", "node", "dist/index.js"]