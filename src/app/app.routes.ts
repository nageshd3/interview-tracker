import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },

  {
    path: 'interviews',
    loadChildren: () =>
      import('./pages/interviews/interviews.routes').then(m => m.INTERVIEWS_ROUTES),
  },

  {
    path: 'questions',
    loadChildren: () => import('./pages/questions/questions.routes').then(m => m.QUESTIONS_ROUTES),
  },

  {
    path: 'notes',
    loadChildren: () => import('./pages/notes/notes.routes').then(m => m.NOTES_ROUTES),
  },

  { path: '**', redirectTo: '' },
];
