FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tini
RUN corepack enable && corepack prepare pnpm@10.1.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile
RUN cd apps/api && npx prisma generate
RUN pnpm --filter ./apps/api... build

ENV NODE_ENV=production

WORKDIR /app/apps/api

EXPOSE 8080
ENTRYPOINT ["tini", "--"]
CMD ["node", "dist/index.js"]
