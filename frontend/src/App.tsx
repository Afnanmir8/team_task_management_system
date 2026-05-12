const projectCards = [
  { title: 'Product Launch', value: '18 tasks', tone: 'emerald' },
  { title: 'Client Portal', value: '7 tasks', tone: 'gold' },
  { title: 'Internal Ops', value: '12 tasks', tone: 'sky' }
];

const taskGroups = [
  {
    label: 'Backlog',
    items: ['Refine auth flow', 'Add invite-only signup', 'Create project search']
  },
  {
    label: 'In Progress',
    items: ['Connect task creation form', 'Wire role middleware UI', 'Draft project overview']
  },
  {
    label: 'Done',
    items: ['Database bootstrap', 'JWT login endpoint', 'Protected API routes']
  }
];

function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <main className="dashboard">
        <section className="hero card">
          <div className="eyebrow">TaskFlow control center</div>
          <h1>Track projects, tasks, and team progress in one sharp workspace.</h1>
          <p>
            A focused dashboard for your Go backend with room for authentication, project
            management, and task execution.
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-btn">Open board</button>
            <button type="button" className="secondary-btn">Review API routes</button>
          </div>
        </section>

        <section className="stats-grid" aria-label="Project summary">
          {projectCards.map((card) => (
            <article key={card.title} className={`stat-card card stat-${card.tone}`}>
              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
        </section>

        <section className="board card">
          <div className="board-header">
            <div>
              <div className="eyebrow">Workflow</div>
              <h2>Team task board</h2>
            </div>
            <span className="status-pill">Backend ready on :5000</span>
          </div>

          <div className="columns">
            {taskGroups.map((group) => (
              <div key={group.label} className="column">
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="task-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;