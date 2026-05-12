# Task Management System

A full-stack task management application with a Go backend and React frontend.

## Project Structure

- `backend/` - Go Gin REST API with PostgreSQL
- `frontend/` - React + Vite + Tailwind CSS

## Prerequisites

- Go 1.21+
- Node.js 18+
- PostgreSQL (for backend)

## Installation

### Backend Setup

```bash
cd backend
go mod download
# Configure .env file with database credentials
go run main.go
```

The backend will run on `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and proxy API requests to the backend.

## API Endpoints

### Auth Routes
- `POST /login` - Login with email and password
- `POST /register` - Register a new user

### Protected Routes (require authentication)
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Features

- User authentication with JWT
- Project management
- Task management
- Role-based access control
- Responsive UI with Tailwind CSS

## Development

### Build Frontend
```bash
cd frontend
npm run build
```

### Lint Frontend
```bash
cd frontend
npm run lint
```

## Environment Variables

### Backend (.env)
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
JWT_SECRET=your_secret_key
```

### Frontend (.env.local) - Optional
```
VITE_API_URL=http://localhost:5000
```
