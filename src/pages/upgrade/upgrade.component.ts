import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upgrade',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
})
export class UpgradeComponent implements OnInit {
  annualBilling = true;

  comparisonFeatures = [
    {
      name: 'Candidaturas Mensais',
      explorer: '10',
      professional: 'Ilimitadas',
      enterprise: 'Ilimitadas',
    },
    {
      name: 'Auto Follow-up',
      explorer: 'Não',
      professional: 'Sim',
      enterprise: 'Sim',
    },
    {
      name: 'Análise de Match IA',
      explorer: 'Básica',
      professional: 'Avançada',
      enterprise: 'Premium',
    },
    {
      name: 'Estatísticas Detalhadas',
      explorer: 'Não',
      professional: 'Sim',
      enterprise: 'Sim',
    },
    {
      name: 'Exportação de Dados',
      explorer: 'Não',
      professional: 'Sim',
      enterprise: 'Sim',
    },
    {
      name: 'Suporte',
      explorer: 'Comum',
      professional: 'Prioritário',
      enterprise: 'Dedicado',
    },
  ];

  faqs = [
    {
      question: 'Posso cancelar quando quiser?',
      answer: 'Sim! Cancelamento a qualquer momento sem taxas ou burocracia.',
      open: false,
    },
    {
      question: 'Como funciona a garantia?',
      answer:
        'Se em 30 dias você não estiver satisfeito, devolvemos 100% do valor pago.',
      open: false,
    },
    {
      question: 'Posso mudar de plano depois?',
      answer: 'Sim, upgrade e downgrade são instantâneos a qualquer momento.',
      open: false,
    },
    {
      question: 'Quais formas de pagamento?',
      answer: 'Cartão de crédito, PIX, boleto e débito automático.',
      open: false,
    },
  ];

  ngOnInit() {
    // Inicialização do componente
  }

  toggleBilling() {
    this.annualBilling = !this.annualBilling;
  }

  selectPlan(plan: string) {
    console.log(`Plano selecionado: ${plan}`);
    // Integração com sistema de pagamentos
    // this.paymentService.initiatePayment(plan, this.annualBilling);

    // Simulação
    alert(`Iniciando assinatura do plano ${plan.toUpperCase()}`);
  }

  getFeatureIcon(value: string): string {
    if (value === 'Não' || value === 'Básica' || value === 'Comum') {
      return 'bi-dash-circle';
    } else if (value === 'Ilimitadas' || value === 'Premium') {
      return 'bi-infinity';
    } else {
      return 'bi-check-circle';
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  scrollToPlans() {
    const plansSection = document.querySelector('.plans-section');
    plansSection?.scrollIntoView({ behavior: 'smooth' });
  }
}
