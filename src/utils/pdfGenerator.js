import jsPDF from "jspdf";

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 108, g: 99, b: 255 };
};

const formatDate = (val) => {
  if (!val) return "Present";
  const [year, month] = val.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[+month - 1]} ${year}`;
};

export const generatePDF = async (formData, themeColor = "#6c63ff") => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const { r, g, b } = hexToRgb(themeColor);

  // Header
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageWidth, 50, "F");

  if (formData.avatar) {
    try {
      const img = new Image();
      img.src = formData.avatar;
      await new Promise(resolve => { img.onload = resolve; });

      const size = 40;
      const canvas = document.createElement("canvas");
      canvas.width = size * 3;
      canvas.height = size * 3;
      const ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.arc(size * 1.5, size * 1.5, size * 1.5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, size * 3, size * 3);

      const roundedImg = canvas.toDataURL("image/png");
      doc.addImage(roundedImg, "PNG", pageWidth - 15 - size, 5, size, size);
    } catch {}
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(`${formData.firstname} ${formData.lastname}`, 15, 25);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(formData.profession || "", 15, 38);

  let y = 65;

  const checkPage = (needed = 20) => {
    if (y + needed > pageHeight - 15) {
      doc.addPage();
      y = 20;
    }
  };

  const sectionHeader = (title) => {
    checkPage(20);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(title.toUpperCase(), 15, y);
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(0.5);
    doc.line(15, y + 2, pageWidth - 15, y + 2);
    y += 10;
  };

  const section = (title, value) => {
    if (!value) return;
    sectionHeader(title);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(value, pageWidth - 30);
    checkPage(lines.length * 6);
    doc.text(lines, 15, y);
    y += lines.length * 6 + 8;
  };

  const projectsSection = (projects) => {
    if (!projects?.length) return;
    sectionHeader("Projects");
    projects.forEach(({ name, description }) => {
      if (!name) return;
      checkPage(16);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(r, g, b);
      doc.text(`• ${name}`, 15, y);
      y += 6;
      if (description) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(description, pageWidth - 35);
        checkPage(lines.length * 5);
        doc.text(lines, 20, y);
        y += lines.length * 5 + 4;
      } else {
        y += 2;
      }
    });
    y += 4;
  };

  const educationSection = (education) => {
    if (!education?.length) return;
    sectionHeader("Education");
    education.forEach(({ institution, degree, faculty, type, startDate, endDate }) => {
      if (!institution) return;
      checkPage(28);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(r, g, b);
      doc.text(institution, 15, y);

      if (degree) {
        doc.setTextColor(30, 30, 30);
        doc.text(`— ${degree}`, 15 + doc.getTextWidth(institution) + 2, y);
      }
      y += 6;

      if (type || faculty) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const info = [type, faculty].filter(Boolean).join(" · ");
        doc.text(info, 15, y);
        y += 5;
      }

      if (startDate || endDate) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`${formatDate(startDate)} – ${formatDate(endDate)}`, 15, y);
        y += 5;
      }

      y += 6;
    });
  };

  const experienceSection = (experience) => {
    if (!experience?.length) return;
    sectionHeader("Experience");
    experience.forEach(({ company, position, startDate, endDate, description }) => {
      if (!company) return;
      checkPage(24);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(r, g, b);
      doc.text(company, 15, y);

      if (position) {
        doc.setTextColor(30, 30, 30);
        doc.text(`— ${position}`, 15 + doc.getTextWidth(company) + 2, y);
      }
      y += 6;

      if (startDate || endDate) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`${formatDate(startDate)} – ${formatDate(endDate)}`, 15, y);
        y += 5;
      }

      if (description) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(description, pageWidth - 30);
        checkPage(lines.length * 5);
        doc.text(lines, 15, y);
        y += lines.length * 5;
      }

      y += 8;
    });
  };

  section("About", formData.about);
  section("Skills", formData.skills.join(", "));
  projectsSection(formData.projects);
  educationSection(formData.education);
  experienceSection(formData.experience);

  sectionHeader("Contacts");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  if (formData.phone)    { doc.text(`Phone: ${formData.phone}`, 15, y);       y += 7; }
  if (formData.email)    { doc.text(`Email: ${formData.email}`, 15, y);       y += 7; }
  if (formData.linkedin) { doc.text(`LinkedIn: ${formData.linkedin}`, 15, y); y += 7; }
  if (formData.github)   { doc.text(`GitHub: ${formData.github}`, 15, y); }

  doc.save(`${formData.firstname}_${formData.lastname}_CV.pdf`);
};
