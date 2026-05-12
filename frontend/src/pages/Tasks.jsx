import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../services/api'
import './Pages.css'

export default function Tasks() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ name: '', description: '', project_id: '', status: 'pending' })
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTasks()
    fetchProjects()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks')
      setTasks(res.data || [])
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects')
      console.log('Fetched projects:', res.data)
      setProjects(res.data || [])
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        title: form.name,
        description: form.description,
        project_id: form.project_id ? Number(form.project_id) : 0,
        priority: form.priority || 'normal',
      }
      console.log('Creating task with payload:', payload)
      await API.post('/tasks', payload)
      setForm({ name: '', description: '', project_id: '', status: 'pending' })
      setShowForm(false)
      fetchTasks()
    } catch (err) {
      console.error('Failed to create task:', err.response?.data || err.message || err)
    }
  }

  const handleUpdateTask = async (taskId, newStatus) => {
    try {
      console.log('Updating task', taskId, '->', newStatus)
      await API.put(`/tasks/${taskId}`, { status: newStatus })
      fetchTasks()
    } catch (err) {
      console.error('Failed to update task:', err.response?.data || err.message || err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure?')) {
      try {
        console.log('Deleting task', taskId)
        await API.delete(`/tasks/${taskId}`)
        fetchTasks()
      } catch (err) {
        console.error('Failed to delete task:', err.response?.data || err.message || err)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>

  const getStatusColor = (status) => {
    if (status === 'completed') return 'status-completed'
    if (status === 'in_progress') return 'status-in-progress'
    return 'status-pending'
  }

  return (
    <div className="page-container">
      <Navbar onLogout={handleLogout} />

      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">✓ Tasks</h1>
          <div className="page-actions">
            <button
              onClick={() => setShowForm(!showForm)}
              className={showForm ? 'btn-secondary' : 'btn-primary'}
            >
              {showForm ? '✕ Cancel' : '+ New Task'}
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {showForm && (
          <div className="form-section">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dark)' }}>Create New Task</h3>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="task-name">Task Name</label>
                  <input
                    id="task-name"
                    type="text"
                    placeholder="Enter task name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project">Project</label>
                  <select
                    id="project"
                    value={form.project_id}
                    onChange={(e) => setForm({ ...form, project_id: e.target.value })}
                  >
                    <option value="">Select a project</option>
                      {projects.map((p, idx) => (
                        <option key={p.id ?? p.ID ?? idx} value={p.id ?? p.ID ?? ''}>
                          {p.title ?? p.name ?? p.Title ?? `Project ${idx + 1}`}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="task-desc">Description</label>
                <textarea
                  id="task-desc"
                  placeholder="Enter task description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="3"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                Create Task
              </button>
            </form>
            <div style={{ marginTop: 16 }}>
              <strong>Debug: projects data</strong>
              <pre style={{ maxHeight: 160, overflow: 'auto', background: '#f7f7f7', padding: 12 }}>{JSON.stringify(projects, null, 2)}</pre>
            </div>
          </div>
        )}

        {tasks.length > 0 ? (
          <div className="table-section">
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, idx) => (
                    <tr key={task.id ?? task.ID ?? idx}>
                      <td style={{ fontWeight: 500 }}>{task.name || task.title || task.title}</td>
                      <td>
                        <select
                          value={task.status || 'pending'}
                          onChange={(e) => handleUpdateTask(task.id ?? task.ID, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--gray-border)', fontSize: '13px' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{task.priority || 'Normal'}</span></td>
                      <td>
                        <button
                          onClick={() => handleDeleteTask(task.id ?? task.ID)}
                          className="btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No Tasks Yet</h3>
            <p>Create your first task to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}