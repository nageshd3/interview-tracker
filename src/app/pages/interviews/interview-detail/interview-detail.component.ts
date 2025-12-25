import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { Interview } from '../../../core/models/interview.model';
import { InterviewService } from '../../../core/services/interview.service';

@Component({
  selector: 'app-interview-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './interview-detail.component.html',
  styleUrl: './interview-detail.component.css'
})
export class InterviewDetailComponent {
  interview: Interview | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InterviewService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.redirectToList();
      return;
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      this.redirectToList();
      return;
    }

    const interview = this.service.getById(id);

    if (!interview) {
      this.redirectToList();
      return;
    }

    this.interview = interview;
  }

  private redirectToList() {
    this.router.navigate(['/interviews']);
  }
}
