import { Injectable, signal, computed, Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api';

  // Initial hardcoded questions have been replaced with an empty array.
  private questionsSignal = signal<Question[]>([]);

  getAll(): Signal<Question[]> {
    // Fetch questions from the backend API and update the signal
    this.http
      .get<{ message: string; questions: Question[] }>(`${this.API_URL}/questions`)
      .subscribe(response => {
        this.questionsSignal.set(response.questions);
      });
    return computed(() => [...this.questionsSignal()]);
  }

  getById(id: number): Signal<Question | undefined> {
    return computed(() => this.questionsSignal().find(q => q.id === id));
  }

  /**
   * Retrieve all unique question categories.
   * @returns Signal of unique category strings.
   */
  getCategories(): Signal<string[]> {
    return computed(() => [...new Set(this.questionsSignal().map(q => q.category))]);
  }

  /**
   * Create a new question on the server.
   * @param question The question data to create (without id)
   * @returns Observable with the response from the server
   */
  createQuestion(
    question: Omit<Question, 'id'>
  ): Observable<{ message: string; question: Question }> {
    return this.http
      .post<{ message: string; question: Question }>(`${this.API_URL}/questions`, question)
      .pipe(
        tap(response => {
          // Add the newly created question to the signal
          const currentQuestions = this.questionsSignal();
          this.questionsSignal.set([...currentQuestions, response.question]);
        })
      );
  }
}
