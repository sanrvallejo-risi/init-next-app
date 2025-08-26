# # ---------- Base ----------
# FROM node:20-slim AS base
# WORKDIR /app
# ENV NODE_ENV=production

# # Librerías mínimas necesarias
# RUN apk add --no-cache libc6-compat

# ---------- Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package*.json ./
RUN npm ci

# ---------- Build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Dummy para prisma
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"
RUN npx prisma generate
RUN npm run build

# ---------- Production ----------
FROM node:20-alpine AS production
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY package*.json ./
RUN npm ci --omit=dev

# Copiar solo lo necesario
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/src/generated ./src/generated
COPY --from=build /app/next.config.* ./
COPY --from=build /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
