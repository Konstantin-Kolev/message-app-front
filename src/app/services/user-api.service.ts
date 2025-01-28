import { inject, Injectable } from '@angular/core';
import { UserType } from '../models/user.model';
import { ChannelType } from '../models/channel.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserCreate } from '../models/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/users`;

  // private userList: UserType[] = [
  //   {
  //     id: 1,
  //     username: 'user1',
  //     email: 'some@mail.com',
  //     password: 'password'
  //   },
  //   {
  //     id: 2,
  //     username: 'user2',
  //     email: 'user2@mail.com',
  //     password: 'user2'
  //   },
  //   {
  //     id: 3,
  //     username: 'user3',
  //     email: 'user3@mail.com',
  //     password: 'user3'
  //   },
  //   {
  //     id: 4,
  //     username: 'random_user',
  //     email: 'random@mail.com',
  //     password: 'random'
  //   }
  // ]

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

  // public getChannelMemebers(channel: ChannelType): UserType[] {
  //   return this.userList.filter((user) => channel.memberIds.includes(user.id));
  // }

  public getUsersNotInChannel(channelId: number) {
    return this.httpClient.get(`${this.baseUrl}/notInChannel/${channelId}`);
  }

  // public getChannelAdmins(channel: ChannelType): UserType[] {
  //   return this.userList.filter((user) => channel.adminIds.includes(user.id));
  // }
}
