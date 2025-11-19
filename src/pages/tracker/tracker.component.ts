import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface TrackerConfig {
  keywords: string[];
  location: string;
  jobType: string;
  minSalary: number;
  maxSalary: number;
  sources: string[];
  frequency: string;
  notifications: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  advanced: {
    matchScore: boolean;
    companyFilter: boolean;
    newJobsOnly: boolean;
  };
}

export interface JobSource {
  id: string;
  name: string;
  icon: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent {
  trackerStatus: 'active' | 'paused' | 'stopped' = 'stopped';

  config: TrackerConfig = {
    keywords: ['Angular', 'TypeScript', 'Frontend', 'JavaScript', 'RxJS'],
    location: 'Remoto',
    jobType: 'all',
    minSalary: 5000,
    maxSalary: 15000,
    sources: ['linkedin', 'indeed'],
    frequency: 'realtime',
    notifications: {
      email: true,
      telegram: false,
      whatsapp: false,
    },
    advanced: {
      matchScore: true,
      companyFilter: false,
      newJobsOnly: true,
    },
  };

  jobSources: JobSource[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'bi-linkedin',
      description: 'Maior rede profissional do mundo',
      enabled: true,
    },
    {
      id: 'indeed',
      name: 'Indeed',
      icon: 'bi-search',
      description: 'Agregador de vagas global',
      enabled: true,
    },
    {
      id: 'gupy',
      name: 'Gupy',
      icon: 'bi-building',
      description: 'Plataforma de recrutamento brasileira',
      enabled: false,
    },
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      icon: 'bi-graph-up',
      description: 'Vagas e reviews de empresas',
      enabled: false,
    },
    {
      id: 'catho',
      name: 'Catho',
      icon: 'bi-briefcase',
      description: 'Plataforma tradicional brasileira',
      enabled: false,
    },
    {
      id: 'infojobs',
      name: 'InfoJobs',
      icon: 'bi-info-circle',
      description: 'Portal de empregos brasileiro',
      enabled: false,
    },
  ];

  stats = {
    activeSearches: 3,
    jobsFound: 24,
    lastRun: '2h atrás',
    avgMatches: 78,
    successRate: 92,
  };

  constructor() {
    this.loadConfig();
  }

  addKeyword(input: HTMLInputElement) {
    const keyword = input.value.trim();
    if (keyword && !this.config.keywords.includes(keyword)) {
      this.config.keywords.push(keyword);
      input.value = '';
    }
  }

  removeKeyword(keyword: string) {
    this.config.keywords = this.config.keywords.filter((k) => k !== keyword);
  }

  toggleSource(source: JobSource) {
    source.enabled = !source.enabled;

    if (source.enabled) {
      if (!this.config.sources.includes(source.id)) {
        this.config.sources.push(source.id);
      }
    } else {
      this.config.sources = this.config.sources.filter((s) => s !== source.id);
    }
  }

  getEnabledSourcesCount(): number {
    return this.jobSources.filter((source) => source.enabled).length;
  }

  getEnabledNotificationsCount(): number {
    return Object.values(this.config.notifications).filter(Boolean).length;
  }

  toggleTracker() {
    if (this.trackerStatus === 'stopped') {
      this.trackerStatus = 'active';
      this.startTracker();
    } else if (this.trackerStatus === 'active') {
      this.trackerStatus = 'paused';
      this.pauseTracker();
    } else {
      this.trackerStatus = 'stopped';
      this.stopTracker();
    }
  }

  startTracker() {
    console.log('Iniciando rastreador...', this.config);
    // Simular busca de vagas
    setTimeout(() => {
      this.stats.lastRun = 'Agora';
      this.stats.jobsFound += 5;
    }, 2000);
  }

  pauseTracker() {
    console.log('Pausando rastreador...');
  }

  stopTracker() {
    console.log('Parando rastreador...');
  }

  getStatusText(): string {
    const statusMap = {
      active: 'Ativo',
      paused: 'Pausado',
      stopped: 'Parado',
    };
    return statusMap[this.trackerStatus];
  }

  getActionIcon(): string {
    const iconMap = {
      active: 'bi-pause-circle',
      paused: 'bi-play-circle',
      stopped: 'bi-play-circle',
    };
    return iconMap[this.trackerStatus];
  }

  getActionText(): string {
    const textMap = {
      active: 'Pausar Rastreador',
      paused: 'Continuar Rastreamento',
      stopped: 'Iniciar Rastreador',
    };
    return textMap[this.trackerStatus];
  }

  saveConfig() {
    console.log('Salvando configurações:', this.config);
    localStorage.setItem('trackerConfig', JSON.stringify(this.config));
    // Mostrar mensagem de sucesso
  }

  resetConfig() {
    if (confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
      this.config = {
        keywords: ['Angular', 'TypeScript', 'Frontend'],
        location: 'Remoto',
        jobType: 'all',
        minSalary: 5000,
        maxSalary: 15000,
        sources: ['linkedin'],
        frequency: 'realtime',
        notifications: {
          email: true,
          telegram: false,
          whatsapp: false,
        },
        advanced: {
          matchScore: true,
          companyFilter: false,
          newJobsOnly: true,
        },
      };

      this.jobSources.forEach((source) => {
        source.enabled = this.config.sources.includes(source.id);
      });
    }
  }

  loadConfig() {
    const saved = localStorage.getItem('trackerConfig');
    if (saved) {
      const savedConfig = JSON.parse(saved);
      this.config = { ...this.config, ...savedConfig };

      // Atualizar status das fontes
      this.jobSources.forEach((source) => {
        source.enabled = this.config.sources.includes(source.id);
      });
    }
  }
}
