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
call "%~dp0Jalankan Website Stabil.bat" %*
