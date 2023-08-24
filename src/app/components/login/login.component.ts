import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: '/assets/login.json',
  };

  constructor(public authService: AuthService) {}
}
