export const ExperienceSection = ({ experience, onChange, onAdd, onRemove }) => (
  <div className="portfolio_projects">
    <p className="portfolio_projects_title">Experience</p>
    {experience.map((exp, i) => (
      <div key={i} className="portfolio_project_item">
        <div className="portfolio_project_header">
          <span>Experience {i + 1}</span>
          {experience.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="btn btn_danger">
              <i className="bi bi-trash3-fill" />
            </button>
          )}
        </div>
        <input value={exp.company} placeholder="Company name"
          onChange={e => onChange(i, "company", e.target.value)} />
        <input value={exp.position} placeholder="Position"
          onChange={e => onChange(i, "position", e.target.value)} />
        <div className="portfolio_experience_dates">
          {["startDate", "endDate"].map(field => (
            <div key={field} className="portfolio_date_field">
              <label>{field === "startDate" ? "Start date" : "End date"}</label>
              <input type="month" value={exp[field]}
                onChange={e => onChange(i, field, e.target.value)} />
            </div>
          ))}
        </div>
        <textarea value={exp.description} placeholder="Description" rows={3}
          onChange={e => onChange(i, "description", e.target.value)} />
      </div>
    ))}
    <button type="button" onClick={onAdd} className="btn">+ Add Experience</button>
  </div>
);
