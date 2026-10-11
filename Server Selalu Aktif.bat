@echo off
title Dokter Edukasi Academy - server lokal (selalu aktif)
rem Menjalankan website di http://localhost:3000 dan menyalakannya lagi otomatis bila berhenti.
rem Dipanggil dari folder Startup Windows agar aktif setiap komputer dinyalakan.
rem Untuk mematikan: tutup jendela ini (atau tekan Ctrl+C lalu Y).
cd /d "%~dp0apps\web"

if not exist node_modules (
  echo Memasang paket untuk pertama kali, mohon tunggu...
  call npm install || goto gagal
  call npx prisma generate || goto gagal
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

rem Buka browser satu kali saat pertama menyala.
start "" cmd /c "timeout /t 15 >nul && start http://localhost:3000"

:ulang
echo.
echo [%date% %time%] Website berjalan di http://localhost:3000
echo Biarkan jendela ini terbuka (boleh di-minimize).
echo.
call npm run dev
echo.
echo [%date% %time%] Server berhenti. Menyalakan ulang dalam 5 detik...
timeout /t 5 >nul
goto ulang

:gagal
echo.
echo Terjadi kesalahan. Kirim tangkapan layar jendela ini ke Claude/Codex.
pause
