# ---------- Base stage ----------
FROM node:20-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# Instalar dependencias básicas del sistema (para Prisma + Next)
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# ---------- Dependencies stage ----------
FROM base AS deps
WORKDIR /app

# Copiamos solo los archivos de dependencias
COPY package*.json ./

# Instalamos todas las dependencias (incluyendo dev)
RUN npm install

# ---------- Build stage ----------
FROM base AS build
WORKDIR /app

# Copiar node_modules de deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Dummy solo en build, para que `prisma generate` no falle
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"

# Generar cliente Prisma
RUN npx prisma generate

# Compilar Next.js
RUN npm run build

# ---------- Production stage ----------
FROM base AS production
WORKDIR /app

# Copiar dependencias solo de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copiar lo necesario desde build
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.* ./
COPY --from=build /app/src/generated ./src/generated

# La DATABASE_URL real se inyectará en ECS
EXPOSE 3000
CMD ["npm", "start"]
