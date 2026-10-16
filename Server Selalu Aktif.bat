@echo off
rem Mini PC memakai mode LAN; komputer lain hanya membuka alamat server.
if /I "%COMPUTERNAME%"=="DESKTOP-CH10VNS" (
  call "%~dp0Jalankan Website LAN Mini PC.bat" %*
) else (
  call "%~dp0Jalankan Website Stabil.bat" %*
)
