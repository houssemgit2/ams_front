import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/providers',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),

    children: [
      {
        path: 'providers',
        loadComponent: () =>
          import('./pages/providers-list/providers-list').then((m) => m.ProvidersList),
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users').then((m) => m.Users),
      },
      {
        path: 'add-provider',
        loadComponent: () => import('./pages/add-provider/add-provider').then((m) => m.AddProvider),
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: 'logout',
        loadComponent: () => import('./pages/logout/logout').then((m) => m.Logout),
      },
      {
        path: '',
        redirectTo: 'providers',
        pathMatch: 'full',
      },
    ],
  },
];
