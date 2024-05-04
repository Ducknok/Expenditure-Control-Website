import { Routes, provideRouter, withDebugTracing } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent)
  },
  {
    path: 'call-back',
    loadComponent: () =>
      import('./call-back/call-back.component').then((c) => c.CallBackComponent)
  },
];
