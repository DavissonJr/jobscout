import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { JobsComponent } from '../pages/jobs/jobs.component';
import { ApplicationsComponent } from '../pages/applications/applications.component';
import { TrackerComponent } from '../pages/tracker/tracker.component';
import { CvAnalyzerComponent } from '../pages/cv-analyzer/cv-analyzer.component';
import { AutoFollowupPageComponent } from '../pages/auto-follow-up/auto-follow-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'tracker', component: TrackerComponent },
  { path: 'cv-analyzer', component: CvAnalyzerComponent },
  { path: 'followup', component: AutoFollowupPageComponent },
  { path: 'analytics', component: HomeComponent },
  { path: 'companies', component: HomeComponent },
  { path: 'salaries', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
