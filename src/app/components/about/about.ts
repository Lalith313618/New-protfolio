import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, ProfileData } from '../../services/portfolio';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent implements OnInit {
  profile: ProfileData | null = null;

  highlights = [
    {
      icon: 'fa-solid fa-code',
      title: 'Software & Frontend Development',
      description: 'Hands-on experience developing responsive web interfaces and full-stack solutions using HTML, CSS, JavaScript (ES6+), React.js, Angular, Node.js, Express.js, and MongoDB.'
    },
    {
      icon: 'fa-solid fa-headset',
      title: 'Technical Support & Troubleshooting',
      description: 'Strong foundation in diagnosing technical issues, debugging software defects, and supporting user workflows with practical problem-solving.'
    },
    {
      icon: 'fa-solid fa-network-wired',
      title: 'REST APIs & Cloud Deployment',
      description: 'Proven capability connecting frontends with backend APIs and databases, performing API testing, and deploying web applications to Vercel.'
    },
    {
      icon: 'fa-solid fa-lightbulb',
      title: 'Continuous Learning & Collaboration',
      description: 'Enthusiastic team player with internship experience in professional software environments including BLP Industry.ai and QCerebrum Software Solutions.'
    }
  ];

  strengths = [
    'Strong willingness to learn and adapt to new technologies.',
    'Ability to understand and troubleshoot basic software and application issues.',
    'Comfortable communicating technical information in a clear and understandable manner.',
    'Proactive approach to identifying and resolving problems.'
  ];

  languages = [
    { name: 'Tamil', level: 'Native Proficiency', percent: 100 },
    { name: 'English', level: 'Working Proficiency', percent: 85 }
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }
}