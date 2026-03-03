import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private questionService = inject(QuestionService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  categories = this.questionService.getCategories();
  isSubmitting = signal(false);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      category: ['', [Validators.required]],
      question: [
        '',
        [Validators.required, Validators.minLength(5), this.noLeadingTrailingSpaces()],
      ],
      answer: ['', [Validators.required, Validators.minLength(5), this.noLeadingTrailingSpaces()]],
    });
  }

  private noLeadingTrailingSpaces() {
    return (control: { value: string }) => {
      if (!control.value) {
        return null;
      }
      const trimmed = control.value.trim();
      if (trimmed !== control.value) {
        return { leadingTrailingSpaces: true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.isSubmitting.set(true);

    const formValue = this.form.value;
    const newQuestion = {
      category: formValue.category,
      question: formValue.question.trim(),
      answer: formValue.answer.trim(),
    };

    this.questionService.createQuestion(newQuestion).subscribe({
      next: response => {
        console.log('Question created successfully:', response);
        this.isSubmitting.set(false);
        this.snackBar.open('Question created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/questions']);
      },
      error: error => {
        this.isSubmitting.set(false);
        this.snackBar.open('Failed to create question. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        console.error('Error creating question:', error);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/questions']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.capitalize(fieldName)} is required`;
    }
    if (control.errors['minLength']) {
      return `${this.capitalize(fieldName)} must be at least ${control.errors['minLength'].requiredLength} characters`;
    }
    if (control.errors['leadingTrailingSpaces']) {
      return `${this.capitalize(fieldName)} cannot have leading or trailing spaces`;
    }
    return 'Invalid input';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
