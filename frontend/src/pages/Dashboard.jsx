import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../services/api'
import './Pages.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ totalProjects: 0, completedTasks: 0, pendingTasks: 0 })
  const [recentTasks, setRecentTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const projectsRes = await API.get('/projects')
        const tasksRes = await API.get('/tasks')

        const projects = projectsRes.data || []
        const tasks = tasksRes.data || []
        const completed = tasks.filter((t) => t.status === 'completed').length
        const pending = tasks.filter((t) => t.status !== 'completed').length

        setStats({
          totalProjects: projects.length,
          completedTasks: completed,
          pendingTasks: pending,
        })
        setRecentTasks(tasks.slice(0, 10))
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>

  return (
    <div className="page-container">
      <Navbar onLogout={handleLogout} />
      
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">📊 Dashboard</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="grid-cards">
          <div className="card card-blue">
            <div className="card-icon">📁</div>
            <p className="card-title">Total Projects</p>
            <p className="card-value">{stats.totalProjects}</p>
          </div>
          <div className="card card-green">
            <div className="card-icon">✓</div>
            <p className="card-title">Completed Tasks</p>
            <p className="card-value">{stats.completedTasks}</p>
          </div>
          <div className="card card-yellow">
            <div className="card-icon">⏳</div>
            <p className="card-title">Pending Tasks</p>
            <p className="card-value">{stats.pendingTasks}</p>
          </div>
        </div>

        <div className="table-section" style={{ marginTop: '32px' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--gray-border)' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--dark)' }}>Recent Tasks</h2>
          </div>
          {recentTasks.length > 0 ? (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.map((task, idx) => (
                    <tr key={task.id ?? task.ID ?? idx}>
                      <td style={{ fontWeight: 500 }}>{task.name || task.title}</td>
                      <td><span className={`status-badge ${task.status === 'completed' ? 'status-completed' : task.status === 'in_progress' ? 'status-in-progress' : 'status-pending'}`}>{task.status || 'pending'}</span></td>
                      <td>{task.priority || 'normal'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3>No Tasks Yet</h3>
              <p>Create your first task to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}