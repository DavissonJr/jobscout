import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('applicationsChart') applicationsChartRef!: ElementRef;
  @ViewChild('statusChart') statusChartRef!: ElementRef;
  @ViewChild('typeChart') typeChartRef!: ElementRef;

  selectedPeriod = '30';

  metrics = {
    totalApplications: 47,
    applicationGrowth: 12,
    responseRate: 68,
    responseGrowth: 8,
    interviewRate: 23,
    interviewGrowth: 0,
    averageMatch: 78,
    matchGrowth: 5,
    averageResponseTime: 48,
    followUpRate: 65,
    conversionRate: 15,
  };

  companyStats = [
    {
      name: 'Tech Solutions Inc.',
      applications: 8,
      responseRate: 75,
      match: 82,
    },
    { name: 'Startup Inovadora', applications: 6, responseRate: 83, match: 91 },
    { name: 'Corp Enterprise', applications: 5, responseRate: 60, match: 76 },
    {
      name: 'Digital Agency Co.',
      applications: 4,
      responseRate: 50,
      match: 68,
    },
    {
      name: 'Software House LTDA',
      applications: 3,
      responseRate: 67,
      match: 79,
    },
  ];

  recentActivities = [
    {
      type: 'application',
      icon: 'bi-send',
      description: 'Candidatura enviada para Product Manager',
      time: '2 horas atrás',
    },
    {
      type: 'response',
      icon: 'bi-envelope',
      description: 'Resposta positiva da Tech Solutions',
      time: '1 dia atrás',
    },
    {
      type: 'interview',
      icon: 'bi-camera-video',
      description: 'Entrevista agendada com Startup Inovadora',
      time: '2 dias atrás',
    },
    {
      type: 'application',
      icon: 'bi-send',
      description: 'Candidatura para Senior Developer',
      time: '3 dias atrás',
    },
  ];

  private applicationsChart!: Chart;
  private statusChart!: Chart;
  private typeChart!: Chart;

  ngOnInit() {
    setTimeout(() => {
      this.createApplicationsChart();
      this.createStatusChart();
      this.createTypeChart();
    }, 100);
  }

  onPeriodChange() {
    // Simular atualização de dados baseado no período selecionado
    console.log('Período alterado para:', this.selectedPeriod);
    this.updateCharts();
  }

  exportData() {
    // Simular exportação de dados
    console.log('Exportando dados analíticos...');
    // Aqui integraria com serviço de exportação
  }

  private createApplicationsChart() {
    const ctx = this.applicationsChartRef.nativeElement.getContext('2d');

    this.applicationsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Candidaturas Enviadas',
            data: [12, 19, 15, 25, 22, 30, 28],
            borderColor: '#FF6B35',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Respostas Recebidas',
            data: [8, 12, 10, 18, 15, 22, 20],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#6C757D',
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#6C757D',
            },
          },
        },
      },
    });
  }

  private createStatusChart() {
    const ctx = this.statusChartRef.nativeElement.getContext('2d');

    this.statusChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Aguardando', 'Respondidas', 'Entrevistas', 'Rejeitadas'],
        datasets: [
          {
            data: [35, 25, 15, 25],
            backgroundColor: ['#FF6B35', '#4CAF50', '#2196F3', '#F44336'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#6C757D',
              padding: 20,
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  private createTypeChart() {
    const ctx = this.typeChartRef.nativeElement.getContext('2d');

    this.typeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Frontend', 'Backend', 'Fullstack', 'Mobile', 'DevOps'],
        datasets: [
          {
            label: 'Candidaturas',
            data: [12, 19, 8, 5, 3],
            backgroundColor: '#FF6B35',
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#6C757D',
            },
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#6C757D',
            },
          },
        },
      },
    });
  }

  private updateCharts() {
    // Simular atualização de dados
    if (this.applicationsChart) {
      this.applicationsChart.update();
    }
    if (this.statusChart) {
      this.statusChart.update();
    }
    if (this.typeChart) {
      this.typeChart.update();
    }
  }

  ngOnDestroy() {
    if (this.applicationsChart) {
      this.applicationsChart.destroy();
    }
    if (this.statusChart) {
      this.statusChart.destroy();
    }
    if (this.typeChart) {
      this.typeChart.destroy();
    }
  }
}
