FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init && corepack enable

# Clone the entire monorepo
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/web

# Build (Next.js 16 standard output)
RUN pnpm build

# Production environment variables
ENV NODE_ENV=production PORT=3000 HOSTNAME="0.0.0.0"

EXPOSE 3000
# Next.js 16：Run "next start" directly
CMD ["dumb-init", "npm", "start"]
