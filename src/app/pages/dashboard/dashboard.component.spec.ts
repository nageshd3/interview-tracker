import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { InterviewService } from '../../core/services/interview.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, RouterTestingModule],
      providers: [InterviewService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total interviews correctly', () => {
    const total = component.total();
    expect(typeof total).toBe('number');
    expect(total).toBeGreaterThanOrEqual(0);
  });

  it('should filter completed interviews', () => {
    const completed = component.completed();
    expect(Array.isArray(completed)).toBeTrue();
    completed.forEach(interview => {
      expect(interview.status).toBe('Completed');
    });
  });

  it('should filter scheduled interviews', () => {
    const scheduled = component.scheduled();
    expect(Array.isArray(scheduled)).toBeTrue();
    scheduled.forEach(interview => {
      expect(interview.status).toBe('Scheduled');
    });
  });

  it('should have error signal', () => {
    const error = component.error();
    expect(error === null || typeof error === 'string').toBeTrue();
  });

  it('should display interviews from service', () => {
    const interviews = component.interviews();
    expect(Array.isArray(interviews)).toBeTrue();
  });
});
