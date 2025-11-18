import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  type: string;
}

interface Stat {
  icon: string;
  number: number;
  label: string;
  trend: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  stats: Stat[] = [
    { icon: 'bi-briefcase', number: 24, label: 'Vagas Encontradas', trend: 12 },
    { icon: 'bi-send', number: 8, label: 'Candidaturas', trend: 5 },
    { icon: 'bi-eye', number: 12, label: 'Visualizações', trend: -3 },
    { icon: 'bi-star', number: 5, label: 'Favoritos', trend: 8 },
  ];

  recentJobs: Job[] = [
    {
      title: 'Desenvolvedor Frontend Angular',
      company: 'Tech Solutions Inc',
      location: 'São Paulo, SP',
      salary: 'R$ 8.000 - R$ 12.000',
      match: 92,
      type: 'Remoto',
    },
    {
      title: 'Senior Software Engineer',
      company: 'Startup Inovadora',
      location: 'Rio de Janeiro, RJ',
      salary: 'R$ 15.000 - R$ 20.000',
      match: 78,
      type: 'Híbrido',
    },
    {
      title: 'Full Stack Developer',
      company: 'Empresa Global',
      location: 'Belo Horizonte, MG',
      salary: 'R$ 10.000 - R$ 14.000',
      match: 85,
      type: 'Presencial',
    },
  ];

  getMatchLevel(match: number): string {
    if (match >= 80) return 'high';
    if (match >= 60) return 'medium';
    return 'low';
  }
}
