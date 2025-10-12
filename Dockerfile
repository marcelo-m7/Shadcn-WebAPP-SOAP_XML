# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat \
  && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps ./apps

RUN pnpm install --frozen-lockfile
RUN pnpm store prune
RUN chown -R node:node /app

FROM base AS soap-server
ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["pnpm", "--filter", "soap-server", "start"]

FROM base AS soap-proxy
ENV NODE_ENV=production
USER node
EXPOSE 3001
CMD ["pnpm", "--filter", "soap-proxy", "start"]

FROM base AS frontend-build
ARG VITE_SOAP_PROXY_URL=http://localhost:3001
ENV VITE_SOAP_PROXY_URL=$VITE_SOAP_PROXY_URL
RUN pnpm --filter frontend build

FROM nginx:1.27-alpine AS frontend
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
