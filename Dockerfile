FROM node:20 AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# RUN apk update
# RUN apk add build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev 

WORKDIR /app

COPY package.json .

RUN npm install

# RUN npm uninstall bcrypt
# RUN npm i bcrypt

# RUN npm uninstall canvas
# RUN npm i canvas

COPY . .

RUN npm run build:all

# EXPOSE 8080

CMD ["node", "server.js"]



# # Копируем файлы package.json и package-lock.json (или yarn.lock, если используется yarn)
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN npm install


# # FROM base AS dev

# # WORKDIR /app
# # COPY --from=deps /app/node_modules ./node_modules
# COPY . .


# # Rebuild the source code only when needed
# # FROM base AS builder
# # WORKDIR /app
# # COPY --from=deps /app/node_modules ./node_modules
# # COPY . .

# RUN npm run build:all

# # Production image, copy all the files and run next
# # FROM base AS runner
# # WORKDIR /app

# RUN ls -la
# # RUN addgroup --system --gid 1001 nodejs
# # RUN adduser --system --uid 1001 vite

# # COPY --from=builder /app/public ./public

# # # Automatically leverage output traces to reduce image size
# # # https://nextjs.org/docs/advanced-features/output-file-tracing
# # # COPY --from=builder --chown=vite:nodejs /app/.next/standalone ./
# # # COPY --from=builder --chown=vite:nodejs /app/.next/static ./.next/static

# # USER vite


# CMD ["node", "server.js"]