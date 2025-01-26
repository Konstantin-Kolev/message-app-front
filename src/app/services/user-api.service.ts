import { Injectable } from '@angular/core';
import { UserType } from '../models/user.model';
import { ChannelType } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private userList: UserType[] = [
    {
      id: 1,
      username: 'user1',
      email: 'some@mail.com',
      password: 'password'
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@mail.com',
      password: 'user2'
    },
    {
      id: 3,
      username: 'user3',
      email: 'user3@mail.com',
      password: 'user3'
    },
    {
      id: 4,
      username: 'random_user',
      email: 'random@mail.com',
      password: 'random'
    }
  ]

  public createUser(user: UserType): UserType {
    user.id = this.userList.length + 1;
    this.userList.push(user);
    return user;
  }

  public getUsersForFriends(currentUser: UserType) {
    return this.userList.filter((user) => user.id !== currentUser.id);
  }

  public login(email: string, password: string): UserType | undefined {
    return this.userList.find((user) => user.email === email || user.password === password);
  }

  public getChannelMemebers(channel: ChannelType): UserType[] {
    return this.userList.filter((user) => channel.memberIds.includes(user.id!));
  }

  public getUsersNotInChannel(channel: ChannelType): UserType[] {
    return this.userList.filter((user) => !channel.memberIds.includes(user.id!));
  }

  public getChannelAdmins(channel: ChannelType): UserType[] {
    return this.userList.filter((user) => channel.adminIds.includes(user.id!));
  }
}
