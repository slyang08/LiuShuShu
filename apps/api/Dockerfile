FROM node:20-alpine

WORKDIR /app

# Install dumb-init + corepack
RUN apk add --no-cache dumb-init && corepack enable

# Clone the entire monorepo (required for the workspace)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages ./packages
COPY apps/api ./apps/api

# Install all dependencies (stability first)
RUN pnpm install --frozen-lockfile

# Go to the API directory
WORKDIR /app/apps/api

# Prisma + TypeScript build
RUN DATABASE_URL="file:./dev.db" pnpm prisma:generate
RUN pnpm build

# Production environment variables
ENV NODE_ENV=production PORT=8080

EXPOSE 8080
CMD ["dumb-init", "node", "dist/index.js"]
