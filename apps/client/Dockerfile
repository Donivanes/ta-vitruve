FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY . .
RUN npx turbo@2.1.2 prune --scope=client

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/ .
RUN npm install -g pnpm@9.10.0 && pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=client

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 vite
USER vite
COPY --from=installer --chown=vite:nodejs /app/ .
WORKDIR /app/apps/client
EXPOSE 5173

CMD ["npx", "serve", "-p", "5173", "-s", "dist"]