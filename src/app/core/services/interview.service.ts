import { Injectable } from '@angular/core';
import { Interview } from '../models/interview.model';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private storageKey = 'interviews';
  private interviews: Interview[] = [
    {
      id: 1,
      company: 'Google',
      role: 'Frontend Engineer',
      date: '2024-12-10',
      status: 'Completed',
      feedback: 'Good DS & Angular discussion'
    },
    {
      id: 2,
      company: 'Microsoft',
      role: 'UI Developer',
      date: '2025-01-05',
      status: 'Scheduled'
    }
  ];

  constructor() {
    this.loadFromStorage();
  }

  /* -------------------------
     Public API
  --------------------------*/

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
}
