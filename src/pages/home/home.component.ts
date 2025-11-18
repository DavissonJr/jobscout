import { Component } from '@angular/core';
import { SideMenuComponent } from '../../shared/side-menu/side-menu.component';
import { CommonModule } from '@angular/common';

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  type: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SideMenuComponent, CommonModule],
})
export class HomeComponent {
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
}
