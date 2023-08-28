import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isHome(): boolean {
    return this.router.url === '/';
  }
}
