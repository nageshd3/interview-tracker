import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Interview } from '../../../core/models/interview.model';
import { InterviewService } from '../../../core/services/interview.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog.component';
import { futureDateValidator } from '../../../core/validators/future-date.validator';

@Component({
  selector: 'app-interview-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './interview-list.component.html',
  styleUrl: './interview-list.component.css'
})
export class InterviewListComponent {
  private fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  private service = inject(InterviewService);
  private snackBar = inject(MatSnackBar);

  total = 0;
  completed = 0;
  scheduled = 0;
  interviews: Interview[];
  interviewForm: FormGroup;
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0];

  constructor() {
    const service = this.service;

    this.interviewForm = this.fb.group({
      company: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', [Validators.required, futureDateValidator]]
    });

    this.interviews = service.getAll();
    this.total = this.interviews.length;
    this.completed = this.interviews.filter((i: Interview) => i.status === 'Completed').length;
    this.scheduled = this.interviews.filter((i: Interview) => i.status === 'Scheduled').length;
  }

  addInterview() {
    if (this.interviewForm.invalid || this.isSubmitting) {
      this.interviewForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate async API call
    setTimeout(() => {
      try {
        this.service.addInterview(this.interviewForm.value);
        this.interviews = this.service.getAll();
        this.interviewForm.reset();

        this.snackBar.open('Interview added successfully', 'Close', {
          duration: 3000
        });
      } catch {
        this.snackBar.open('Failed to add interview', 'Close', {
          duration: 3000
        });
      } finally {
        this.isSubmitting = false;
      }
    }, 800);
  }

  // Convenience getters (interview-friendly)
  get company() {
    return this.interviewForm.get('company');
  }

  get role() {
    return this.interviewForm.get('role');
  }

  get date() {
    return this.interviewForm.get('date');
  }

  deleteInterview(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this interview?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const success = this.service.deleteInterview(id);

        if (success) {
          this.interviews = this.service.getAll();
          this.snackBar.open('Interview deleted', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        }
      }
    });
  }

}
