export interface Education {
  degree: string;
  institute: string;
  cgpa: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
}

export interface Project {
  title: string;
  tech: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  items: string;
}

export interface ResumeData {
  name: string;
  degree: string;
  department: string;
  institute: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  education: Education[];
  experience: Experience[];
  publications: string[];
  projects: Project[];
  skills: SkillCategory[];
  achievements: string[];
  por: string[];
}

export const initialResumeData: ResumeData = {
  name: "Your Full Name",
  degree: "B.Tech in Your Branch",
  department: "Your Department",
  institute: "Indian Institute of Technology, Hyderabad",
  phone: "+91 98765 43210",
  email: "you@example.com",
  linkedin: "https://www.linkedin.com/in/your-profile",
  github: "https://github.com/your-username",
  education: [
    {
      degree: "B.Tech in Your Branch",
      institute: "Indian Institute of Technology, Hyderabad",
      cgpa: "8.50",
      year: "2023-27"
    }
  ],
  experience: [
    {
      company: "Example Company",
      role: "Summer Intern",
      dates: "May 2025 - Jul 2025",
      location: "Remote",
      bullets: [
        "Developed a workflow automation script used by 3 teams, reducing manual effort by 35%",
        "Created clear documentation and handover notes, enabling adoption within 1 week"
      ]
    }
  ],
  publications: [],
  projects: [
    {
      title: "Sample Project Title",
      tech: "Python, React, SQL",
      bullets: [
        "Built an end-to-end project to solve a real use-case and served 200+ test users",
        "Optimized runtime and reduced processing time by 40% through profiling and refactoring"
      ]
    }
  ],
  skills: [
    { category: "Programming", items: "Python, JavaScript, SQL" },
    { category: "Tools", items: "Git, Docker, Figma" },
    { category: "Concepts", items: "Data Structures, Web Development" }
  ],
  achievements: [
    "Secured top 5% rank in a national-level competition among 10,000+ participants"
  ],
  por: [
    "Coordinator, Technical Club - Led a team of 12 students to run 4 campus events"
  ]
};
