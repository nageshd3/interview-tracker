import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent {
  private service = inject(QuestionService);
  private router = inject(Router);

  questions = this.service.getAll();
  categories = this.service.getCategories();
  selectedCategory = signal(this.categories()[0] ?? '');

  filteredQuestions = computed(() =>
    this.questions().filter(q => q.category === this.selectedCategory())
  );

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  navigateToAddQuestion(): void {
    this.router.navigate(['/questions/add']);
  }
}
