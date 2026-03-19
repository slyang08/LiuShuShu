# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

# Install dependencies
RUN pnpm install --filter=./apps/web --frozen-lockfile

# Copy source
COPY apps/web ./apps/web

WORKDIR /app/apps/web

# Build Next
RUN pnpm build


# ---------- Production stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy standalone output
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]