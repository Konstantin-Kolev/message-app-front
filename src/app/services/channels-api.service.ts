import { inject, Injectable } from '@angular/core';
import { ChannelType } from '../models/channel.model';
import { UserType } from '../models/user.model';
import { ChannelCreate } from '../models/channel-create.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelsApiService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/channels`;

  // private channelsList: ChannelType[] = [
  //   {
  //     id: 1,
  //     channelName: 'some chat',
  //     channelType: 'group',
  //     ownerId: 1,
  //     adminIds: [1],
  //     memberIds: [1, 2]
  //   },
  //   {
  //     id: 2,
  //     channelName: 'super  channel',
  //     channelType: 'group',
  //     ownerId: 1,
  //     adminIds: [1, 2],
  //     memberIds: [1, 2]
  //   },
  //   {
  //     id: 3,
  //     channelName: 'talking about whatever',
  //     channelType: 'group',
  //     ownerId: 2,
  //     adminIds: [2],
  //     memberIds: [1, 2]
  //   },
  //   {
  //     id: 4,
  //     channelName: 'user1|user2',
  //     channelType: 'friend',
  //     ownerId: 1,
  //     adminIds: [1, 2],
  //     memberIds: [1, 2]
  //   },
  //   {
  //     id: 5,
  //     channelName: 'user1|user3',
  //     channelType: 'friend',
  //     ownerId: 1,
  //     adminIds: [1, 3],
  //     memberIds: [1, 3]
  //   },
  //   {
  //     id: 6,
  //     channelName: 'user1|random_user',
  //     channelType: 'friend',
  //     ownerId: 1,
  //     adminIds: [1, 4],
  //     memberIds: [1, 4]
  //   },
  // ];

  public createChannel(channel: ChannelCreate) {
    return this.httpClient.post(this.baseUrl, channel);
  }

  public createFriendChat(userId: number, friendId: number) {
    return this.httpClient.post(`${this.baseUrl}/friend`, {
      userId,
      friendId
    });
  }

  public removeChannel(channelId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${channelId}`);
  }

  public renameChannel(channelId: number, newName: string) {
    return this.httpClient.post(`${this.baseUrl}/rename/${channelId}?newName=${newName}`, {});
  }

  public getChannelsForUser(userId: number) {
    return this.httpClient.get(`${this.baseUrl}/byMember/${userId}`);
  }

  public getChannelMembers(channelId: number) {
    return this.httpClient.get(`${this.baseUrl}/${channelId}/members`);
  }

  public getChannelAdmins(channelId: number) {
    return this.httpClient.get(`${this.baseUrl}/${channelId}/admins`);
  }

  public addAdminToChannel(channelId: number, userId: number) {
    return this.httpClient.post(`${this.baseUrl}/${channelId}/addAdmin/${userId}`, {});
  }

  public removeAdminFromChannel(channelId: number, userId: number) {
    return this.httpClient.post(`${this.baseUrl}/${channelId}/removeAdmin/${userId}`, {});
  }

  public addMemberToChannel(channelId: number, userId: number) {
    return this.httpClient.post(`${this.baseUrl}/${channelId}/addMember/${userId}`, {});
  }

  public removeMemberFromChannel(channelId: number, userId: number) {
    return this.httpClient.post(`${this.baseUrl}/${channelId}/removeMember/${userId}`, {});
  }
}
