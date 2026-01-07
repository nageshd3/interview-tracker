import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { InterviewService } from '../../core/services/interview.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private interviewService = inject(InterviewService);

  interviews = this.interviewService.getAll();
  error = this.interviewService.getError();

  total = computed(() => this.interviews().length);
  completed = computed(() => this.interviews().filter(i => i.status === 'Completed'));
  scheduled = computed(() => this.interviews().filter(i => i.status === 'Scheduled'));
}
