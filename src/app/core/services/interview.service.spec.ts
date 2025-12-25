import { TestBed } from '@angular/core/testing';
import { InterviewService } from './interview.service';
import { Interview } from '../models/interview.model';

describe('InterviewService', () => {
    let service: InterviewService;

    beforeEach(() => {
        localStorage.clear();

        TestBed.configureTestingModule({
            providers: [InterviewService]
        });

        service = TestBed.inject(InterviewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add an interview and persist it', () => {
        service.addInterview({
            company: 'Google',
            role: 'Frontend',
            date: '2025-01-01'
        });

        const interviews = service.getAll();
        expect(interviews.length).toBe(1);
        expect(interviews[0].company).toBe('Google');
    });

    it('should update an existing interview', () => {
        service.addInterview({
            company: 'Amazon',
            role: 'UI Dev',
            date: '2025-02-01'
        });

        const interview = service.getAll()[0];

        const updated: Interview = {
            ...interview,
            role: 'Senior UI Dev'
        };

        const result = service.updateInterview(updated);

        expect(result).toBeTrue();
        expect(service.getById(interview.id)?.role).toBe('Senior UI Dev');
    });

    it('should delete an interview', () => {
        service.addInterview({
            company: 'Meta',
            role: 'Frontend',
            date: '2025-03-01'
        });

        const interview = service.getAll()[0];
        const result = service.deleteInterview(interview.id);

        expect(result).toBeTrue();
        expect(service.getAll().length).toBe(0);
    });

    it('should handle invalid delete gracefully', () => {
        const result = service.deleteInterview(999);
        expect(result).toBeFalse();
    });

    it('should not crash on corrupted localStorage data', () => {
        localStorage.setItem('interviews', 'INVALID_JSON');

        const newService = new InterviewService();
        expect(newService.getAll().length).toBe(0);
    });
});
