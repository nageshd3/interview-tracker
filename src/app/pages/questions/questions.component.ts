import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Question } from '../../core/models/question.model';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  questions: Question[];

  constructor(service: QuestionService) {
    this.questions = service.getAll();
  }
}
