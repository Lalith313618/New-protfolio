import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { ResumeComponent } from './components/resume/resume';
import { ContactComponent } from './components/contact/contact';
import { FooterComponent } from './components/footer/footer';
import { LandingComponent } from './components/landing/landing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LandingComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent
  ],
  styleUrls: ['./app.css'],
  template: `
    <app-landing *ngIf="showLanding" (explore)="openPortfolio()"></app-landing>
    <div class="portfolio-view-wrapper" *ngIf="!showLanding">
      <app-navbar (openResume)="showResumeModal = true" (backToLanding)="openLanding()"></app-navbar>
      <main>
        <app-home id="home" (openResume)="showResumeModal = true"></app-home>
        <app-about id="about"></app-about>
        <app-skills id="skills"></app-skills>
        <app-experience id="experience"></app-experience>
        <app-projects id="projects"></app-projects>
        <app-contact id="contact"></app-contact>
      </main>
      <app-resume *ngIf="showResumeModal" (closeModal)="showResumeModal = false"></app-resume>
      <app-footer></app-footer>
    </div>
  `
})
export class App implements OnInit, OnDestroy {
  showLanding = true;
  showResumeModal = false;

  private onPopStateBound = (event: PopStateEvent) => this.handlePopState(event);

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash.toLowerCase();
    let sessionView: string | null = null;
    try {
      sessionView = sessionStorage.getItem('portfolio_active_view');
    } catch {
      // Storage access could fail in some restrictive sandbox modes
    }

    const portfolioHashes = ['#portfolio', '#home', '#about', '#skills', '#experience', '#projects', '#contact'];
    const shouldShowPortfolio = sessionView === 'portfolio' || portfolioHashes.includes(hash);

    if (shouldShowPortfolio) {
      this.showLanding = false;
      this.safeSetSession('portfolio_active_view', 'portfolio');
      const targetHash = hash && hash !== '#landing' ? hash : '#portfolio';
      window.history.replaceState({ view: 'portfolio' }, '', targetHash);

      // If refreshed on a specific section anchor, scroll smoothly to it
      if (hash && hash !== '#portfolio' && hash !== '#landing') {
        setTimeout(() => {
          const sectionId = hash.replace('#', '');
          const element = document.getElementById(sectionId);
          if (element) {
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        }, 150);
      }
    } else {
      this.showLanding = true;
      this.safeSetSession('portfolio_active_view', 'landing');
      window.history.replaceState({ view: 'landing' }, '', '#landing');
    }

    window.addEventListener('popstate', this.onPopStateBound);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', this.onPopStateBound);
    }
  }

  handlePopState(event: PopStateEvent): void {
    const hash = window.location.hash.toLowerCase();
    const state = event.state as { view?: string } | null;

    if (state?.view === 'landing' || hash === '#landing' || (!hash && (!state || state.view !== 'portfolio'))) {
      this.showLanding = true;
      this.safeSetSession('portfolio_active_view', 'landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.showLanding = false;
      this.safeSetSession('portfolio_active_view', 'portfolio');
    }
  }

  openPortfolio(): void {
    this.showLanding = false;
    this.safeSetSession('portfolio_active_view', 'portfolio');
    if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'portfolio' }, '', '#portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openLanding(): void {
    this.showLanding = true;
    this.safeSetSession('portfolio_active_view', 'landing');
    if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'landing' }, '', '#landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private safeSetSession(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Ignore sessionStorage exceptions
    }
  }
}