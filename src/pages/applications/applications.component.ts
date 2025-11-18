import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Application {
  id: number;
  jobTitle: string;
  company: string;
  source: string; // LinkedIn, Indeed, Gupy, etc.
  appliedDate: string;
  match?: number;
  jobLink: string;
}

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  applications: Application[] = [
    {
      id: 1,
      jobTitle: 'Desenvolvedor Frontend Angular',
      company: 'Tech Solutions Inc',
      source: 'LinkedIn',
      appliedDate: '15 Jan 2024',
      match: 92,
      jobLink: 'https://linkedin.com/jobs/view/123',
    },
    {
      id: 2,
      jobTitle: 'Senior Software Engineer',
      company: 'Startup Inovadora',
      source: 'Indeed',
      appliedDate: '12 Jan 2024',
      match: 78,
      jobLink: 'https://indeed.com/job/456',
    },
    {
      id: 3,
      jobTitle: 'Full Stack Developer',
      company: 'Empresa Global',
      source: 'Gupy',
      appliedDate: '10 Jan 2024',
      match: 85,
      jobLink: 'https://empresaglobal.gupy.io/job/789',
    },
    {
      id: 4,
      jobTitle: 'Mobile Developer React Native',
      company: 'App Masters',
      source: 'LinkedIn',
      appliedDate: '08 Jan 2024',
      match: 67,
      jobLink: 'https://linkedin.com/jobs/view/321',
    },
  ];

  getTotalApplications(): number {
    return this.applications.length;
  }

  getThisWeekApplications(): number {
    // Simulação - na prática filtraria por data da semana
    return this.applications.filter((app) => app.appliedDate.includes('Jan'))
      .length;
  }

  getUniqueCompanies(): number {
    const companies = new Set(this.applications.map((app) => app.company));
    return companies.size;
  }

  getSources() {
    const sourceCount: { [key: string]: number } = {};

    this.applications.forEach((app) => {
      sourceCount[app.source] = (sourceCount[app.source] || 0) + 1;
    });

    return Object.entries(sourceCount).map(([name, count]) => ({
      name,
      count,
    }));
  }

  viewJobDetails(application: Application) {
    // Abre o link da vaga em nova aba
    window.open(application.jobLink, '_blank');
  }

  applyAgain(application: Application) {
    // Reaplica para a mesma vaga
    window.open(application.jobLink, '_blank');
    console.log('Reaplicando para:', application.jobTitle);
  }

  addToFavorites(application: Application) {
    console.log('Adicionando aos favoritos:', application.jobTitle);
    // Implementar lógica de favoritos
  }

  shareJob(application: Application) {
    console.log('Compartilhando vaga:', application.jobTitle);
    // Implementar compartilhamento
  }

  removeApplication(application: Application) {
    this.applications = this.applications.filter(
      (app) => app.id !== application.id
    );
    console.log('Removendo candidatura:', application.jobTitle);
  }

  exportApplications() {
    console.log('Exportando histórico de candidaturas...');
    // Implementar export para CSV
  }

  clearHistory() {
    if (
      confirm('Tem certeza que deseja limpar todo o histórico de candidaturas?')
    ) {
      this.applications = [];
    }
  }
}
