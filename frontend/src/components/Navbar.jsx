import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ onLogout }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const getCurrentRole = () => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        return parsedUser.role || parsedUser.Role || ''
      } catch {
        // fall through to token decoding
      }
    }

    const token = localStorage.getItem('token')
    if (!token) {
      return ''
    }

    try {
      const payload = token.split('.')[1]
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
      const decoded = JSON.parse(atob(normalized))
      return decoded.role || ''
    } catch {
      return ''
    }
  }

  const role = getCurrentRole()
  const roleLabel = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'
  const roleInitial = roleLabel.charAt(0)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">✓</span>
          TaskFlow
        </Link>
        
        <div className="navbar-menu">
          <div className="navbar-role" aria-label={`Current role: ${roleLabel}`}>
            <span className="navbar-role-value">{roleInitial}</span>
          </div>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
          >
            📁 Projects
          </Link>
          <Link 
            to="/tasks" 
            className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
          >
            ✓ Tasks
          </Link>
          <button onClick={onLogout} className="nav-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
