import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((r) => r.AppComponent),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.routes').then((r) => r.pagesRoutes),
  },
];
