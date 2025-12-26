import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from "@angular/material/card";

import { Interview } from '../../core/models/interview.model';
import { InterviewService } from '../../core/services/interview.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  total = 0;
  completed: Interview[] = [];
  scheduled: Interview[] = [];

  constructor(service: InterviewService) {
    const interviews = service.getAll();
    this.total = interviews.length;
    this.completed = interviews.filter(i => i.status === 'Completed');
    this.scheduled = interviews.filter(i => i.status === 'Scheduled');
  }
}
