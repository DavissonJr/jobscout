import { Component } from '@angular/core';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [SideMenuComponent, RouterOutlet, HeaderComponent],
})
export class AppComponent {
  title = 'JobScout';
}
