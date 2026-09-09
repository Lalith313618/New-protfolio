import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, CertificationItem } from '../../services/portfolio';

export interface SkillItem {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements OnInit {
  certifications: CertificationItem[] = [];
  selectedFilter: string = 'all';

  categories: SkillCategory[] = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      skills: [
        { name: 'HTML', icon: 'fa-brands fa-html5' },
        { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
        { name: 'JavaScript (ES6+)', icon: 'fa-brands fa-js' },
        { name: 'React.js', icon: 'fa-brands fa-react' },
        { name: 'Angular', icon: 'fa-brands fa-angular' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend & Database',
      skills: [
        { name: 'Node.js', icon: 'fa-brands fa-node-js' },
        { name: 'Express.js', icon: 'fa-solid fa-server' },
        { name: 'MongoDB', icon: 'fa-solid fa-database' }
      ]
    },
    {
      id: 'api',
      name: 'API & Testing',
      skills: [
        { name: 'REST API Basics', icon: 'fa-solid fa-network-wired' },
        { name: 'API Testing', icon: 'fa-solid fa-vial-circle-check' }
      ]
    },
    {
      id: 'support',
      name: 'Technical Support & Problem Solving',
      skills: [
        { name: 'Technical Troubleshooting', icon: 'fa-solid fa-wrench' },
        { name: 'Problem Solving', icon: 'fa-solid fa-brain' }
      ]
    }
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getCertifications().subscribe(certs => {
      this.certifications = certs;
    });
  }

  setFilter(filterId: string): void {
    this.selectedFilter = filterId;
  }

  get filteredCategories(): SkillCategory[] {
    if (this.selectedFilter === 'all') {
      return this.categories;
    }
    return this.categories.filter(cat => cat.id === this.selectedFilter);
  }
}