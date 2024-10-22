import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './presentation/layouts/dashboardLayout/dashboardLayout.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'prompt',
        loadComponent: () =>
          import(
            './presentation/pages/prompts-page/prompts-page.component'
          ),
        data: {
          icon: 'fa-solid fa-spell-check',
          title: 'Revisar prompt',
          description: 'Prueba de prompts por esquema.',
        },
      },
      {
        path: '**',
        redirectTo: 'prompt',
        pathMatch: 'full',
      },
    ],
  },
];
