import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'jobs', component: HomeComponent },
  { path: 'applications', component: HomeComponent },
  { path: 'favorites', component: HomeComponent },
  { path: 'tracker', component: HomeComponent },
  { path: 'cv-analyzer', component: HomeComponent },
  { path: 'followup', component: HomeComponent },
  { path: 'analytics', component: HomeComponent },
  { path: 'companies', component: HomeComponent },
  { path: 'salaries', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
