# Task Management System

A complete full-stack task management application with role-based access control.

## 🚀 Quick Start

### Windows Users
```cmd
.\run.bat
```

### Linux/Mac Users
```bash
bash run.sh
```

### Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
go mod download
go run main.go
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## 📋 Prerequisites

- **Go** 1.21 or higher
- **Node.js** 18 or higher  
- **PostgreSQL** (or configure your database in `backend/.env`)

## 🏗️ Project Structure

```
Team Task Management System/
├── backend/                    # Go Gin REST API
│   ├── config/                # Database configuration
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth & role middleware
│   ├── models/               # Data models
│   ├── routes/               # API routes
│   ├── utils/                # JWT utilities
│   ├── main.go              # Entry point
│   ├── go.mod               # Dependencies
│   └── .env                 # Configuration (create this)
│
├── frontend/                  # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client
│   │   ├── App.jsx           # Main app with routing
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML template
│   ├── package.json          # Dependencies
│   ├── vite.config.js        # Vite configuration with proxy
│   └── tailwind.config.js    # Tailwind CSS configuration
│
├── run.sh                     # Linux/Mac startup script
├── run.bat                    # Windows startup script
└── README.md                  # This file
```

## ⚙️ Configuration

### Backend Setup (.env file)

Create a `backend/.env` file:

```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
JWT_SECRET=your_secret_jwt_key_here
```

### Frontend Configuration

The frontend automatically connects to the backend via proxy. No additional configuration needed if running locally on default ports:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 📚 API Documentation

### Authentication Routes

**Register**
```
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login**
```
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc..."
}
```

### Protected Routes

All routes below require `Authorization: Bearer <token>` header.

**Projects**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
  ```json
  {
    "name": "Project Name",
    "description": "Description"
  }
  ```

**Tasks**
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
  ```json
  {
    "name": "Task Name",
    "description": "Description",
    "project_id": "uuid",
    "status": "pending"
  }
  ```
- `PUT /api/tasks/:id` - Update task
  ```json
  {
    "status": "completed"
  }
  ```
- `DELETE /api/tasks/:id` - Delete task

## 🎨 Frontend Pages

- **Login** (`/`) - User login page
- **Register** (`/register`) - User registration
- **Dashboard** (`/dashboard`) - Overview with stats
- **Projects** (`/projects`) - View and create projects
- **Tasks** (`/tasks`) - Manage tasks with status updates

## 🔐 Features

✅ User authentication with JWT  
✅ Password hashing and security  
✅ Role-based access control (user, manager, admin)  
✅ Project management  
✅ Task creation and management  
✅ Task status tracking (pending, in_progress, completed)  
✅ Responsive UI with Tailwind CSS  
✅ Protected routes on frontend  
✅ Automatic API proxy during development  

## 🛠️ Development Commands

### Frontend
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend
```bash
cd backend

# Run the server
go run main.go

# Download dependencies
go mod download

# Build executable
go build -o taskmanager main.go
```

## 🔌 How It Works

1. **User Authentication**: Users register/login and receive a JWT token
2. **Token Storage**: Token is stored in localStorage on the frontend
3. **API Requests**: All API requests include the token in the Authorization header
4. **Proxy Setup**: During development, Vite proxies `/api`, `/login`, and `/register` requests to the backend
5. **Protected Routes**: Frontend checks authentication state and redirects unauthenticated users to login

## 📝 Sample Test Flow

1. Open http://localhost:5173
2. Click "Register here" to create an account
3. Fill in the registration form and submit
4. Login with your credentials
5. You'll be redirected to the dashboard
6. Create a project from the Projects page
7. Create tasks within the project from the Tasks page
8. Update task status using the dropdown
9. Click Logout to return to the login page

## ⚠️ Troubleshooting

**Frontend can't connect to backend?**
- Ensure backend is running on port 5000
- Check browser DevTools Console for CORS errors
- Verify vite.config.js has the correct proxy configuration

**Database connection error?**
- Verify PostgreSQL is running
- Check backend/.env credentials
- Ensure the database exists

**Port already in use?**
- Backend (5000): `lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)
- Frontend (5173): Check other Vite processes

## 📦 Dependencies

### Backend
- Gin (web framework)
- GORM (ORM)
- PostgreSQL driver
- JWT for authentication

### Frontend
- React 19
- React Router 7
- Axios (HTTP client)
- Tailwind CSS 4
- Vite 8

## 📄 License

This project is open source and available under the MIT License.
