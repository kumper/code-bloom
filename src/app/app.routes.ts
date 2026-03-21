import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/welcome/welcome').then((m) => m.WelcomeComponent),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./components/quiz/quiz').then((m) => m.QuizComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
