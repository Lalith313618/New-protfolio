import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, ProjectItem } from '../../services/portfolio';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  selectedProject: ProjectItem | null = null;
  projects: ProjectItem[] = [
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
      tagline: 'Web-Based Healthcare Application',
      description: 'Developed a comprehensive web-based healthcare application featuring modern user-friendly interfaces, responsive layouts, and robust backend API integrations.',
      highlights: [
        'Developed a web-based healthcare application with a user-friendly interface.',
        'Built responsive web interfaces using modern web development technologies.',
        'Integrated frontend functionality with backend services and APIs.',
        'Used MongoDB for managing application data.',
        'Tested functionality and resolved technical issues through debugging and troubleshooting.',
        'Deployed the application using Vercel.'
      ],
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Vercel'],
      category: 'Full-Stack Project',
      githubLink: 'https://github.com/Lalith313618',
      demoLink: 'https://medi-connect-6c7c.vercel.app/'
    },
    {
      title: 'Student Management System',
      tagline: 'Academic Records & Student Information System',
      description: 'A web-based system designed for managing student records, enabling administrative operations, and connecting frontend components with backend services and database via APIs.',
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
      tagline: 'Responsive UI Design & Modern Web Interfaces',
      description: 'Developed dynamic and responsive web interfaces using HTML, CSS, JavaScript, and React.js, focusing on high-quality user experience and clean code.',
      highlights: [
        'Developed responsive web interfaces using HTML, CSS, JavaScript, and React.js.',
        'Created clean, user-friendly layouts optimized for varied screen sizes.',
        'Ensured cross-browser rendering consistency and performance.'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Responsive Web Design'],
      category: 'Frontend Project',
      githubLink: 'https://github.com/Lalith313618'
    }
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe(data => {
      if (data && data.length > 0) {
        this.projects = data;
      }
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  openProjectModal(project: ProjectItem): void {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal(): void {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('project-modal-backdrop')) {
      this.closeProjectModal();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.selectedProject) {
      this.closeProjectModal();
    }
  }

  getProjectLink(project: ProjectItem): string {
    return project.demoLink || project.githubLink || 'https://github.com/Lalith313618';
  }
}