import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
  active?: boolean;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class SideMenuComponent {
  collapsed = false;

  mainMenu: MenuItem[] = [
    { icon: 'bi-house', label: 'Dashboard', route: '/dashboard', active: true },
    { icon: 'bi-briefcase', label: 'Vagas', route: '/jobs', badge: 12 },
    {
      icon: 'bi-send',
      label: 'Candidaturas',
      route: '/applications',
      badge: 3,
    },
    { icon: 'bi-star', label: 'Favoritos', route: '/favorites' },
  ];

  toolsMenu: MenuItem[] = [
    { icon: 'bi-robot', label: 'Rastreador', route: '/tracker' },
    { icon: 'bi-file-text', label: 'Analisador de CV', route: '/cv-analyzer' },
    { icon: 'bi-chat', label: 'Auto Follow-up', route: '/followup' },
  ];

  analyticsMenu: MenuItem[] = [
    { icon: 'bi-graph-up', label: 'Evolução', route: '/analytics' },
    { icon: 'bi-building', label: 'Empresas', route: '/companies' },
    { icon: 'bi-cash-coin', label: 'Salários', route: '/salaries' },
  ];

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
