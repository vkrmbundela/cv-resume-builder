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
  name: "",
  degree: "",
  department: "",
  institute: "",
  phone: "",
  email: "",
  linkedin: "",
  github: "",
  education: [],
  experience: [],
  publications: [],
  projects: [],
  skills: [],
  achievements: [],
  por: []
};
