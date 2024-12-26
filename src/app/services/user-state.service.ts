import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private user = signal<User | null>(null);

  setUser(user: User) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }

  getCurrentUser() {
    return this.user;
  }
}
