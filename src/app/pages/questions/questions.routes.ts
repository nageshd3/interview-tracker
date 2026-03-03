import { Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';

export const QUESTIONS_ROUTES: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'add', component: AddQuestionComponent },
];
