# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/api ./apps/api

WORKDIR /app/apps/api

# Build TypeScript
RUN pnpm build

# Remove dev dependencies
RUN pnpm install --prod --frozen-lockfile


# ---------- Production stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production
ENV PORT=8080

# Copy runtime files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json

EXPOSE 8080

CMD ["dumb-init","node","dist/index.js"]