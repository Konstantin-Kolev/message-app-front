import { Injectable, signal } from '@angular/core';
import { UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private user = signal<UserType | null>(null);

  setUser(user: UserType) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }

  getCurrentUser() {
    return this.user;
  }
}
