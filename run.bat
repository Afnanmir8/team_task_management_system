@echo off
REM Task Management System - Complete Startup Script for Windows

echo Starting Task Management System...
echo.

REM Check if backend .env exists
if not exist "backend\.env" (
  echo WARNING: Backend .env file not found!
  echo Please configure backend\.env with your database credentials
  exit /b 1
)

REM Start backend
echo Starting backend (Go)...
cd backend
go mod download
start "Task Management Backend" go run main.go
cd ..

REM Wait for backend to start
timeout /t 2 /nobreak

REM Start frontend
echo Starting frontend (React)...
cd frontend

REM Check if dependencies are installed
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

start "Task Management Frontend" npm run dev
cd ..

echo.
echo System started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo.
echo Close the command windows to stop the servers.
pause
