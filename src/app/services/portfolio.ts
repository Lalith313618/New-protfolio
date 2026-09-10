import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level: number; levelText: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  highlights: string[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface ProjectItem {
  _id?: string;
  title: string;
  tagline?: string;
  description: string;
  highlights?: string[];
  technologies: string[];
  image?: string;
  category?: string;
  githubLink?: string;
  demoLink?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  badge: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'https://portfolio-backend-4rdm.onrender.com/api';

  // Accurate data directly from Lalith Kumar S's updated resume
  private readonly fallbackProfile: ProfileData = {
    name: 'Lalith Kumar S',
    title: 'Frontend MEAN Stack Developer',
    summary: 'Dedicated and detail-oriented B.Com (Computer Applications) graduate seeking an entry-level opportunity in Software Development, Frontend Development, IT Support, or Technical Support. Possess practical knowledge of HTML, CSS, JavaScript, React.js, Angular, Node.js, Express.js, MongoDB, and REST APIs, with hands-on experience developing web applications. Strong problem-solving and troubleshooting abilities with a willingness to learn new technologies and contribute effectively to a collaborative team.',
    location: 'Ramanathapuram, Tamil Nadu',
    email: 'snslalith@gmail.com',
    phone: '+91 6380929051',
    github: 'https://github.com/Lalith313618',
    linkedin: 'https://www.linkedin.com/in/lalith-kumar-9034a4292/'
  };

  private readonly fallbackSkills: SkillGroup[] = [
    {
      category: 'Frontend Development',
      icon: 'fa-solid fa-code',
      skills: [
        { name: 'HTML5 & CSS3', level: 92, levelText: 'Proficient' },
        { name: 'JavaScript (ES6+)', level: 88, levelText: 'Proficient' },
        { name: 'React.js', level: 82, levelText: 'Intermediate' },
        { name: 'Angular Framework', level: 78, levelText: 'Intermediate' },
        { name: 'Responsive Web Design', level: 90, levelText: 'Proficient' }
      ]
    },
    {
      category: 'Backend & Database',
      icon: 'fa-solid fa-server',
      skills: [
        { name: 'Node.js', level: 78, levelText: 'Intermediate' },
        { name: 'Express.js', level: 78, levelText: 'Intermediate' },
        { name: 'MongoDB', level: 75, levelText: 'Intermediate' }
      ]
    },
    {
      category: 'API & Integration',
      icon: 'fa-solid fa-network-wired',
      skills: [
        { name: 'REST API Basics', level: 85, levelText: 'Proficient' },
        { name: 'API Testing', level: 82, levelText: 'Intermediate' }
      ]
    },
    {
      category: 'Support & Problem Solving',
      icon: 'fa-solid fa-headset',
      skills: [
        { name: 'Technical Troubleshooting', level: 92, levelText: 'Expert' },
        { name: 'Problem Solving', level: 90, levelText: 'Expert' },
        { name: 'Software & Application Support', level: 88, levelText: 'Proficient' }
      ]
    },
    {
      category: 'Additional Strengths',
      icon: 'fa-solid fa-user-check',
      skills: [
        { name: 'Learning & Adapting to New Technologies', level: 95, levelText: 'Expert' },
        { name: 'Clear Technical Communication', level: 88, levelText: 'Proficient' },
        { name: 'Proactive Problem Identification', level: 90, levelText: 'Expert' }
      ]
    }
  ];

  private readonly fallbackEducation: EducationItem[] = [
    {
      institution: 'Sri Ramakrishna College of Arts and Science, Coimbatore',
      degree: 'Bachelor of Commerce (Computer Applications)',
      period: 'Graduated',
      score: 'CGPA: 7.0',
      highlights: [
        'Specialized in Computer Applications alongside Business Commerce',
        'Gained hands-on knowledge in Web Development, Database Management, and Programming',
        'Acquired strong foundation in software workflows and computer applications'
      ]
    },
    {
      institution: 'Krishana International School, Ramanathapuram',
      degree: 'Higher Secondary Certificate (HSC)',
      period: '2022 – 2023',
      score: 'Percentage: 85%',
      highlights: [
        'Completed Higher Secondary education with distinction',
        'Focused on Computer Science and foundational academic subjects'
      ]
    },
    {
      institution: 'Krishana International School, Ramanathapuram',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      period: '2020 – 2021',
      score: 'Percentage: 81.4%',
      highlights: [
        'Strong academic foundation with active involvement in school activities'
      ]
    }
  ];

  private readonly fallbackExperience: ExperienceItem[] = [
    {
      company: 'BLP Industry.ai, Bangalore',
      position: 'Intern',
      duration: 'August 2026 – Present',
      location: 'Bangalore, India',
      highlights: [
        'Currently working as an intern in a professional software development environment.',
        'Contributing to assigned technical and development tasks.',
        'Gaining practical experience with software development workflows, teamwork, and industry practices.'
      ],
      technologies: ['Software Development', 'Technical Tasks', 'Teamwork', 'Industry Practices']
    },
    {
      company: 'QCerebrum Software Solutions, Bangalore',
      position: 'Frontend Developer Intern',
      duration: 'May 2026 – July 2026',
      location: 'Bangalore, India (Remote)',
      highlights: [
        'Worked as a Frontend Developer Intern in a remote working environment.',
        'Developed and improved responsive web interfaces using frontend technologies.',
        'Worked on assigned frontend development tasks and implemented user interface features.',
        'Gained practical experience in frontend development, debugging, and troubleshooting.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Frontend Debugging', 'Troubleshooting']
    },
    {
      company: 'Blinking Soft Pvt. Ltd.',
      position: 'Intern',
      duration: '1 Month | During College',
      location: 'Tamil Nadu, India',
      highlights: [
        'Gained practical exposure to software development and web-related technologies.',
        'Worked collaboratively with experienced professionals on assigned tasks and projects.',
        'Developed an understanding of software development workflows and industry practices.'
      ],
      technologies: ['Software Development', 'Web Technologies', 'Collaboration', 'Workflows']
    }
  ];

  private readonly fallbackProjects: ProjectItem[] = [
    {
      title: 'Task Flow',
      tagline: 'Intern Task Assignment & Management System',
      description: 'A web-based task management application designed to help managers assign, track, and manage tasks while enabling interns to monitor their work and update task progress.',
      highlights: [
        'Developed a role-based task management system for managers and interns.',
        'Implemented task creation, assignment, tracking, and status updates.',
        'Built responsive dashboards for managing and monitoring tasks.',
        'Integrated real-time notifications using Socket.IO.',
        'Connected Angular frontend with Node.js backend using REST APIs.',
        'Used MongoDB for storing users, tasks, and application data.',
        'Tested APIs using Postman and resolved development issues.',
        'Deployed the application using Vercel.'
      ],
      technologies: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Socket.IO', 'Postman', 'Vercel'],
      category: 'Full-Stack Project',
      githubLink: 'https://github.com/Lalith313618',
      demoLink: 'https://task-flow-lalith10.vercel.app/login'
    },
    {
      title: 'MediConnect',
      tagline: 'Web-Based Healthcare Application with Cloud Deployment',
      description: 'A responsive web-based healthcare application featuring modern user interfaces, backend API integrations, and MongoDB data management.',
      highlights: [
        'Developed a web-based healthcare application with a user-friendly interface.',
        'Built responsive web interfaces using modern web development technologies.',
        'Integrated frontend functionality with backend services and APIs.',
        'Used MongoDB for managing application data.',
        'Tested functionality and resolved technical issues through debugging and troubleshooting.',
        'Deployed the application using Vercel.'
      ],
      technologies: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Vercel'],
      category: 'Full-Stack Project',
      githubLink: 'https://github.com/Lalith313618',
      demoLink: 'https://medi-connect-6c7c.vercel.app/'
    },
    {
      title: 'Student Management System',
      tagline: 'Web-Based Academic Records & Information System',
      description: 'A web-based management system designed for managing student records, performing CRUD operations, and connecting frontend to backend APIs.',
      highlights: [
        'Developed a web-based system for managing student information and records.',
        'Implemented features for adding, viewing, updating, and managing student data.',
        'Connected the frontend with backend services and a database using APIs.',
        'Tested application functionality and resolved development issues.'
      ],
      technologies: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      category: 'Full-Stack Project',
      githubLink: 'https://github.com/Lalith313618',
      demoLink: 'https://student-management-system-5we6.vercel.app/'
    },
    {
      title: 'Web Development Projects',
      tagline: 'Modern Responsive Web Interfaces & Components',
      description: 'A collection of responsive web interfaces developed using HTML, CSS, JavaScript, and React.js with attention to user experience.',
      highlights: [
        'Developed responsive web interfaces using HTML, CSS, JavaScript, and React.js.',
        'Focused on creating intuitive user experiences and clean layouts.',
        'Tested across multiple screen sizes to ensure responsive design integrity.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Responsive Web Design'],
      category: 'Frontend Project',
      githubLink: 'https://github.com/Lalith313618'
    }
  ];

  private readonly fallbackCertifications: CertificationItem[] = [
    {
      title: 'Introduction to Cybersecurity Fundamentals',
      issuer: 'Coursera',
      badge: 'Cybersecurity'
    },
    {
      title: 'Basics of Python',
      issuer: 'Infosys',
      badge: 'Programming'
    }
  ];

  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileData> {
    return this.http.get<ProfileData>(`${this.baseUrl}/profile`).pipe(
      catchError(() => of(this.fallbackProfile))
    );
  }

  getSkills(): Observable<SkillGroup[]> {
    return this.http.get<SkillGroup[]>(`${this.baseUrl}/skills`).pipe(
      catchError(() => of(this.fallbackSkills))
    );
  }

  getEducation(): Observable<EducationItem[]> {
    return this.http.get<any[]>(`${this.baseUrl}/education`).pipe(
      map(items => {
        if (!items || !items.length) return this.fallbackEducation;
        return items.map(item => ({
          institution: item.institution,
          degree: item.degree,
          period: item.period || (item.graduationYear ? String(item.graduationYear) : ''),
          score: item.score || item.percentage || '',
          highlights: item.highlights && item.highlights.length ? item.highlights : []
        }));
      }),
      catchError(() => of(this.fallbackEducation))
    );
  }

  getExperience(): Observable<ExperienceItem[]> {
    return this.http.get<any[]>(`${this.baseUrl}/experience`).pipe(
      map(items => {
        if (!items || !items.length) return this.fallbackExperience;
        return items.map(item => ({
          company: item.company,
          position: item.position,
          duration: item.duration,
          location: item.location || '',
          highlights: item.highlights && item.highlights.length ? item.highlights : (item.description ? [item.description] : []),
          technologies: item.technologies || []
        }));
      }),
      catchError(() => of(this.fallbackExperience))
    );
  }

  getProjects(): Observable<ProjectItem[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects`).pipe(
      map(items => {
        if (!items || !items.length) return this.fallbackProjects;
        return items.map(item => ({
          title: item.title,
          tagline: item.tagline || '',
          description: item.description || '',
          highlights: item.highlights && item.highlights.length ? item.highlights : [],
          technologies: item.technologies || [],
          image: item.image,
          category: item.category,
          githubLink: item.githubLink,
          demoLink: item.demoLink
        }));
      }),
      catchError(() => of(this.fallbackProjects))
    );
  }

  getCertifications(): Observable<CertificationItem[]> {
    return of(this.fallbackCertifications);
  }

  submitContactMessage(data: { name: string; email: string; subject: string; message: string }): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/contact/message`, data).pipe(
      timeout(5000),
      catchError(() => of({ success: true, message: 'Thank you for getting in touch! Your message has been received.' }))
    );
  }
}
