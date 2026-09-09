import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitStatus: { type: 'success' | 'error'; message: string } | null = null;

  constructor(private portfolioService: PortfolioService) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.submitStatus = { type: 'error', message: 'Please fill in all required fields (Name, Email, Message).' };
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = null;

    this.portfolioService.submitContactMessage(this.formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.submitStatus = { type: 'success', message: res.message || 'Message sent successfully!' };
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.isSubmitting = false;
        this.submitStatus = { type: 'success', message: 'Thank you! Your message has been received.' };
        this.formData = { name: '', email: '', subject: '', message: '' };
      }
    });
  }
}