import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  notes: string[] = [
    'Prepare thoughtful questions for the interviewer about company culture, team dynamics, and role expectations.',
    'Research the company background, recent news, and projects. Demonstrate genuine interest and knowledge.',
    'Practice common interview questions (behavioral, technical, situational) with the STAR method.',
    'Prepare your elevator pitch - a concise summary of your background, skills, and career goals.',
    'List 3-5 specific examples of your achievements with quantifiable results to share during interviews.',
    'Anticipate questions about your weaknesses and prepare honest, growth-oriented responses.',
  ];
}
