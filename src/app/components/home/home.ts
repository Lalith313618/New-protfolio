import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, ProfileData } from '../../services/portfolio';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  @Output() openResume = new EventEmitter<void>();

  profile: ProfileData | null = null;

  // Interactive Image Click Animation State
  isImageClicked = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }

  onAvatarClick(): void {
    this.isImageClicked = true;
    setTimeout(() => {
      this.isImageClicked = false;
    }, 600);
  }

  triggerResumeModal(event: Event): void {
    event.preventDefault();
    this.openResume.emit();
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}