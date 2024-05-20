import { Routes } from '@angular/router';
import { AuthGuard } from './auth/authGuard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.routes').then((r) => r.pagesRoutes),
    // canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((r) => r.authRoutes),
  }
];
