import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent {
  @Output() explore = new EventEmitter<void>();

  enterPortfolio(): void {
    this.explore.emit();
  }
}
