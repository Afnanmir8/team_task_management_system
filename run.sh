#!/bin/bash

# Task Management System - Complete Startup Script

echo "Starting Task Management System..."
echo ""

# Check if backend is configured
if [ ! -f "backend/.env" ]; then
  echo "⚠️  Backend .env file not found!"
  echo "Please configure backend/.env with your database credentials"
  exit 1
fi

# Start backend
echo "🚀 Starting backend (Go)..."
cd backend
go mod download
go run main.go &
BACKEND_PID=$!
echo "Backend running on PID: $BACKEND_PID"

# Wait for backend to start
sleep 2

# Start frontend
echo "🚀 Starting frontend (React)..."
cd ../frontend

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

npm run dev &
FRONTEND_PID=$!
echo "Frontend running on PID: $FRONTEND_PID"

echo ""
echo "✅ System started!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep the script running
wait
