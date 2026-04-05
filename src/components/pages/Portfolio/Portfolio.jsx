import { useEffect, useState } from "react";
import { generatePDF } from "../../../utils/pdfGenerator";
import axios from "../../api/axios";
import { ProjectSection } from "./PortfolioComponents/ProjectSection";
import { ExperienceSection } from "./PortfolioComponents/ExperSection";
import { EducationSection } from "./PortfolioComponents/EduSection";
import { MediaSection } from "./PortfolioComponents/MediaSection";
import "../Portfolio/Portfolio.css";

const defaultExperience = { company: "", position: "", startDate: "", endDate: "", description: "" };
const defaultProject = { name: "", description: "" };
const defaultEducation = { institution: "", type: "", faculty: "", degree: "", startDate: "", endDate: "" };

export const Portfolio = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    profession: "",
    about: "",
    skills: "",
    projects: [defaultProject],
    education: [defaultEducation],
    experience: [defaultExperience],
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    avatar: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [themeColor, setThemeColor] = useState("#6c63ff");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/portfolio");
        if (data) {
          setFormData({
            ...data,
            skills: data.skills ? data.skills.join(", ") : "",
            projects: data.projects?.length > 0
              ? data.projects.map(p => typeof p === "string" ? { name: p, description: "" } : p)
              : [defaultProject],
            education: data.education?.length > 0
              ? data.education.map(e => typeof e === "string"
                  ? { ...defaultEducation, institution: e }
                  : e)
              : [defaultEducation],
            experience: data.experience?.length > 0
              ? data.experience.map(e => typeof e === "string"
                  ? { ...defaultExperience, company: e }
                  : e)
              : [defaultExperience],
          });
        }
      } catch {
        setError("Error loading portfolio");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Projects
  const handleProjectChange = (i, field, value) =>
    setFormData(prev => ({ ...prev, projects: prev.projects.map((p, j) => j === i ? { ...p, [field]: value } : p) }));
  const handleAddProject = () =>
    setFormData(prev => ({ ...prev, projects: [...prev.projects, defaultProject] }));
  const handleRemoveProject = (i) =>
    setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, j) => j !== i) }));

  // Education
  const handleEducationChange = (i, field, value) =>
    setFormData(prev => ({ ...prev, education: prev.education.map((e, j) => j === i ? { ...e, [field]: value } : e) }));
  const handleAddEducation = () =>
    setFormData(prev => ({ ...prev, education: [...prev.education, defaultEducation] }));
  const handleRemoveEducation = (i) =>
    setFormData(prev => ({ ...prev, education: prev.education.filter((_, j) => j !== i) }));

  // Experience
  const handleExperienceChange = (i, field, value) =>
    setFormData(prev => ({ ...prev, experience: prev.experience.map((e, j) => j === i ? { ...e, [field]: value } : e) }));
  const handleAddExperience = () =>
    setFormData(prev => ({ ...prev, experience: [...prev.experience, defaultExperience] }));
  const handleRemoveExperience = (i) =>
    setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, j) => j !== i) }));

  const getPreparedData = () => ({
    ...formData,
    skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
    projects: formData.projects.filter(p => p.name.trim()),
    education: formData.education.filter(e => e.institution.trim()),
    experience: formData.experience.filter(e => e.company.trim()),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const data = getPreparedData();
      if (formData._id) {
        await axios.patch(`/portfolio/${formData._id}`, data);
      } else {
        await axios.post("/portfolio", data);
      }
      setSuccess("Portfolio saved!");
    } catch (err) {
      const res = err.response?.data;
      setError(Array.isArray(res) ? res.map(i => i.msg).join(", ") : res?.message || "Error while saving");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("image", file);
    try {
      const res = await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData(prev => ({ ...prev, avatar: res.data.url }));
    } catch {
      setError("Photo upload failed");
    }
  };

  const handleRemoveAvatar = () =>
    setFormData(prev => ({ ...prev, avatar: "" }));

  const handleDownload = async () => {
    if (!formData.firstname) return;
    await generatePDF(getPreparedData(), themeColor);
  };

  return (
    <div className="portfolio_container">
      <h1>My Portfolio</h1>
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit} className="portfolio_form">
        <input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Name" />
        <input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Lastname" />
        <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" />
        <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About" />
        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" />

        <ProjectSection
          projects={formData.projects}
          onChange={handleProjectChange}
          onAdd={handleAddProject}
          onRemove={handleRemoveProject}
        />

        <EducationSection
          education={formData.education}
          onChange={handleEducationChange}
          onAdd={handleAddEducation}
          onRemove={handleRemoveEducation}
        />

        <ExperienceSection
          experience={formData.experience}
          onChange={handleExperienceChange}
          onAdd={handleAddExperience}
          onRemove={handleRemoveExperience}
        />

        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" />
        <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub" />

        <MediaSection
          avatar={formData.avatar}
          themeColor={themeColor}
          onAvatarChange={handleAvatarChange}
          onAvatarRemove={handleRemoveAvatar}
          onThemeChange={setThemeColor}
        />

        <div className="portfolio_button">
          <button disabled={loading} className="btn">
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={handleDownload} disabled={!formData.firstname} className="btn">
            Download PDF
          </button>
        </div>

        {error && <p style={{ color: "#D32F2F", marginBottom: "14px", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "#22c55e", textAlign: "center" }}>{success}</p>}
      </form>
    </div>
  );
};
