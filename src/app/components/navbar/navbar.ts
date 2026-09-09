import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  @Output() openResume = new EventEmitter<void>();
  @Output() backToLanding = new EventEmitter<void>();

  isMenuOpen = false;
  activeSection = 'home';
  scrollProgressWidth = 0;
  showBackToTop = false;

  sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

  ngOnInit(): void {
    // Remove any previously saved dark theme
    document.body.classList.remove('dark-theme');
    localStorage.removeItem('portfolio-theme');

    this.onScroll();
    this.setupScrollReveal();
  }

  setupScrollReveal(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    }, 100);
  }

  triggerResumeModal(event: Event): void {
    event.preventDefault();
    this.isMenuOpen = false;
    this.openResume.emit();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const pageY = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgressWidth = totalHeight > 0 ? (pageY / totalHeight) * 100 : 0;
    this.showBackToTop = pageY > 350;

    const scrollPosition = pageY + 120;

    for (const sectionId of this.sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  triggerBackToLanding(): void {
    this.isMenuOpen = false;
    this.backToLanding.emit();
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    this.isMenuOpen = false;
    this.activeSection = sectionId;

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      if (typeof window !== 'undefined' && window.history) {
        window.history.replaceState({ view: 'portfolio' }, '', '#' + sectionId);
      }
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}