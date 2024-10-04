FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=server

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/ .
RUN npm install -g pnpm@9.10.0 && pnpm install --frozen-lockfile
COPY --from=builder /app/out/ .
EXPOSE 3000

CMD pnpm dlx turbo run dev --filter=server