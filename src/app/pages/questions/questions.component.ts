import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { Question } from '../../core/models/question.model';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCardModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  questions: Question[];
  categories: string[] = [];
  selectedCategory = '';

  constructor() {
    const service = inject(QuestionService);

    this.questions = service.getAll();
    this.categories = service.getCategories();
    this.selectedCategory = this.categories[0] ?? '';
  }

  get filteredQuestions(): Question[] {
    return this.questions.filter(
      q => q.category === this.selectedCategory
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }
}
