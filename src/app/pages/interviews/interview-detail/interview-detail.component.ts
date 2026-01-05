import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { InterviewService } from '../../../core/services/interview.service';

@Component({
  selector: 'app-interview-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './interview-detail.component.html',
  styleUrl: './interview-detail.component.css'
})
export class InterviewDetailComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(InterviewService);

  interview = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.redirectToList();
      return undefined;
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      this.redirectToList();
      return undefined;
    }

    const interview = this.service.getById(id)();

    if (!interview) {
      this.redirectToList();
      return undefined;
    }

    return interview;
  });

  private redirectToList() {
    this.router.navigate(['/interviews']);
  }
}
