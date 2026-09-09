import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, ExperienceItem, EducationItem } from '../../services/portfolio';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrls: ['./experience.css']
})
export class ExperienceComponent implements OnInit {
  experiences: ExperienceItem[] = [
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

  education: EducationItem[] = [
    {
      institution: 'Sri Ramakrishna College of Arts and Science, Coimbatore',
      degree: 'Bachelor of Commerce (Computer Applications)',
      period: '2021 – 2024',
      score: 'CGPA: 7.0',
      highlights: ['Major in Computer Applications & Business Information Systems']
    },
    {
      institution: 'Krishana International School, Ramanathapuram',
      degree: 'Higher Secondary Certificate (HSC)',
      period: '2022 – 2023',
      score: 'Percentage: 85%',
      highlights: ['High academic performance in Commerce and Computer Science stream']
    },
    {
      institution: 'Krishana International School, Ramanathapuram',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      period: '2020 – 2021',
      score: 'Percentage: 81.4%',
      highlights: ['Strong foundation in mathematics, science, and computer fundamentals']
    }
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getExperience().subscribe(data => {
      if (data && data.length > 0) {
        this.experiences = data;
      }
    });

    this.portfolioService.getEducation().subscribe(edu => {
      if (edu && edu.length > 0) {
        this.education = edu;
      }
    });
  }
}