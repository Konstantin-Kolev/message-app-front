import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserCreate } from '../models/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/users`;

  public createUser(user: UserCreate) {
    return this.httpClient.post(this.baseUrl, user);
  }

  public getUsersForFriends(userId: number) {
    return this.httpClient.get(`${this.baseUrl}/exceptUser/${userId}`);
  }

  public login(email: string, password: string) {
    return this.httpClient.post(`${this.baseUrl}/login`, {
      email,
      password
    });
  }

  public getUsersNotInChannel(channelId: number) {
    return this.httpClient.get(`${this.baseUrl}/notInChannel/${channelId}`);
  }
}
