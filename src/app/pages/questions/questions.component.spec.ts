import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import { QuestionService } from '../../core/services/question.service';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],
      providers: [QuestionService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories available', () => {
    const categories = component.categories();
    expect(Array.isArray(categories)).toBeTrue();
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should have initial category selected', () => {
    const selected = component.selectedCategory();
    expect(selected).toBeTruthy();
    expect(component.categories().includes(selected)).toBeTrue();
  });

  it('should filter questions by category', () => {
    const filtered = component.filteredQuestions();
    expect(Array.isArray(filtered)).toBeTrue();
    filtered.forEach(q => {
      expect(q.category).toBe(component.selectedCategory());
    });
  });

  it('should change selected category', () => {
    const categories = component.categories();
    if (categories.length > 1) {
      const newCategory = categories[1];
      component.selectCategory(newCategory);
      expect(component.selectedCategory()).toBe(newCategory);
    }
  });

  it('should update filtered questions when category changes', () => {
    const categories = component.categories();
    if (categories.length > 1) {
      component.selectCategory(categories[0]);
      const firstFiltered = component.filteredQuestions();

      component.selectCategory(categories[1]);
      const secondFiltered = component.filteredQuestions();

      // Categories should have different questions
      expect(firstFiltered.every(q => q.category === categories[0])).toBeTrue();
      expect(secondFiltered.every(q => q.category === categories[1])).toBeTrue();
    }
  });
});
