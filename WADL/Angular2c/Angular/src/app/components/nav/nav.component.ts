import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class NavComponent {
  isLoggedIn = false;

  constructor(public userService: UserService) {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }
} 