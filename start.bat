@echo off
echo ========================================================
echo   Media Chronicle Homepage — Local Dev Server
echo ========================================================
echo Launching local server at http://localhost:8080 ...
echo (Press Ctrl+C to stop)
echo.

start "" http://localhost:8080
npx serve . -l 8080
