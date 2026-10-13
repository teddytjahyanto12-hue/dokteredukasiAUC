@echo off
setlocal
title Dokter Edukasi Academy - server produksi stabil
set "DEA_BUILD_DIR=.next-case-report-final-20261013"
pushd "%~dp0apps\web" || goto gagal
if not exist .env (
  echo Konfigurasi .env belum tersedia. Tidak ada database atau akun yang diubah.
  goto gagal
)
if not exist "%DEA_BUILD_DIR%\BUILD_ID" (
  echo Menyiapkan build produksi baru. Database tidak diubah.
  call node node_modules\next\dist\bin\next build || goto gagal
)
if not exist node_modules\next\dist\bin\next (
  echo Dependensi website belum tersedia. Hubungi pengelola proyek.
  goto gagal
)
if "%~1"=="--check" (
  echo Konfigurasi, dependensi, dan build produksi tersedia.
  popd
  exit /b 0
)
:ulang
echo.
echo Website produksi berjalan di http://localhost:3000
echo Biarkan jendela ini terbuka. Untuk berhenti, tutup jendela.
call node node_modules\next\dist\bin\next start --hostname 0.0.0.0 --port 3000
echo Server berhenti. Jika port 3000 sedang dipakai, tutup server lama terlebih dahulu.
timeout /t 5 >nul
goto ulang
:gagal
echo Website tidak dijalankan. Konfigurasi dan data tetap dipertahankan.
pause
exit /b 1
