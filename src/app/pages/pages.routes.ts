import { Routes } from '@angular/router';
import { IncomeComponent } from './income/income.component';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages.component').then((c) => c.PagesComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'income',
    loadComponent: () =>
      import('./income/income.component').then((c) => c.IncomeComponent),
  },
  {
    path: 'sending',
    loadComponent: () =>
      import('./sending/sending.component').then((c) => c.SendingComponent),
  },
  {
    path: 'setting-tag',
    loadComponent: () =>
      import('./setting-tag/setting-tag.component').then(
        (c) => c.SettingTagComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },
];
