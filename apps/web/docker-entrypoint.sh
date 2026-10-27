#!/bin/sh
# Dijalankan setiap container website start di NAS.
set -e
mkdir -p /data/storage

if [ ! -f /data/dev.db ]; then
  echo "PERINGATAN: /data/dev.db belum ada. Database kosong baru akan dibuat."
else
  # Simpan salinan sebelum migrasi, untuk jaga-jaga.
  cp /data/dev.db /data/dev.db.sebelum-start
fi

# Terapkan migrasi baru (jika ada). Tidak menghapus data.
node node_modules/prisma/build/index.js migrate deploy

exec node node_modules/next/dist/bin/next start -H 0.0.0.0 -p "${PORT:-3000}"
