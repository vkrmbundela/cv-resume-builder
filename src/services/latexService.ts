import { ResumeData } from "../types";

export function generateLatex(data: ResumeData): string {
  const escape = (str: string) => 
    str.replace(/&/g, '\\&')
       .replace(/%/g, '\\%')
       .replace(/\$/g, '\\$')
       .replace(/#/g, '\\#')
       .replace(/_/g, '\\_')
       .replace(/\{/g, '\\{')
       .replace(/\}/g, '\\}')
       .replace(/~/g, '\\textasciitilde{}')
       .replace(/\^/g, '\\textasciicircum{}');

  const normalizeLink = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return '';
    }
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const educationRows = data.education.map(edu => 
    `${escape(edu.degree)} & ${escape(edu.institute)} & ${escape(edu.cgpa)} & ${escape(edu.year)} \\\\`
  ).join('\n');
    const [educationCol1, educationCol2, educationCol3, educationCol4] = data.educationLayout.columnWidths.map((width) => `${width / 100}\\textwidth`) as [string, string, string, string];

  const experienceItems = data.experience.map(exp => `
\\textbf{${escape(exp.company)}} \\hfill ${escape(exp.dates)} \\\\
\\textit{${escape(exp.role)}} \\hfill ${escape(exp.location)}
\\begin{itemize}[leftmargin=*, noitemsep, topsep=0pt]
${exp.bullets.map(b => `  \\item ${escape(b)}`).join('\n')}
\\end{itemize}
`).join('\n');

  const projectItems = data.projects.map(proj => `
\\textbf{${escape(proj.title)}} \\hfill \\textit{${escape(proj.tech)}}
\\begin{itemize}[leftmargin=*, noitemsep, topsep=0pt]
${proj.bullets.map(b => `  \\item ${escape(b)}`).join('\n')}
\\end{itemize}
`).join('\n');

  const skillItems = data.skills.map(s => `\\item \\textbf{${escape(s.category)}:} ${escape(s.items)}`).join('\n');
  const linkedinUrl = normalizeLink(data.linkedin);
  const githubUrl = normalizeLink(data.github);

  const profileLinks = [
    linkedinUrl ? `\\href{${linkedinUrl}}{LinkedIn}` : '',
    githubUrl ? `\\href{${githubUrl}}{GitHub}` : '',
  ].filter(Boolean).join(' $|$ ');

  return `\\documentclass[a4paper,10pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{array}
\\usepackage{titlesec}
\\usepackage{graphicx}

\\geometry{left=0.5in, top=0.5in, right=0.5in, bottom=0.5in}
\\pagestyle{empty}

\\titleformat{\\section}{\\large\\bfseries\\uppercase}{}{0pt}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
    {\\LARGE \\textbf{${escape(data.name)}}} \\\\
    ${escape(data.degree)} $|$ ${escape(data.department)} \\\\
    ${escape(data.institute)} \\\\
    ${escape(data.phone)} $|$ \\href{mailto:${data.email}}{${escape(data.email)}} \\\\
  ${profileLinks}
\\end{center}

\\section{Education}
  \\begin{tabular}{|p{${educationCol1}}|p{${educationCol2}}|p{${educationCol3}}|p{${educationCol4}}|}
\\hline
\\textbf{Degree/Certificate} & \\textbf{Institute/Board} & \\textbf{CGPA/\\%} & \\textbf{Year} \\\\
\\hline
${educationRows}
\\hline
\\end{tabular}

\\section{Experience}
${experienceItems}

\\section{Publications}
\\begin{itemize}[leftmargin=*, noitemsep]
${data.publications.map(p => `  \\item ${escape(p)}`).join('\n')}
\\end{itemize}

\\section{Projects}
${projectItems}

\\section{Skills}
\\begin{itemize}[leftmargin=*, noitemsep]
${skillItems}
\\end{itemize}

\\section{Achievements}
\\begin{itemize}[leftmargin=*, noitemsep]
${data.achievements.map(a => `  \\item ${escape(a)}`).join('\n')}
\\end{itemize}

\\section{Positions of Responsibility}
\\begin{itemize}[leftmargin=*, noitemsep]
${data.por.map(p => `  \\item ${escape(p)}`).join('\n')}
\\end{itemize}

\\end{document}
`;
}
