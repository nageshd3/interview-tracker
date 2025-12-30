import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { InterviewService } from '../../core/services/interview.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private interviewService = inject(InterviewService);

  interviews = this.interviewService.getAll();

  total = this.interviews.length;
  completed = this.interviews.filter(i => i.status === 'Completed');
  scheduled = this.interviews.filter(i => i.status === 'Scheduled');
}
