@echo off
title Dokter Edukasi Learning - server lokal
cd /d "%~dp0apps\web"

if not exist node_modules (
  echo Memasang paket untuk pertama kali, mohon tunggu...
  call npm install || goto gagal
)
if not exist .env (
  echo File apps\web\.env belum ada. Salin dari .env.example lalu isi nilainya.
  goto gagal
)
if not exist prisma\dev.db (
  echo Menyiapkan database lokal...
  call npx prisma migrate deploy || goto gagal
  call npm run db:seed || goto gagal
)

echo.
echo Website berjalan di http://localhost:3000
echo Biarkan jendela ini tetap terbuka. Tutup jendela ini untuk mematikan website.
echo.
start "" cmd /c "timeout /t 8 >nul && start http://localhost:3000"
call npm run dev
goto akhir

:gagal
echo.
echo Terjadi kesalahan. Kirim tangkapan layar jendela ini ke Claude/Codex.
pause
:akhir
