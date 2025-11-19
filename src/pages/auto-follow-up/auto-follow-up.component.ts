import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Followup {
  id: number;
  jobTitle: string;
  company: string;
  scheduledDate: string;
  method: 'email' | 'linkedin' | 'platform';
  status: 'agendado' | 'enviado' | 'cancelado';
}

interface FollowupMethods {
  email: boolean;
  linkedin: boolean;
  platform: boolean;
}

@Component({
  selector: 'app-auto-followup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auto-follow-up.component.html',
  styleUrls: ['./auto-follow-up.component.scss'],
})
export class AutoFollowupPageComponent implements OnInit {
  autoFollowupEnabled = false;
  followupInterval = 14;
  selectedTemplate = 'professional';
  customTemplate = '';

  followupMethods: FollowupMethods = {
    email: true,
    linkedin: false,
    platform: true,
  };

  scheduledFollowups: Followup[] = [
    {
      id: 1,
      jobTitle: 'Desenvolvedor Front-end Senior',
      company: 'Tech Solutions LTDA',
      scheduledDate: '15 Dez 2024',
      method: 'email',
      status: 'agendado',
    },
    {
      id: 2,
      jobTitle: 'Product Designer',
      company: 'Design Innovation',
      scheduledDate: '18 Dez 2024',
      method: 'platform',
      status: 'agendado',
    },
  ];

  private followupStats = {
    total: 12,
    pending: 3,
    responseRate: 42,
    successRate: 28,
  };

  ngOnInit() {
    this.loadFollowupSettings();
  }

  toggleAutoFollowup() {
    if (this.autoFollowupEnabled) {
      console.log('✅ Auto Follow-up ativado');
      this.scheduleFollowups();
    } else {
      console.log('❌ Auto Follow-up desativado');
      this.cancelAllScheduled();
    }
    this.saveFollowupSettings();
  }

  getScheduledFollowups(): Followup[] {
    return this.scheduledFollowups.filter((f) => f.status === 'agendado');
  }

  getTotalFollowups(): number {
    return this.followupStats.total;
  }

  getPendingFollowups(): number {
    return this.followupStats.pending;
  }

  getResponseRate(): number {
    return this.followupStats.responseRate;
  }

  getSuccessRate(): number {
    return this.followupStats.successRate;
  }

  getMethodIcon(method: string): string {
    const icons: { [key: string]: string } = {
      email: 'bi-envelope',
      linkedin: 'bi-linkedin',
      platform: 'bi-briefcase',
    };
    return icons[method] || 'bi-question-circle';
  }

  executeFollowup(followup: Followup): void {
    console.log('🚀 Executando follow-up:', followup);
    followup.status = 'enviado';
    this.followupStats.total++;
    this.followupStats.pending--;
    this.updateResponseRate();
  }

  cancelFollowup(followup: Followup): void {
    this.scheduledFollowups = this.scheduledFollowups.filter(
      (f) => f.id !== followup.id
    );
    this.followupStats.pending--;
  }

  insertVariable(variable: string): void {
    this.customTemplate += variable + ' ';
  }

  exportHistory(): void {
    console.log('📊 Exportando histórico...');
  }

  testTemplate(): void {
    console.log('🧪 Testando template...');
  }

  private loadFollowupSettings(): void {
    const savedSettings = localStorage.getItem('jobscout-auto-followup');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.autoFollowupEnabled = settings.enabled || false;
      this.followupInterval = settings.interval || 14;
      this.selectedTemplate = settings.template || 'professional';
      this.followupMethods = settings.methods || this.followupMethods;
    }
  }

  private saveFollowupSettings(): void {
    const settings = {
      enabled: this.autoFollowupEnabled,
      interval: this.followupInterval,
      template: this.selectedTemplate,
      methods: this.followupMethods,
      customTemplate: this.customTemplate,
    };
    localStorage.setItem('jobscout-auto-followup', JSON.stringify(settings));
  }

  private scheduleFollowups(): void {
    console.log('📅 Agendando follow-ups...');
  }

  private cancelAllScheduled(): void {
    this.scheduledFollowups = this.scheduledFollowups.map((f) => ({
      ...f,
      status: 'cancelado',
    }));
  }

  private updateResponseRate(): void {
    this.followupStats.responseRate = Math.min(
      100,
      this.followupStats.responseRate + 5
    );
    this.followupStats.successRate = Math.min(
      100,
      this.followupStats.successRate + 3
    );
  }
}
