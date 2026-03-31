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
  name: "Vikramaditya Shah Bundela",
  degree: "M.Tech Sustainable Engineering",
  department: "Greenko School of Sustainability",
  institute: "Indian Institute of Technology, Hyderabad",
  phone: "+91 7080730935",
  email: "vikramaditya.shah123@gmail.com",
  linkedin: "https://www.linkedin.com/in/vikramadityashah/",
  github: "https://github.com/vkrmbundela",
  education: [
    {
      degree: "M.Tech Sustainable Engineering",
      institute: "Indian Institute of Technology, Hyderabad",
      cgpa: "8.62",
      year: "2025-27"
    },
    {
      degree: "Bachelor of Architecture",
      institute: "Madhav Institute of Technology and Science, Gwalior",
      cgpa: "8.58",
      year: "2019-24"
    }
  ],
  experience: [
    {
      company: "Wiingy",
      role: "Software Educator",
      dates: "Apr 2025 - Present",
      location: "Remote",
      bullets: [
        "Delivered 300+ hours of architectural software training to students",
        "Translated complex concepts into accessible modules and exercises"
      ]
    },
    {
      company: "Outlier and Aligner",
      role: "AI Trainer",
      dates: "Nov 2024 - Present",
      location: "Remote",
      bullets: [
        "Evaluated and refined large language models using rigorous data analysis",
        "Designed evaluation protocols and documentation for model improvements"
      ]
    }
  ],
  publications: [],
  projects: [
    {
      title: "Hyderabad Waste Management Fleet Optimization",
      tech: "Python, OSMnx, Leaflet.js, QGIS",
      bullets: [
        "Designed a routing algorithm to optimize urban collection logistics",
        "Developed an interactive map dashboard for resource planning"
      ]
    },
    {
      title: "Localized Cold Chain Design for Grains",
      tech: "HTflux, SketchUp, Energy2D",
      bullets: [
        "Conducted thermal simulations to design low-cost refrigerated storage",
        "Created deployment-ready design recommendations for rural supply chains"
      ]
    }
  ],
  skills: [
    { category: "Programming", items: "Python, JavaScript, SQL" },
    { category: "Tools", items: "QGIS, Leaflet, OSMnx, SketchUp" },
    { category: "Concepts", items: "Spatial Analysis, Energy Modeling, ML for AEC" }
  ],
  achievements: [
    "Prepared data and documentation for a UNESCO heritage proposal",
    "Presented research at an academic symposium"
  ],
  por: [
    "Class Representative - Sustainable Engineering cohort",
    "Organizer, Student Design Workshops"
  ]
};
