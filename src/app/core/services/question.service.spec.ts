import { TestBed } from '@angular/core/testing';

import { Question } from '../models/question.model';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService],
    });

    service = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of questions', () => {
    const questions = service.getAll()();

    expect(questions).toBeTruthy();
    expect(Array.isArray(questions)).toBeTrue();
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should return questions with required properties', () => {
    const question: Question = service.getAll()()[0];

    expect(question['id']).toBeDefined();
    expect(question['category']).toBeDefined();
    expect(question['question']).toBeDefined();
    expect(question['answer']).toBeDefined();
  });

  it('should return a new array reference (immutability)', () => {
    const firstCall = service.getAll()();
    const secondCall = service.getAll()();

    expect(firstCall).not.toBe(secondCall);
  });

  it('should return unique categories', () => {
    const categories = service.getCategories()();

    expect(categories.length).toBeGreaterThan(0);
    expect(new Set(categories).size).toBe(categories.length);
  });
});
