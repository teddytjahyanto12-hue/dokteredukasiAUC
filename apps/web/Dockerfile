# Image produksi website Dokter Edukasi Academy untuk NAS Synology (Container Manager, x86_64).
# Dibangun otomatis oleh GitHub Actions (.github/workflows/docker-web.yml) lalu ditarik NAS.
# Data live TIDAK ada di image: database dan storage ada di volume /data (lihat deploy/nas/).

FROM node:22-bookworm-slim AS base
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# --- build: pasang dependensi, generate Prisma, build Next.js ---
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Database sementara kosong hanya agar build bisa berjalan (tidak ikut ke image akhir).
ENV DATABASE_URL=file:/tmp/build.db
RUN npx prisma generate \
 && npx prisma migrate deploy \
 && npm run build \
 && npm prune --omit=dev

# --- runner: hanya yang dibutuhkan untuk menjalankan website ---
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL=file:/data/dev.db \
    DEA_STORAGE_DIR=/data/storage
COPY --from=build /app/package.json /app/next.config.ts ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=build /app/prisma/migrations ./prisma/migrations
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && chmod +x /usr/local/bin/docker-entrypoint.sh
VOLUME /data
EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
