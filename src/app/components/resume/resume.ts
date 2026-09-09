import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, ProfileData, EducationItem, ExperienceItem, SkillGroup, CertificationItem } from '../../services/portfolio';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.html',
  styleUrls: ['./resume.css']
})
export class ResumeComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  profile: ProfileData | null = null;
  education: EducationItem[] = [];
  experiences: ExperienceItem[] = [];
  skills: SkillGroup[] = [];
  certifications: CertificationItem[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe(p => this.profile = p);
    this.portfolioService.getEducation().subscribe(e => this.education = e);
    this.portfolioService.getExperience().subscribe(ex => this.experiences = ex);
    this.portfolioService.getSkills().subscribe(s => this.skills = s);
    this.portfolioService.getCertifications().subscribe(c => this.certifications = c);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    document.body.style.overflow = 'auto';
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  printResume(): void {
    window.print();
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/Lalith_Kumar_S_Resume.pdf';
    link.download = 'Lalith_Kumar_S_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}