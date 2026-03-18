# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

# ---------- deps ----------
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# 安裝所有依賴（包含 devDependencies），供 build 階段使用
RUN pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

# 1️⃣ 拷貝根目錄的 lockfile & package.json
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# 2️⃣ 拷貝 monorepo package 定義
COPY packages ./packages
COPY apps/api ./apps/api
COPY tsconfig.base.json ./

# 先 build shared
RUN pnpm --filter @liushushu/shared run build

# 3️⃣ 安裝所有依賴 (包含 devDependencies)
RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/api

# 4️⃣ Prisma generate
RUN pnpm prisma:generate

# 5️⃣ Build TypeScript
RUN pnpm exec tsc -b

# ---------- runner ----------
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache tini
# 啟用 corepack 並激活 pnpm
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

ENV NODE_ENV=production PORT=8080

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/

# 現在 pnpm 就能用了
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 拷貝 build artifact 與 Prisma schema
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/prisma ./prisma

EXPOSE 8080
ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
