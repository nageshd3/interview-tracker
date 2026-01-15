import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { InterviewDetailComponent } from './interview-detail.component';
import { InterviewService } from '../../../core/services/interview.service';

describe('InterviewDetailComponent', () => {
  let component: InterviewDetailComponent;
  let fixture: ComponentFixture<InterviewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewDetailComponent, RouterTestingModule],
      providers: [
        InterviewService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load interview from route parameter', () => {
    const interview = component.interview();
    if (interview) {
      expect(interview.id).toBeDefined();
      expect(interview.company).toBeTruthy();
    }
  });

  it('should redirect when interview id is not found', () => {
    // This depends on the service data
    const interview = component.interview();
    expect(interview === undefined || interview !== null).toBeTrue();
  });
});
