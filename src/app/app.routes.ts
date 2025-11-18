import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { JobsComponent } from '../pages/jobs/jobs.component';
import { ApplicationsComponent } from '../pages/applications/applications.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'favorites', component: HomeComponent },
  { path: 'tracker', component: HomeComponent },
  { path: 'cv-analyzer', component: HomeComponent },
  { path: 'followup', component: HomeComponent },
  { path: 'analytics', component: HomeComponent },
  { path: 'companies', component: HomeComponent },
  { path: 'salaries', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
