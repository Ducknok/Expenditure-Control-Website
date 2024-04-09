import { Routes } from '@angular/router';
import { AuthGuard } from './auth/authGuard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
];
