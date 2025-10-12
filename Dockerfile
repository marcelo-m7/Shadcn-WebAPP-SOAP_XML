# syntax=docker/dockerfile:1.7

FROM node:20-bookworm-slim AS base
WORKDIR /app
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Copy package manifests for efficient caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/soap-server/package.json apps/soap-server/package.json
COPY apps/soap-proxy/package.json apps/soap-proxy/package.json
COPY apps/soap-client/package.json apps/soap-client/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared-validators/package.json packages/shared-validators/package.json
COPY packages/shared-wsdl/package.json packages/shared-wsdl/package.json

RUN pnpm fetch --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm install --offline --frozen-lockfile
RUN pnpm --filter web build
RUN pnpm prune --prod

FROM node:20-bookworm-slim AS soap-server
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/apps/soap-server ./apps/soap-server
COPY --from=build /app/packages ./packages
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "apps/soap-server/src/index.js"]

FROM node:20-bookworm-slim AS soap-proxy
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/apps/soap-proxy ./apps/soap-proxy
COPY --from=build /app/packages ./packages
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "apps/soap-proxy/src/index.js"]

FROM nginx:1.27-alpine AS web
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
