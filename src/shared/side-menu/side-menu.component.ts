import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    // Ouvir evento do header
    window.addEventListener('toggleSideMenu', this.handleToggle.bind(this));
  }

  ngOnDestroy() {
    // Remover listener quando componente for destruído
    window.removeEventListener('toggleSideMenu', this.handleToggle.bind(this));
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  private handleToggle() {
    this.toggleCollapse();
  }
}
