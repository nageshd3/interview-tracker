import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewService } from '../../core/services/interview.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  total = 0;
  completed = 0;
  scheduled = 0;

  constructor(service: InterviewService) {
    const interviews = service.getAll();
    this.total = interviews.length;
    this.completed = interviews.filter(i => i.status === 'Completed').length;
    this.scheduled = interviews.filter(i => i.status === 'Scheduled').length;
  }
}
