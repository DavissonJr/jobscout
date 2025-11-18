import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggleMenu() {
    const event = new CustomEvent('toggleMenu');
    window.dispatchEvent(event);
  }
}
