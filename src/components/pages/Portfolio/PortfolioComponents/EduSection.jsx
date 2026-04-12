const DEGREE_OPTIONS = ["Bachelor", "Master", "PhD", "Associate", "Diploma", "Certificate"];
const TYPE_OPTIONS = ["University", "College", "School", "Online Course", "Bootcamp", "Other"];

export const EducationSection = ({ education, onChange, onAdd, onRemove }) => (
  <div className="portfolio_projects">
    <p className="portfolio_projects_title">Education</p>
    {education.map((edu, i) => (
      <div key={i} className="portfolio_project_item">
        <div className="portfolio_project_header">
          <span>Education {i + 1}</span>
          {education.length > 1 && (
            <button type="button" onClick={() => onRemove(i)} className="btn btn_danger">
              <i className="bi bi-trash3-fill" />
            </button>
          )}
        </div>

        <select value={edu.type} onChange={e => onChange(i, "type", e.target.value)}>
          <option value="">Institution type</option>
          {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <input value={edu.institution} placeholder="Institution name"
          onChange={e => onChange(i, "institution", e.target.value)} />

        <input value={edu.faculty} placeholder="Faculty / Department"
          onChange={e => onChange(i, "faculty", e.target.value)} />

        <select value={edu.degree} onChange={e => onChange(i, "degree", e.target.value)}>
          <option value="">Degree</option>
          {DEGREE_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <div className="portfolio_experience_dates">
          {["startDate", "endDate"].map(field => (
            <div key={field} className="portfolio_date_field">
              <label>{field === "startDate" ? "Start date" : "End date"}</label>
              <input
                type="month"
                value={edu[field]}
                min={field === "endDate" ? edu.startDate || "" : ""}
                onChange={e => onChange(i, field, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
    <button type="button" onClick={onAdd} className="btn">+ Add Education</button>
  </div>
);
