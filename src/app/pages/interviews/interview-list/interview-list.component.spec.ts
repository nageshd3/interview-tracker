import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewListComponent } from './interview-list.component';
import { InterviewService } from '../../../core/services/interview.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

function getFutureDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 2); // +2 to be extra safe
  return date.toISOString().split('T')[0];
}

describe('InterviewListComponent', () => {
  let component: InterviewListComponent;
  let fixture: ComponentFixture<InterviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InterviewListComponent,
        NoopAnimationsModule // avoids Material animation issues
      ],
      providers: [
  InterviewService,
  { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
  { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) }
]
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form invalid when empty', () => {
    expect(component.interviewForm.invalid).toBeTrue();
  });

  it('should validate company minimum length', () => {
    component.company?.setValue('A'); // invalid
    component.role?.setValue('Developer');
    component.date?.setValue(getFutureDate());

    component.company?.markAsTouched();
    component.interviewForm.updateValueAndValidity();
    fixture.detectChanges();

    expect(component.company?.hasError('minlength')).toBeTrue();
    expect(component.company?.valid).toBeFalse();
  });



  it('should mark form valid with correct inputs', () => {
    component.company?.setValue('Google');
    component.role?.setValue('Frontend Developer');
    component.date?.setValue(getFutureDate());

    // Trigger validation
    component.interviewForm.updateValueAndValidity();
    fixture.detectChanges();

    expect(component.interviewForm.valid).toBeTrue();
  });


  it('should not submit when form is invalid', () => {
    spyOn(component, 'addInterview').and.callThrough();

    component.addInterview();

    expect(component.interviewForm.invalid).toBeTrue();
  });
});
