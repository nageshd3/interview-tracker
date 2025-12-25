import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InterviewListComponent } from './pages/interviews/interview-list/interview-list.component';
import { InterviewDetailComponent } from './pages/interviews/interview-detail/interview-detail.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { NotesComponent } from './pages/notes/notes.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'interviews', component: InterviewListComponent },
  { path: 'interviews/:id', component: InterviewDetailComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'notes', component: NotesComponent },
  { path: '**', redirectTo: '' }
];
