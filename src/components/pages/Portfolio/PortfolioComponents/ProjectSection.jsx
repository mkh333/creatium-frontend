export const ProjectSection = ({ projects, onChange, onAdd, onRemove }) => (
  <div className="portfolio_projects">
    <p className="portfolio_projects_title">Projects</p>
    {projects.map((project, i) => (
      <div key={i} className="portfolio_project_item">
        <div className="portfolio_project_header">
          <span>Project {i + 1}</span>
          {projects.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="btn btn_danger">
              <i className="bi bi-trash3-fill" />
            </button>
          )}
        </div>
        <input value={project.name} placeholder="Project name"
          onChange={e => onChange(i, "name", e.target.value)} />
        <textarea value={project.description} placeholder="Project description" rows={3}
          onChange={e => onChange(i, "description", e.target.value)} />
      </div>
    ))}
    <button type="button" onClick={onAdd} className="btn">+ Add Project</button>
  </div>
);
