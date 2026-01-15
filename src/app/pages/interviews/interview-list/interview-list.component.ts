import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Interview } from '../../../core/models/interview.model';
import { InterviewService } from '../../../core/services/interview.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog.component';
import { futureDateValidator } from '../../../core/validators/future-date.validator';
import { requiredTrimmedValidator } from '../../../core/validators/required-trimmed.validator';
import { minLengthTrimmedValidator } from '../../../core/validators/min-length-trimmed.validator';

@Component({
  selector: 'app-interview-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './interview-list.component.html',
  styleUrl: './interview-list.component.css',
})
export class InterviewListComponent {
  private fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  private service = inject(InterviewService);
  private snackBar = inject(MatSnackBar);

  interviews = this.service.getAll();
  error = this.service.getError();

  // Filter signals
  statusFilter = signal<string>('All');
  companyFilter = signal<string>('');
  searchTerm = signal<string>('');

  // Filtered interviews
  filteredInterviews = computed(() => {
    let filtered = this.interviews();

    // Filter by status
    if (this.statusFilter() !== 'All') {
      filtered = filtered.filter(i => i.status === this.statusFilter());
    }

    // Filter by company (case-insensitive)
    if (this.companyFilter().trim()) {
      const company = this.companyFilter().toLowerCase().trim();
      filtered = filtered.filter(i => i.company.toLowerCase().includes(company));
    }

    // Filter by search term (company or role)
    if (this.searchTerm().trim()) {
      const term = this.searchTerm().toLowerCase().trim();
      filtered = filtered.filter(
        i => i.company.toLowerCase().includes(term) || i.role.toLowerCase().includes(term)
      );
    }

    return filtered;
  });

  // Computed stats based on filtered results
  total = computed(() => this.filteredInterviews().length);
  completed = computed(
    () => this.filteredInterviews().filter((i: Interview) => i.status === 'Completed').length
  );
  scheduled = computed(
    () => this.filteredInterviews().filter((i: Interview) => i.status === 'Scheduled').length
  );

  interviewForm: FormGroup;
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0];

  constructor() {
    this.interviewForm = this.fb.group({
      company: ['', [requiredTrimmedValidator, minLengthTrimmedValidator(2)]],
      role: ['', [requiredTrimmedValidator, minLengthTrimmedValidator(2)]],
      date: ['', [Validators.required, futureDateValidator]],
    });
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
        this.interviewForm.reset();

        this.snackBar.open('Interview added successfully', 'Close', {
          duration: 3000,
        });
      } catch {
        this.snackBar.open('Failed to add interview', 'Close', {
          duration: 3000,
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
        message: 'Are you sure you want to delete this interview?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const success = this.service.deleteInterview(id);

        if (success) {
          this.snackBar.open('Interview deleted', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        }
      }
    });
  }

  // Filter methods
  updateStatusFilter(status: string): void {
    this.statusFilter.set(status);
  }

  updateCompanyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.companyFilter.set(value);
  }

  updateSearchTerm(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  clearFilters(): void {
    this.statusFilter.set('All');
    this.companyFilter.set('');
    this.searchTerm.set('');
  }
}
