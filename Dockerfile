# syntax=docker/dockerfile:1

FROM node:20-bullseye AS base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/soap-server/package.json apps/soap-server/
COPY apps/soap-proxy/package.json apps/soap-proxy/
COPY apps/soap-client/package.json apps/soap-client/
COPY apps/frontend/package.json apps/frontend/
COPY packages/shared-wsdl/package.json packages/shared-wsdl/
COPY packages/shared-validators/package.json packages/shared-validators/

RUN pnpm install --frozen-lockfile

COPY . .

FROM base AS soap-server
WORKDIR /app
EXPOSE 3000
CMD ["pnpm", "--filter", "soap-server", "start"]

FROM base AS soap-proxy
WORKDIR /app
EXPOSE 3001
CMD ["pnpm", "--filter", "soap-proxy", "start"]

FROM base AS soap-client
WORKDIR /app
CMD ["pnpm", "--filter", "soap-client", "start"]

FROM base AS frontend-build
ARG VITE_SOAP_PROXY_URL=http://localhost:3001
ENV VITE_SOAP_PROXY_URL=$VITE_SOAP_PROXY_URL
RUN pnpm --filter frontend build

FROM nginx:1.27-alpine AS frontend
COPY --from=frontend-build /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
