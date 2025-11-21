import { Component } from '@angular/core';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [SideMenuComponent, RouterOutlet, HeaderComponent, CommonModule],
})
export class AppComponent {
  title = 'JobScout';

  constructor(private router: Router) {}

  showLayout(): boolean {
    const hideLayoutRoutes = ['/login', '/signup', '/forgot-password'];
    return !hideLayoutRoutes.includes(this.router.url);
  }
}
