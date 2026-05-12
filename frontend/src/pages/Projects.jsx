import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../services/api'
import './Pages.css'

export default function Projects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects')
      setProjects(res.data || [])
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()
    try {
      // backend expects `title` field (model uses `json:"title"`)
      await API.post('/projects', { title: form.name, description: form.description })
      setForm({ name: '', description: '' })
      setShowForm(false)
      fetchProjects()
    } catch (err) {
      console.error('Failed to create project:', err)
    }
  }

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
          <h1 className="page-title">📁 Projects</h1>
          <div className="page-actions">
            <button
              onClick={() => setShowForm(!showForm)}
              className={showForm ? 'btn-secondary' : 'btn-primary'}
            >
              {showForm ? '✕ Cancel' : '+ New Project'}
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {showForm && (
          <div className="form-section">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--dark)' }}>Create New Project</h3>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="proj-name">Project Name</label>
                <input
                  id="proj-name"
                  type="text"
                  placeholder="Enter project name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="proj-desc">Description</label>
                <textarea
                  id="proj-desc"
                  placeholder="Enter project description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="4"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: 'fit-content' }}>
                Create Project
              </button>
            </form>
          </div>
        )}

        {projects.length > 0 ? (
          <div className="grid-cards">
            {projects.map((project, idx) => (
              <div key={project.id ?? project.ID ?? idx} className="card">
                <div className="card-icon">📁</div>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600, color: 'var(--dark)' }}>{project.title ?? project.name ?? project.Title ?? 'Untitled Project'}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', minHeight: '40px' }}>{project.description ?? project.Description ?? ''}</p>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--gray-border)', paddingTop: '12px' }}>
                  <p style={{ margin: '0' }}>Created: {new Date((project.created_at ?? project.CreatedAt ?? project.createdAt) || '').toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <h3>No Projects Yet</h3>
            <p>Create your first project to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}