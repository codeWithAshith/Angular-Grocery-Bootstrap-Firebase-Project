import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
