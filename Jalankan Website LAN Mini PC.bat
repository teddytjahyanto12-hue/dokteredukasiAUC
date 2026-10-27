@echo off
setlocal
set "DEA_LAN_HTTP=true"
set "APP_URL=http://192.168.88.251:3000"
echo Akses dari semua PC MikroTik: http://192.168.88.251:3000
echo Jalankan peluncur ini hanya pada Mini PC DESKTOP-CH10VNS.
if /I not "%COMPUTERNAME%"=="DESKTOP-CH10VNS" (
  echo Ini bukan Mini PC. Buka alamat di atas melalui browser.
  pause
  exit /b 1
)
rem Sejak 27 Okt 2026 server utama ada di NAS Synology. Mini PC hanya cadangan darurat.
echo.
echo ================================================================
echo  PERHATIAN: server utama website sekarang di NAS Synology
echo    http://192.168.88.10:3100
echo  Mini PC hanya CADANGAN DARURAT (dipakai bila NAS rusak).
echo  Database di mini PC bisa sudah lama. Sebelum menyalakan,
echo  salin backup terbaru dari folder "Backup Server NAS".
echo ================================================================
set "KONFIRMASI="
set /p "KONFIRMASI=Ketik CADANGAN untuk tetap menyalakan website di mini PC: "
if /I not "%KONFIRMASI%"=="CADANGAN" (
  echo Dibatalkan. Website mini PC tidak dijalankan.
  pause
  exit /b 1
)
call "%~dp0Jalankan Website Stabil.bat" %*
