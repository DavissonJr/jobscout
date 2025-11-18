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
      logo: 'https://ui-avatars.com/api/?name=Tech+Solutions&background=0d6efd&color=fff',
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
      logo: 'https://ui-avatars.com/api/?name=Startup+Inovadora&background=198754&color=fff',
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
      logo: 'https://ui-avatars.com/api/?name=Empresa+Global&background=6f42c1&color=fff',
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
      logo: 'https://ui-avatars.com/api/?name=App+Masters&background=fd7e14&color=fff',
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
      logo: 'https://ui-avatars.com/api/?name=Cloud+Tech&background=dc3545&color=fff',
      isFavorite: false,
      skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    },
  ];

  filteredJobs: Job[] = [...this.jobs];
  searchTerm: string = '';
  selectedType: string = 'all';

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

      return matchesSearch && matchesType;
    });
  }

  getMatchColor(match: number): string {
    if (match >= 80) return 'success';
    if (match >= 60) return 'warning';
    return 'danger';
  }
}
