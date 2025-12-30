import { Injectable } from '@angular/core';
import { Interview } from '../models/interview.model';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private storageKey = 'interviews';
  private interviews: Interview[] = [];

  constructor() {
    this.loadFromStorage();

    // ✅ Seed data for first-time load only
    if (this.interviews.length === 0) {
      this.seedInitialData();
    }
  }

  /* -------------------------
     Public API
  --------------------------*/

  /**
   * Retrieve all interviews.
   * @returns Array of Interview objects.
   */
  getAll(): Interview[] {
    return [...this.interviews];
  }

  getById(id: number): Interview | undefined {
    return this.interviews.find(i => i.id === id);
  }

  addInterview(data: Omit<Interview, 'id' | 'status'>): void {
    const interview: Interview = {
      id: Date.now(),
      status: 'Scheduled',
      ...data
    };

    this.interviews.push(interview);
    this.saveToStorage();
  }

  updateInterview(updated: Interview): boolean {
    const index = this.interviews.findIndex(i => i.id === updated.id);

    if (index === -1) {
      console.warn('Interview not found for update:', updated.id);
      return false;
    }

    this.interviews[index] = { ...updated };
    this.saveToStorage();
    return true;
  }

  deleteInterview(id: number): boolean {
    const initialLength = this.interviews.length;
    this.interviews = this.interviews.filter(i => i.id !== id);

    if (this.interviews.length === initialLength) {
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
        this.interviews = [];
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        throw new Error('Invalid interview data format');
      }

      this.interviews = parsed;
    } catch (error) {
      console.error('Failed to load interviews from localStorage:', error);
      this.interviews = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.interviews)
      );
    } catch (error) {
      console.error('Failed to save interviews to localStorage:', error);
    }
  }

  /* -------------------------
     Seed Data (Private)
  --------------------------*/

  private seedInitialData(): void {
    this.interviews = [
      {
        id: 1,
        company: 'Google',
        role: 'Frontend Engineer',
        date: '2025-02-10',
        status: 'Scheduled'
      },
      {
        id: 2,
        company: 'Microsoft',
        role: 'Angular Developer',
        date: '2025-10-10',
        status: 'Completed',
        notes: 'Strong RxJS and Angular fundamentals'
      }
    ];

    this.saveToStorage();
  }
}
