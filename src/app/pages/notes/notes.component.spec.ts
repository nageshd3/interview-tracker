import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have notes array populated', () => {
    expect(Array.isArray(component.notes)).toBeTrue();
    expect(component.notes.length).toBeGreaterThan(0);
  });

  it('should have meaningful notes content', () => {
    component.notes.forEach(note => {
      expect(typeof note).toBe('string');
      expect(note.length).toBeGreaterThan(0);
    });
  });

  it('should render notes in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const noteElements = compiled.querySelectorAll('.note-card');
    expect(noteElements.length).toBe(component.notes.length);
  });

  it('should display pro tips section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tipsSection = compiled.querySelector('.tips-section');
    expect(tipsSection).toBeTruthy();
  });
});
