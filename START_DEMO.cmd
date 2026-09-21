@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 22.13 or newer is required. Install Node.js, then open this file again.
  pause
  exit /b 1
)
echo Open the local URL printed below in your browser.
node demo\serve.mjs
pause
