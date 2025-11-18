import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  type: string;
  posted: string;
  logo: string;
  isFavorite: boolean;
  skills: string[];
}

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  jobTypes = [
    { value: 'all', label: 'Todos os tipos', icon: 'bi-grid' },
    { value: 'Remoto', label: 'Remoto', icon: 'bi-house' },
    { value: 'Híbrido', label: 'Híbrido', icon: 'bi-building' },
    { value: 'Presencial', label: 'Presencial', icon: 'bi-geo-alt' },
  ];

  matchFilters = [
    { value: 'all', label: 'Todos' },
    { value: 'high', label: 'Alto (80%+)' },
    { value: 'medium', label: 'Médio (60-79%)' },
    { value: 'low', label: 'Baixo (<60%)' },
  ];

  jobs: Job[] = [
    {
      id: 1,
      title: 'Desenvolvedor Frontend Angular',
      company: 'Tech Solutions Inc',
      location: 'São Paulo, SP',
      salary: 'R$ 8.000 - R$ 12.000',
      match: 92,
      type: 'Remoto',
      posted: '2 horas atrás',
      logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=FF6B35&color=fff',
      isFavorite: true,
      skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
    },
    {
      id: 2,
      title: 'Senior Software Engineer',
      company: 'Startup Inovadora',
      location: 'Rio de Janeiro, RJ',
      salary: 'R$ 15.000 - R$ 20.000',
      match: 78,
      type: 'Híbrido',
      posted: '1 dia atrás',
      logo: 'https://ui-avatars.com/api/?name=Startup+Inovadora&background=FF6B35&color=fff',
      isFavorite: false,
      skills: ['Java', 'Spring Boot', 'AWS', 'Docker'],
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Empresa Global',
      location: 'Belo Horizonte, MG',
      salary: 'R$ 10.000 - R$ 14.000',
      match: 85,
      type: 'Presencial',
      posted: '3 dias atrás',
      logo: 'https://ui-avatars.com/api/?name=Empresa+Global&background=FF6B35&color=fff',
      isFavorite: true,
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    },
    {
      id: 4,
      title: 'Mobile Developer React Native',
      company: 'App Masters',
      location: 'Curitiba, PR',
      salary: 'R$ 9.000 - R$ 13.000',
      match: 67,
      type: 'Remoto',
      posted: '5 dias atrás',
      logo: 'https://ui-avatars.com/api/?name=App+Masters&background=FF6B35&color=fff',
      isFavorite: false,
      skills: ['React Native', 'JavaScript', 'Redux', 'Firebase'],
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Tech',
      location: 'Porto Alegre, RS',
      salary: 'R$ 12.000 - R$ 18.000',
      match: 45,
      type: 'Híbrido',
      posted: '1 semana atrás',
      logo: 'https://ui-avatars.com/api/?name=Cloud+Tech&background=FF6B35&color=fff',
      isFavorite: false,
      skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    },
  ];

  filteredJobs: Job[] = [...this.jobs];
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedMatch: string = 'all';

  toggleFavorite(job: Job) {
    job.isFavorite = !job.isFavorite;
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

      const matchesType =
        this.selectedType === 'all' || job.type === this.selectedType;

      const matchesMatch =
        this.selectedMatch === 'all' ||
        (this.selectedMatch === 'high' && job.match >= 80) ||
        (this.selectedMatch === 'medium' &&
          job.match >= 60 &&
          job.match < 80) ||
        (this.selectedMatch === 'low' && job.match < 60);

      return matchesSearch && matchesType && matchesMatch;
    });
  }

  filterByMatch(matchLevel: string) {
    this.selectedMatch = matchLevel;
    this.filterJobs();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedType = 'all';
    this.selectedMatch = 'all';
    this.filteredJobs = [...this.jobs];
  }

  getMatchLevel(match: number): string {
    if (match >= 80) return 'high';
    if (match >= 60) return 'medium';
    return 'low';
  }

  getAverageMatch(): number {
    if (this.filteredJobs.length === 0) return 0;
    const total = this.filteredJobs.reduce((sum, job) => sum + job.match, 0);
    return Math.round(total / this.filteredJobs.length);
  }
}
