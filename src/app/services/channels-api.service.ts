import { inject, Injectable } from '@angular/core';
import { ChannelCreate } from '../models/channel-create.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelsApiService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/channels`;

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
