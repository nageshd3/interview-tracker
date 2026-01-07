import { Injectable, signal, computed, Signal } from '@angular/core';
import { Interview } from '../models/interview.model';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private storageKey = 'interviews';
  private interviewsSignal = signal<Interview[]>([]);
  private errorSignal = signal<string | null>(null);

  constructor() {
    this.loadFromStorage();

    // ✅ Seed data for first-time load only
    if (this.interviewsSignal().length === 0) {
      this.seedInitialData();
    }
  }

  /* -------------------------
     Public API
  --------------------------*/

  /**
   * Retrieve all interviews as a reactive signal.
   * @returns Signal of Interview array.
   */
  getAll(): Signal<Interview[]> {
    return computed(() => [...this.interviewsSignal()]);
  }

  getById(id: number): Signal<Interview | undefined> {
    return computed(() => this.interviewsSignal().find(i => i.id === id));
  }

  getError(): Signal<string | null> {
    return this.errorSignal.asReadonly();
  }

  clearError(): void {
    this.errorSignal.set(null);
  }

  addInterview(data: Omit<Interview, 'id' | 'status'>): void {
    const interview: Interview = {
      id: Date.now(),
      status: 'Scheduled',
      ...data,
    };

    this.interviewsSignal.update(interviews => [...interviews, interview]);
    this.saveToStorage();
  }

  updateInterview(updated: Interview): boolean {
    const index = this.interviewsSignal().findIndex(i => i.id === updated.id);

    if (index === -1) {
      console.warn('Interview not found for update:', updated.id);
      return false;
    }

    this.interviewsSignal.update(interviews => {
      const newInterviews = [...interviews];
      newInterviews[index] = { ...updated };
      return newInterviews;
    });
    this.saveToStorage();
    return true;
  }

  deleteInterview(id: number): boolean {
    const initialLength = this.interviewsSignal().length;
    this.interviewsSignal.update(interviews => interviews.filter(i => i.id !== id));

    if (this.interviewsSignal().length === initialLength) {
      console.warn('Interview not found for delete:', id);
      return false;
    }

    this.saveToStorage();
    return true;
  }

  /* -------------------------
     Persistence (Private)
  --------------------------*/

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);

      if (!stored) {
        this.interviewsSignal.set([]);
        this.errorSignal.set(null); // Clear any previous error
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        throw new Error('Invalid interview data format');
      }

      this.interviewsSignal.set(parsed);
      this.errorSignal.set(null); // Success, clear error
    } catch (error) {
      console.error('Failed to load interviews from localStorage:', error);
      this.interviewsSignal.set([]);
      this.errorSignal.set('Failed to load interviews from storage. Using default data.');
    }
  }

  private saveToStorage(): boolean {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.interviewsSignal()));
      this.errorSignal.set(null); // Success, clear error
      return true;
    } catch (error) {
      console.error('Failed to save interviews to localStorage:', error);
      this.errorSignal.set('Failed to save interviews to storage.');
      return false;
    }
  }

  /* -------------------------
     Seed Data (Private)
  --------------------------*/

  private seedInitialData(): void {
    const seedData: Interview[] = [
      {
        id: 1,
        company: 'Google',
        role: 'Frontend Engineer',
        date: '2026-02-10',
        status: 'Scheduled',
      },
      {
        id: 2,
        company: 'Microsoft',
        role: 'Angular Developer',
        date: '2026-10-10',
        status: 'Completed',
        notes: 'Strong RxJS and Angular fundamentals',
      },
    ];

    this.interviewsSignal.set(seedData);
    this.saveToStorage();
  }
}
