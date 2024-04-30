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
    path: 'setting-category',
    loadComponent: () =>
      import('./setting-category/setting-category.component').then(
        (c) => c.SettingCategoryComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./setting/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'password',
    loadComponent: () =>
      import('./setting/password/password.component').then(
        (c) => c.PasswordComponent
      ),
  },
];
