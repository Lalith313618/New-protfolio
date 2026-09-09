import { Component } from '@angular/core';
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
  template: `
    <app-landing *ngIf="showLanding" (explore)="openPortfolio()"></app-landing>
    <ng-container *ngIf="!showLanding">
      <app-navbar (openResume)="showResumeModal = true"></app-navbar>
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
    </ng-container>
  `
})
export class App {
  showLanding = true;
  showResumeModal = false;

  openPortfolio(): void {
    this.showLanding = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}