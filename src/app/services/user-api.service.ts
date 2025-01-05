import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private userList: User[] = [
    {
      id: 1,
      username: 'user1',
      email: 'some@mail.com',
      password: 'password'
    },
    {
      id: 2,
      username: 'user2',
      email: 'other@mail.com',
      password: 'super_strong'
    }
  ]

  public createUser(user: User) {
    user.id = this.userList.length + 1;
    this.userList.push(user);
    return user;
  }

  public login(email: string, password: string) {
    return this.userList.find((user) => user.email === email || user.password === password);
  }
}
