import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AppUser } from '../interface/appUser';

interface AdditionalUserInfo {
  profile?: {
    email?: string;
    id?: string;
    name?: string;
    picture?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public router: Router, private afAuth: AngularFireAuth) {}

  async login() {
    try {
      const user = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
      if (user) {
        const additionalUserInfo =
          user.additionalUserInfo as AdditionalUserInfo;

        const appUser: AppUser = {
          email: additionalUserInfo?.profile?.email || '',
          id: additionalUserInfo?.profile?.id || '',
          name: additionalUserInfo?.profile?.name || '',
          picture: additionalUserInfo?.profile?.picture || '',
        };

        localStorage.setItem('user', JSON.stringify(appUser));
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  }

  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('user')!) !== null;
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
