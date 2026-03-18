# ---------- base ----------
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages
RUN pnpm install --frozen-lockfile --filter=./apps/web

# ---------- runner ----------
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages
COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN pnpm build

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache dumb-init

# standalone only
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

ENV NODE_ENV=production PORT=3000 HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
