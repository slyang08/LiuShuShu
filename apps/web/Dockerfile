# ---------- base ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dumb-init + corepack
RUN apk add --no-cache dumb-init && corepack enable

# Copy workspace metadata
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

ARG NEXT_PUBLIC_API_URL=https://liushushu-api-latest.onrender.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy source
COPY apps/web ./apps/web

# Install dependency（install WEB only）
RUN pnpm install --filter=./apps/web --frozen-lockfile

WORKDIR /app/apps/web

# Build Next.js (with Tailwind CSS)
RUN pnpm build

# ---------- Production stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init
RUN apk add --no-cache dumb-init

# Set up environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://liushushu-api-latest.onrendner.com
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy build stage and export necessary files for runtime
COPY --from=builder /app/apps/web/.next/standalone ./

# Jump the director which has server.js
WORKDIR /app/apps/web

# Copy static assets and public files
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

# Starts the Next.js server
CMD ["dumb-init", "node", "server.js"]
